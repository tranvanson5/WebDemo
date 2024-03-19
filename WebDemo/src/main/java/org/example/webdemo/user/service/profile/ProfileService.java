package org.example.webdemo.user.service.profile;

import org.example.webdemo.user.dto.res.ProfileRes;
import org.springframework.http.ResponseEntity;

public interface ProfileService {
    ResponseEntity<ProfileRes> getProfile();
}
