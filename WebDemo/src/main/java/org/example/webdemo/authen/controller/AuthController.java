package org.example.webdemo.authen.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.webdemo.authen.dto.req.SignInReq;
import org.example.webdemo.authen.dto.req.SignUpReq;
import org.example.webdemo.authen.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(originPatterns = "*",allowCredentials = "true")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInReq signInRequest,HttpServletResponse response){
        return authService.signIn(signInRequest,response);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpReq signUpRequest,HttpServletResponse response){
        return authService.signUp(signUpRequest,response);
    }

    @GetMapping("/signup/verify")
    public ResponseEntity<?> signInVerify (@RequestParam(name = "otp") String otp, HttpServletRequest request){
        return authService.signInVerify(otp,request);
    }
    
}
