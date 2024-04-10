package com.td.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.td.auth.User;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "stacks")
public class CardStack {
    @Id
    @GeneratedValue
    public long id;

    public long getId() {
        return id;
    }

    public String name;

    public String description;

    public int card_count;

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String desc) {
        this.description = desc;
    }
    @JsonIgnore
    @ManyToOne(optional = false)
    public User user;

    public void setFlashcards( List<Flashcard> flashcards ) {
        this.flashcards = flashcards;
        this.card_count = flashcards.size();
    }

    @OneToMany(mappedBy = "stack", fetch = FetchType.EAGER, cascade = { CascadeType.REMOVE, CascadeType.MERGE })
    public List<Flashcard> flashcards;

    @Column(name = "last_update", nullable = false, updatable = true, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    public Timestamp last_update;

    public List<Flashcard> getFlashcards() {
        return flashcards;
    }


    public User getUser() {
        return user;
    }

}
