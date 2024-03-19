package org.example.webdemo.user.dto.res;

import lombok.Data;
import org.example.webdemo.user.constain.UserGender;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ProfileRes {
    private String id;
    private String name;
    private LocalDate dob;
    private UserGender gender;
    private String address;
    private String email;
    private String username;
    private LocalDateTime createdAt;
}
