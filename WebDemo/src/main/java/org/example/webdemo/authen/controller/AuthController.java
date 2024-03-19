package org.example.webdemo.authen.controller;

import org.example.webdemo.authen.dto.req.SignInReq;
import org.example.webdemo.authen.dto.req.SignUpReq;
import org.example.webdemo.authen.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpReq signUpRequest){
        return authService.signUp(signUpRequest);
    }
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInReq signInRequest){
        return authService.signIn(signInRequest);
    }
}
