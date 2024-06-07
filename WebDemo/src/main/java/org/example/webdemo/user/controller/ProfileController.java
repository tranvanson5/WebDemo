package org.example.webdemo.user.controller;

import org.example.webdemo.user.dto.req.ChangePasswordReq;
import org.example.webdemo.user.dto.req.ProfileReq;
import org.example.webdemo.user.dto.res.ProfileRes;
import org.example.webdemo.user.dto.res.UploadAvatar;
import org.example.webdemo.user.service.profile.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("profile")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @GetMapping("get")
    public ResponseEntity<ProfileRes> getProfile(){
        return profileService.getProfile();
    }
    @PostMapping("upload")
    public ResponseEntity<?> uploadProfile(@RequestBody ProfileReq profileReq){
        return profileService.uploadProfile(profileReq);
    }
    @PostMapping("upload/avatar")
    public ResponseEntity<?> uploadAvatar(@RequestBody UploadAvatar uploadAvatar){
        return profileService.uploadAvatar(uploadAvatar);
    }
    @PostMapping("change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordReq changePasswordReq){
        System.out.println(changePasswordReq);
        return profileService.changePassword(changePasswordReq);
    }
}
