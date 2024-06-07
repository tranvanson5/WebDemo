package org.example.webdemo.user.service.profile;

import org.example.webdemo.authen.service.userdetails.UserPrinciple;
import org.example.webdemo.user.dto.req.ChangePasswordReq;
import org.example.webdemo.user.dto.req.ProfileReq;
import org.example.webdemo.user.dto.res.ProfileRes;
import org.example.webdemo.user.dto.res.UploadAvatar;
import org.example.webdemo.user.model.User;
import org.example.webdemo.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ProfileServiceImp implements ProfileService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
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

    @Override
    public ResponseEntity<?> uploadAvatar(UploadAvatar uploadAvatar) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrinciple principal = (UserPrinciple) authentication.getPrincipal();
            String userId = principal.getId();
            Optional<User> userOptional = userRepository.findById(userId);
            User user= userOptional.get();
            user.setAvatar(uploadAvatar.getAvatar());
            userRepository.save(user);
            Map<String,String> map= new HashMap<>();
            map.put("avatar",user.getAvatar());
            return new ResponseEntity<>(map,HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> uploadProfile(ProfileReq profileReq) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrinciple principal = (UserPrinciple) authentication.getPrincipal();
            String userId = principal.getId();
            Optional<User> userOptional = userRepository.findById(userId);
            User user= userOptional.get();
            user.setName(profileReq.getName());
            user.setGender(profileReq.getGender());
            user.setDob(profileReq.getDob());
            user.setPhone(profileReq.getPhone());
            user.setAddress(profileReq.getAddress());
            userRepository.save(user);
            return new ResponseEntity<>(profileReq,HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> changePassword(ChangePasswordReq changePasswordReq) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrinciple principal = (UserPrinciple) authentication.getPrincipal();
            String userId = principal.getId();
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                boolean isOldPasswordCorrect = passwordEncoder.matches(changePasswordReq.getOldPassword(), user.getUserPassword());
                if (!isOldPasswordCorrect) {
                    return new ResponseEntity<>("Incorrect old password",HttpStatus.BAD_REQUEST);
                }
                user.setUserPassword(passwordEncoder.encode(changePasswordReq.getNewPassword()));
                userRepository.save(user);
                Map<String,String> map= new HashMap<>();
                map.put("messenger","Password changed successfully");
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
