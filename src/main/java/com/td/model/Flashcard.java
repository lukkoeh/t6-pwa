package com.td.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "cards")
public class Flashcard {
    @Id
    @GeneratedValue
    public long id;

    public String front;
    public String back;

    public float probability;

    @JsonIgnore
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    public CardStack stack;
}
