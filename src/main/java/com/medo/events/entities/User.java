package com.medo.events.entities;

import jakarta.persistence.*;
import lombok.Data;

import javax.management.relation.Role;


@Entity
@Data

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String firstName;
    private String lastName;
    @Column(unique = true, nullable = false )
    private String userName;
    @Column( nullable = false)
    private String password;
    private Long phone;
    @Column( nullable = false)
    private Role role;
}
