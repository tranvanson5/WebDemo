package org.example.webdemo.user.model;

import jakarta.persistence.*;
import lombok.Data;
import org.example.webdemo.authen.model.Role;
import org.example.webdemo.user.constain.UserGender;
import org.example.webdemo.user.constain.UserStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(generator = "prefixed-uuid")
    @GenericGenerator(
            name = "prefixed-uuid",
            strategy = "org.example.webdemo.utils.uuid.PrefixedUuidGenerator",
            parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "user"))
    private String id;
    private String name;
    private LocalDate dob;
    @Enumerated(EnumType.STRING)
    private UserGender gender;
    private String phone;
    @Column(columnDefinition = "text")
    private String address;
    @Column(columnDefinition = "text")
    private String avatar;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    @CreationTimestamp
    private LocalDateTime createdAt;



    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles= new HashSet<>();

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    public User() {
    }

    public User(String name, String email, String avatar) {
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }
}
