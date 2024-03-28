package org.example.webdemo.user.service.profile;

import org.example.webdemo.user.dto.req.ChangePasswordReq;
import org.example.webdemo.user.dto.req.ProfileReq;
import org.example.webdemo.user.dto.res.ProfileRes;
import org.example.webdemo.user.dto.res.UploadAvatar;
import org.springframework.http.ResponseEntity;

public interface ProfileService {
    ResponseEntity<ProfileRes> getProfile();

    ResponseEntity uploadAvatar(UploadAvatar uploadAvatar);

    ResponseEntity<?> uploadProfile(ProfileReq profileReq);

    ResponseEntity<?> changePassword(ChangePasswordReq changePasswordReq);
}
