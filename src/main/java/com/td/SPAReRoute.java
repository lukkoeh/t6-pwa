package com.td;

import io.vertx.mutiny.ext.web.Router;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;

import java.util.function.Predicate;
import java.util.regex.Pattern;
import java.util.stream.Stream;

@ApplicationScoped
public class SPAReRoute {
    private static final String[]          PATH_PREFIXES       = { "/api/", "/q/", "/admin/", };
    private static final Predicate<String> FILE_NAME_PREDICATE = Pattern.compile(".*[.][a-zA-Z\\d]+")
                                                                        .asMatchPredicate();

    public void init( @Observes Router router ) {
        router.get("/*").handler(routingContext -> {
            final String path = routingContext.normalizedPath();
            if ( !path.equals("/")
                 && Stream.of(PATH_PREFIXES).noneMatch(path::startsWith)
                 && !FILE_NAME_PREDICATE.test(path) ) {
                routingContext.reroute("/");
            } else {
                routingContext.next();
            }
        });

    }
}
