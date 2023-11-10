package com.td;

import com.td.auth.User;
import com.td.helper.Filter;
import com.td.model.CardStack;
import com.td.model.Flashcard;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import javax.xml.namespace.NamespaceContext;
import org.hibernate.reactive.mutiny.Mutiny;

@Path("/api/card")
@ApplicationScoped
@RolesAllowed("user")
public class FlashcardResource {

  @Inject
  Mutiny.SessionFactory sf;

  @GET
  @Path("{sid}")
  public Uni<Response> getByStack(@Context SecurityContext securityContext,
      @PathParam("sid") long sid) {

    return User.findByName(securityContext.getUserPrincipal().getName()).onItem()
        .transformToUni(user -> {
          CriteriaBuilder builder = sf.getCriteriaBuilder();
          CriteriaQuery<CardStack> cquery = builder.createQuery(CardStack.class);
          Root<CardStack> root = cquery.from(CardStack.class);
          Predicate pUser = builder.equal(root.get("user"), user);
          Predicate pStack = builder.equal(root.get("id"), sid);
          cquery.select(root).where(builder.and(pUser, pStack));

          return sf.withSession(
              session -> session.createQuery(cquery).getSingleResultOrNull().onItem().ifNotNull()
                  .transform(cardStack -> Response.ok(cardStack.getFlashcards()).build()).onItem()
                  .ifNull().continueWith(Response.status(404)::build));
        });
  }

  @POST
  public Uni<Response> addStack(@Context SecurityContext securityContext, Flashcard card) {
    // TODO Checken, ob User eine Karte mit der Vorderseite hat, wenn ja, Fehler.
    return User.findByName(securityContext.getUserPrincipal().getName()).onItem()
        .transformToUni(user -> {
          CriteriaQuery<Flashcard> cquery =
              Filter.findByUserAndName(Flashcard.class, sf, user, card.front);

          return sf.withSession(session -> session.createQuery(cquery).getSingleResultOrNull()
              .onItem().ifNotNull().transform(c -> Response.status(400).build()).onItem().ifNull()
              .switchTo(sf.withTransaction(ts -> {
                card.probability = 0.05f;
                return ts.persist(card);
              }).replaceWith(Response.status(201).build())));
        });
  }
}
