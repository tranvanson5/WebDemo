package org.example.webdemo.authen.service.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.webdemo.authen.dto.req.SignInReq;
import org.example.webdemo.authen.dto.req.SignUpReq;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> signIn(SignInReq signInRequest, HttpServletResponse response);

    ResponseEntity<?> signUp(SignUpReq signUpRequest, HttpServletResponse response);

    ResponseEntity<?> signInVerify(String otp, HttpServletRequest request);
}
