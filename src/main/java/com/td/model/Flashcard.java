package com.td.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "cards")
public class Flashcard {
    @Id
    @GeneratedValue
    public long id;

    public String front;
    public String back;

    @Column(name = "last_update", nullable = false, updatable = true, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    public Timestamp last_update;

    public float probability;

    @JsonIgnore
    @ManyToOne(optional = false)
    public CardStack stack;
}
