package com.td.model;

public class UserProfile {
    public String oldUsername;
    public String newUsername;

    public String newPassword;
    public String getOldUsername() {
        return oldUsername;
    }

    public void setOldUsername( String oldUsername ) {
        this.oldUsername = oldUsername;
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
