package org.example.webdemo.user.controller;

import org.example.webdemo.user.dto.res.ProfileRes;
import org.example.webdemo.user.repository.UserRepository;
import org.example.webdemo.user.service.profile.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("profile")
@CrossOrigin(origins = "*")
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @GetMapping("get")
    public ResponseEntity<ProfileRes> getProfile(){
        return profileService.getProfile();
    }
}
