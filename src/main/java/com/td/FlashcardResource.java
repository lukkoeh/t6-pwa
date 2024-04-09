package com.td;

import com.td.auth.User;
import com.td.helper.Filter;
import com.td.model.CardStack;
import com.td.model.Flashcard;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.criteria.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.hibernate.reactive.mutiny.Mutiny;

@Path("/api/card")
@ApplicationScoped
@RolesAllowed("user")
public class FlashcardResource {

    @Inject
    Mutiny.SessionFactory sf;

    @GET
    @Path("{sid}")
    public Uni<Response> getByStack( @Context SecurityContext securityContext, @PathParam("sid") long sid ) {

        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(user -> {
            CriteriaBuilder          builder = sf.getCriteriaBuilder();
            CriteriaQuery<CardStack> cquery  = builder.createQuery(CardStack.class);
            Root<CardStack>          root    = cquery.from(CardStack.class);
            Predicate                pUser   = builder.equal(root.get("user"), user);
            Predicate                pStack  = builder.equal(root.get("id"), sid);
            cquery.select(root).where(builder.and(pUser, pStack));

            return sf.withSession(session -> session.createQuery(cquery).getSingleResultOrNull().onItem().ifNotNull()
                                                    .transform(cardStack -> Response.ok(cardStack.getFlashcards())
                                                                                    .build()).onItem().ifNull()
                                                    .continueWith(Response.status(404)::build));
        });
    }

    @POST
    @Path("{sid}")
    public Uni<Response> addCard( @Context SecurityContext securityContext, Flashcard card, @PathParam("sid") long sid ) {
        return User.findByName(securityContext.getUserPrincipal().getName()).onItem().transformToUni(user -> {
            CriteriaQuery<CardStack> cqueryStack = Filter.findByUserAndId(CardStack.class, sf, user, sid);

            return sf.withSession(sessionStack -> sessionStack.createQuery(cqueryStack).getSingleResultOrNull().onItem()
                                                              .ifNotNull().transformToUni(stack -> {

                        CriteriaBuilder          builder = sf.getCriteriaBuilder();
                        CriteriaQuery<Flashcard> cquery  = builder.createQuery(Flashcard.class);
                        Root<Flashcard>          root    = cquery.from(Flashcard.class);
                        Predicate                pStack  = builder.equal(root.get("stack"), stack);
                        Predicate                pCard   = builder.equal(root.get("front"), card.front);
                        cquery.select(root).where(builder.and(pStack, pCard));

                        return sf.withSession(sCard -> sCard.createQuery(cquery).getSingleResultOrNull().onItem()
                                                            .ifNotNull().transform(c -> Response.status(400).build())
                                                            .onItem().ifNull().switchTo(sf.withTransaction(tCard -> {
                                    card.probability = 0.1f;
                                    card.stack       = stack;
                                    return tCard.persist(card);
                                }).onItem().transformToUni(i ->{
                                    return sf.withTransaction(tStack -> {
                                       stack.card_count++;
                                       return tStack.persist(stack);
                                    });
                                }).replaceWith(Response.status(201).entity(card).build())));
                    }));
        });
    }

    @Path("{sid}")
    @DELETE
    @Consumes("text/plain")
    public Uni<Response> removeCard( @Context SecurityContext securityContext, long cardId, @PathParam("sid") long stackId ) {
        return sf.withTransaction(s -> {

            CriteriaBuilder          builder = sf.getCriteriaBuilder();
            CriteriaQuery<Flashcard> cquery  = builder.createQuery(Flashcard.class);

            Root<Flashcard>            root      = cquery.from(Flashcard.class);
            Join<Flashcard, CardStack> stackJoin = root.join("stack", JoinType.LEFT);
            Join<CardStack, User>      userJoin  = stackJoin.join("user", JoinType.LEFT);
            Predicate                  pCard     = builder.equal(root.get("id"), cardId);
            Predicate                  pStack    = builder.equal(stackJoin.get("id"), stackId);
            Predicate pUser = builder.equal(userJoin.get("username"), securityContext.getUserPrincipal().getName());
            cquery.select(root);

            cquery.where(builder.and(pCard, pUser, pStack));
            return s.createQuery(cquery).getSingleResultOrNull().onItem()
                    .transformToUni(c -> {
                        CardStack stack = c.stack;
                        stack.card_count--;

                        return s.remove(c).onItem().transformToUni(t -> sf.withTransaction(tStack ->
                        tStack.persist(stack)));
                    })
                    .replaceWith(Response.ok().build()).onItem().ifNull().failWith(new WebApplicationException(400));
        });
    }

    @PUT
    @Path("{sid}")
    public Uni<Response> editCard( @Context SecurityContext securityContext, @PathParam("sid") long stackId, Flashcard card ) {
        return sf.withTransaction(s -> {
            CriteriaBuilder          builder = sf.getCriteriaBuilder();
            CriteriaQuery<Flashcard> cquery  = builder.createQuery(Flashcard.class);

            Root<Flashcard>            root      = cquery.from(Flashcard.class);
            Join<Flashcard, CardStack> stackJoin = root.join("stack", JoinType.LEFT);
            Join<CardStack, User>      userJoin  = stackJoin.join("user", JoinType.LEFT);
            Predicate                  pCard     = builder.equal(root.get("id"), card.id);
            Predicate                  pStack    = builder.equal(stackJoin.get("id"), stackId);
            Predicate pUser = builder.equal(userJoin.get("username"), securityContext.getUserPrincipal().getName());
            cquery.select(root);
            cquery.where(builder.and(pCard, pUser, pStack));
            return s.createQuery(cquery).getSingleResultOrNull().onItem()
                    .transformToUni(fc -> sf.withTransaction(sCard -> {
                        fc.front       = card.front;
                        fc.back        = card.back;
                        fc.probability = 0.1f;
                        return sCard.persist(fc).replaceWith(Response.ok()::build);
                    })).replaceWith(Response.ok(card).build()).onItem().ifNull().failWith(new WebApplicationException(400));
        });

    }

}
