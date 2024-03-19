package org.example.webdemo.authen.dto.req;

import lombok.Data;

@Data
public class SignUpReq {
    private String name;
    private String email;
    private String username;
    private String password;
}