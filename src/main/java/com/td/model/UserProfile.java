package com.td.model;

import java.sql.Timestamp;
import jakarta.persistence.Column;

public class UserProfile {
    public String newUsername;

    public String newPassword;

    @Column(name = "last_update", nullable = false, updatable = true, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    public Timestamp last_update;

    public Timestamp getLast_update() {
        return last_update;
    }

    public void setLast_update(Timestamp last_update) {
        this.last_update = last_update;
    }

    public String getNewUsername() {
        return newUsername;
    }


    public void setNewUsername( String newUsername ) {
        this.newUsername = newUsername;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword( String newPassword ) {
        this.newPassword = newPassword;
    }

}
