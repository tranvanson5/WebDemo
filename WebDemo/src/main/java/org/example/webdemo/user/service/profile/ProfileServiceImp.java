package org.example.webdemo.user.service.profile;

import org.example.webdemo.authen.service.userdetails.UserPrinciple;
import org.example.webdemo.user.dto.res.ProfileRes;
import org.example.webdemo.user.model.User;
import org.example.webdemo.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileServiceImp implements ProfileService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public ResponseEntity<ProfileRes> getProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrinciple principal = (UserPrinciple) authentication.getPrincipal();
            String userId = principal.getId();
            Optional<User> userOptional = userRepository.findById(userId);
            ProfileRes profileRes= new ProfileRes();
            BeanUtils.copyProperties(userOptional.get(),profileRes);
            return new ResponseEntity<>(profileRes, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
