package com.td.auth;

import com.td.model.CardStack;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import io.smallrye.mutiny.Uni;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "user")
@UserDefinition
public class User extends PanacheEntity {
    @Username
    public  String          username;
    @Password
    public  String          password;
    @Roles
    public  String          role;
    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE, CascadeType.MERGE})
    private List<CardStack> cardStacks;

    public List<CardStack> getStacks() {
        return cardStacks;
    }

    public void setUsername( String username ) {
        this.username = username;
    }

    public void setPassword( String password ) {
        this.password = password;
    }

    /**
     * Adds a new user to the database
     *
     * @param username the username
     * @param password the unencrypted password (it will be encrypted with bcrypt)
     * @param role     the comma-separated roles
     */
    public static Uni<PanacheEntityBase> add( String username, String password, String role ) {
        User user = new User();
        user.username = username;
        user.password = BcryptUtil.bcryptHash(password);
        user.role = role;
        return user.persist();
    }

    public static Uni<PanacheEntityBase> add( User user ) {
        user.password = BcryptUtil.bcryptHash(user.password);
        return user.persist();
    }

    public static Uni<User> findByName( String name ) {
        return find("username", name).firstResult();
    }

    public String toString() {
        return "username: " + this.username + " Role: " + this.role;
    }
}
