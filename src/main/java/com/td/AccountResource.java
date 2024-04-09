package com.td;

import com.td.auth.User;
import com.td.model.UserProfile;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;


@Path("/api/user")
@ApplicationScoped
public class AccountResource {

    @GET
    @RolesAllowed("user")
    public String getUserData( @Context SecurityContext securityContext ) {
        return securityContext.getUserPrincipal().getName();
    }

    @PUT
    @RolesAllowed("user")
    @Consumes("application/json")
    public Uni<Response> updateUserProfile( @Context SecurityContext securityContext, UserProfile user ) {
        String username = securityContext.getUserPrincipal().getName();
        return Panache.withTransaction(() -> User.findByName(username)
                                                 .onItem().ifNotNull().invoke(u -> {
                                  u.username = user.newUsername;
                                  u.password = BcryptUtil.bcryptHash(user.newPassword);
                              }))
                      .onItem().ifNotNull().transform(e -> Response.ok(e).build())
                      .onItem().ifNull().continueWith(Response.ok().status(Response.Status.NO_CONTENT)::build);
    }
    
    @POST
    @WithTransaction
    public Uni<Response> register( User user ) {
        return User.findByName(user.username)
                   .onItem().ifNotNull().transform(usr -> Response.status(400).build())
                   .onItem().ifNull().switchTo(() -> User.add(user.username, user.password, "user").onItem()
                                                         .transform(r -> Response.status(201).build()));

    }
}
