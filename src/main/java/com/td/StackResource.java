package com.td;

import com.td.auth.User;
import com.td.helper.Filter;
import com.td.model.CardStack;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.hibernate.reactive.mutiny.Mutiny;

import java.util.List;

@Path("/api/stack")
@ApplicationScoped
@RolesAllowed("user")
public class StackResource {

    @Inject
    Mutiny.SessionFactory sf;

    @POST
    public Uni<Response> newStack( CardStack cardStack, @Context SecurityContext securityContext ) {
        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(u -> {
            cardStack.user = u;
            cardStack.card_count = 0;

            return sf.withSession(s -> s.createQuery(Filter.findByUserAndName(CardStack.class, sf, u, cardStack.name))
                                        .getSingleResultOrNull().onItem().ifNotNull()
                                        .transform(st -> Response.status(400).build()).onItem().ifNull().switchTo(
                            () -> sf.withTransaction(ts -> ts.persist(cardStack))
                                    .replaceWith(Response.status(201).build())));
        });
    }

    @GET
    public Uni<List<CardStack>> getStacks( @Context SecurityContext securityContext ) {
        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(
                user -> sf.withSession(
                        session -> session.createQuery(Filter.findByUser(CardStack.class, sf, user)).getResultList()));
    }

    @GET
    @Path("{id}")
    public Uni<Response> getStack( @PathParam("id") long id, @Context SecurityContext securityContext ) {
        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(
                user -> sf.withSession(
                                  session -> session.createQuery(Filter.findByUserAndId(CardStack.class, sf, user, id))
                                                    .getSingleResultOrNull()).onItem().ifNotNull()
                          .transform(stack -> Response.ok(stack).build()).onItem().ifNull()
                          .continueWith(Response.status(404).build()));
    }

    @DELETE
    @Path("/{id}")
    public Uni<Response> deleteStack( @Context SecurityContext securityContext, @PathParam("id") long id ) {
        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(
                u -> sf.withTransaction(
                        s -> s.createQuery(Filter.findByUserAndId(CardStack.class, sf, u, id)).getSingleResultOrNull()
                              .onItem().ifNotNull().transformToUni(
                                        cardStack -> s.remove(cardStack).replaceWith(Response.status(204).build()))
                              .onItem().ifNull().continueWith(Response.status(400)::build)));
    }

    @PUT
    public Uni<Response> updateStack( @Context SecurityContext securityContext, CardStack stack ) {
        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(
                u -> sf.withTransaction(s -> s.createQuery(Filter.findByUserAndId(CardStack.class, sf, u, stack.id))
                                              .getSingleResultOrNull().onItem().ifNotNull()
                                              .transformToUni(cardStack -> {
                                                  stack.flashcards.forEach(crd -> crd.stack = stack);
                                                  cardStack.flashcards = stack.flashcards;
                                                  cardStack.card_count = 0;
                                                  if(cardStack.flashcards != null) {
                                                      cardStack.card_count = cardStack.flashcards.size();
                                                  }
                                                  cardStack.name = stack.name;
                                                  return s.merge(cardStack).replaceWith(Response.ok()::build);
                                              }).onItem().ifNull().continueWith(Response.status(400).build())));
    }

    @PATCH
    public Uni<Response> updateStackNameAndDesc( @Context SecurityContext securityContext, CardStack stack ) {
        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(
                u -> sf.withTransaction(s -> s.createQuery(Filter.findByUserAndId(CardStack.class, sf, u, stack.id))
                                              .getSingleResultOrNull().onItem().ifNotNull()
                                              .transformToUni(cardStack -> {
                                                  cardStack.name = stack.name;
                                                  cardStack.description = stack.description;
                                                  cardStack.card_count = 0;
                                                  if(cardStack.getFlashcards() != null) {
                                                      cardStack.card_count = cardStack.flashcards.size();
                                                  }
                                                  return s.merge(cardStack).replaceWith(
                                                          Response.ok().build());
                                              })).onItem().ifNull().continueWith(Response.status(400).build()));
    }

}
