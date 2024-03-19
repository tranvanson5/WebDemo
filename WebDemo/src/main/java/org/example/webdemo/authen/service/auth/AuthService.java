package org.example.webdemo.authen.service.auth;

import org.example.webdemo.authen.dto.req.SignInReq;
import org.example.webdemo.authen.dto.req.SignUpReq;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> signIn(SignInReq signInRequest);

    ResponseEntity<String> signUp(SignUpReq signUpRequest);
}
