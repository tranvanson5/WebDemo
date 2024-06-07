package org.example.webdemo.user.dto.req;

import lombok.Data;
import org.example.webdemo.user.constain.UserGender;

import java.time.LocalDate;

@Data
public class ProfileReq {
    private String name;
    private LocalDate dob;
    private UserGender gender;
    private String phone;
    private String address;
}
