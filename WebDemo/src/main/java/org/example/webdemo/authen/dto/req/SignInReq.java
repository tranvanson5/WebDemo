package org.example.webdemo.authen.dto.req;

import lombok.Data;

@Data
public class SignInReq {
    private String username;
    private String password;
}
