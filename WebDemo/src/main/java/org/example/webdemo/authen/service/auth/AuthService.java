package org.example.webdemo.authen.service.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.webdemo.authen.dto.req.SetChangePassword;
import org.example.webdemo.authen.dto.req.SignInReq;
import org.example.webdemo.authen.dto.req.SignUpReq;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> signIn(SignInReq signInRequest, HttpServletResponse response);

    ResponseEntity<?> signUp(SignUpReq signUpRequest);

    ResponseEntity<?> signInVerify(String otp);

    ResponseEntity<?> forgotPassword(String email);
    ResponseEntity<?> forgotPasswordVerify(String otp);

    ResponseEntity<?> changePassword(SetChangePassword setChangePassword);

    ResponseEntity<?> signOut(HttpServletResponse response);
}
