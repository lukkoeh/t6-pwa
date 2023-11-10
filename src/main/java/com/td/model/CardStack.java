package com.td.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.td.auth.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="stacks")
public class CardStack {
    @Id
    @GeneratedValue
    public long id;
    public long getId() {
        return id;
    }

    public String name;

    @JsonIgnore
    @ManyToOne(optional = false)
    public User user;

    @OneToMany(mappedBy = "stack", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public List<Flashcard> flashcards;
    public List<Flashcard> getFlashcards () {
        return flashcards;
    }

    public User getUser(){
        return user;
    }
}
