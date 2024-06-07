package org.example.webdemo.authen.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.example.webdemo.authen.dto.req.IdTokenRequestDto;
import org.example.webdemo.authen.service.oauth2.AuthSocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/social")
@CrossOrigin(originPatterns = "*",allowCredentials = "true")
public class AuthSocialController {
    @Autowired
    private AuthSocialService authSocialService;

    @PostMapping("/google")
    public ResponseEntity<?> googleOauth2(@RequestBody IdTokenRequestDto idTokenRequestDto, HttpServletResponse response){
        return authSocialService.googleOauth2(idTokenRequestDto,response);
    }
    @GetMapping("/github")
    public ResponseEntity<?> githubOauth2(@RequestParam String code, HttpServletResponse response){
        return authSocialService.githubOauth2(code,response);
    }

}
