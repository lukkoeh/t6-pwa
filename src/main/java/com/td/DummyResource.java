package com.td;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("/api/online")
@ApplicationScoped
public class DummyResource {
    @GET
    public Uni<Response> getUserData() {
        return Uni.createFrom().item(Response.ok()::build);
    }
}
