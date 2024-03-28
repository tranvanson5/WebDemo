package org.example.webdemo.user.dto.req;

import lombok.Data;

@Data
public class ChangePasswordReq {
    private String oldPassword;
    private String newPassword;
}
