package org.example.webdemo.authen.service.oauth2;

import jakarta.servlet.http.HttpServletResponse;
import org.example.webdemo.authen.dto.req.IdTokenRequestDto;
import org.springframework.http.ResponseEntity;

public interface AuthSocialService {
    ResponseEntity<?> googleOauth2(IdTokenRequestDto idTokenRequestDto, HttpServletResponse response);

    ResponseEntity<?> githubOauth2(String code, HttpServletResponse response);
}
