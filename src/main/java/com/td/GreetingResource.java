package com.td;

import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;


@Path("/api")
@ApplicationScoped
public class GreetingResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public String createUser() {
        return "{}";
    }
}
