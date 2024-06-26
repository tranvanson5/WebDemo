package org.example.webdemo.authen.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.example.webdemo.authen.dto.req.SetChangePassword;
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
    @GetMapping("/signout")
    public ResponseEntity<?> signOut(HttpServletResponse response){
        return authService.signOut(response);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpReq signUpRequest){
        return authService.signUp(signUpRequest);
    }

    @GetMapping("/signup/verify")
    public ResponseEntity<?> signInVerify (@RequestParam(name = "otp") String otp){
        return authService.signInVerify(otp);
    }
    @GetMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword (@RequestParam(name = "email") String email){
        return authService.forgotPassword(email);
    }
    @GetMapping("/forgot-password/verify")
    public ResponseEntity<?> forgotPasswordVerify (@RequestParam(name = "otp") String otp){
        return authService.forgotPasswordVerify(otp);
    }
    @PostMapping("/forgot-password/change-password")
    public ResponseEntity<?> changePassword (@RequestBody SetChangePassword setChangePassword){
        return authService.changePassword(setChangePassword);
    }
}
