package com.td.helper;

import com.td.auth.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.hibernate.reactive.mutiny.Mutiny;

public class Filter {


    public static <T> CriteriaQuery<T> findByUserAndId( Class<T> rootClass, Mutiny.SessionFactory sf, User user, long targetId ) {
        CriteriaBuilder  builder = sf.getCriteriaBuilder();
        CriteriaQuery<T> cquery  = builder.createQuery(rootClass);
        Root<T>          root    = cquery.from(rootClass);
        Predicate        pUser   = builder.equal(root.get("user"), user);
        Predicate        pId     = builder.equal(root.get("id"), targetId);

        return cquery.select(root).where(builder.and(pUser, pId));
    }

    public static <T> CriteriaQuery<T> findByUserAndName( Class<T> rootClass, Mutiny.SessionFactory sf, User user, String targetName ) {
        CriteriaBuilder  builder = sf.getCriteriaBuilder();
        CriteriaQuery<T> cquery  = builder.createQuery(rootClass);
        Root<T>          root    = cquery.from(rootClass);
        Predicate        pUser   = builder.equal(root.get("user"), user);
        Predicate        pName   = builder.equal(root.get("name"), targetName);

        return cquery.select(root).where(builder.and(pUser, pName));
    }

    public static <T> CriteriaQuery<T> findByUser( Class<T> rootClass, Mutiny.SessionFactory sf, User user ) {
        CriteriaBuilder  builder = sf.getCriteriaBuilder();
        CriteriaQuery<T> cquery  = builder.createQuery(rootClass);
        Root<T>          root    = cquery.from(rootClass);

        return cquery.select(root).where(builder.equal(root.get("user"), user));
    }

}
