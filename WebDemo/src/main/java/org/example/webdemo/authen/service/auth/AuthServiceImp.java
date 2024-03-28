package org.example.webdemo.authen.service.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.webdemo.authen.constain.RoleName;
import org.example.webdemo.authen.dto.req.SignInReq;
import org.example.webdemo.authen.dto.req.SignUpReq;
import org.example.webdemo.authen.model.Role;
import org.example.webdemo.authen.repository.RoleRepository;
import org.example.webdemo.authen.service.jwt.JwtProvider;
import org.example.webdemo.authen.service.userdetails.UserPrinciple;
import org.example.webdemo.user.constain.UserStatus;
import org.example.webdemo.user.model.User;
import org.example.webdemo.user.repository.UserRepository;
import org.example.webdemo.utils.HTTPonly.HttpOnlyService;
import org.example.webdemo.utils.OTPGenerator.OTPGenerator;
import org.example.webdemo.utils.sendmail.EmailService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthServiceImp implements AuthService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private HttpOnlyService httpOnlyService;

    @Autowired
    private OTPGenerator otpGenerator;

    @Autowired
    private EmailService emailService;

    @Value("${security.jwt.secret}")
    private final String jwtSecretKey = null;
    @Override
    public ResponseEntity<?> signIn(SignInReq signInRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));
            String jwt = jwtProvider.generateJwtToken(authentication);
            UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("accessToken", jwt);
            responseMap.put("roles", userDetails.getAuthorities());
            Date expirationDate = jwtProvider.extractExpiration(jwt,jwtSecretKey);
            long maxAgeInSeconds = (expirationDate.getTime() - System.currentTimeMillis()) / 1000;
            httpOnlyService.setCookie(response, "accessToken", jwt, (int) maxAgeInSeconds);

            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Override
    public ResponseEntity<?> signUp(SignUpReq signUpRequest, HttpServletResponse response) {
        try {
            String otp = otpGenerator.generateOTP();
            Map<String, String> map = new HashMap<>();
            map.put("message", "Send mail otp success");
            emailService.sendSimpleEmail(signUpRequest.getEmail(),"","Otp: "+ otp);
            ObjectMapper objectMapper = new ObjectMapper();
            String userJson = objectMapper.writeValueAsString(signUpRequest);
            String encodedUserJson = Base64.getEncoder().encodeToString(userJson.getBytes());

            httpOnlyService.setCookie(response, otp, encodedUserJson, 1000 * 5);

            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> signInVerify(String otp, HttpServletRequest request) {
        try {
            Cookie cookie = httpOnlyService.getCookie(request, otp);
            
            if (cookie == null) {
                return new ResponseEntity<>("No sign-up data found", HttpStatus.BAD_REQUEST);
            }

            String encodedUserJson = cookie.getValue();

            byte[] decodedBytes = Base64.getDecoder().decode(encodedUserJson);
            String decodedString = new String(decodedBytes);

            SignUpReq signUpReq = new ObjectMapper().readValue(decodedString, SignUpReq.class);

            User user=new User();

            BeanUtils.copyProperties(signUpReq,user);
            user.setPassword(passwordEncoder.encode(signUpReq.getPassword()));
            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));

            Set<Role> roles = new HashSet<>();
            roles.add(userRole);
            user.setRoles(roles);

            userRepository.save(user);

            Map<String, String> map = new HashMap<>();
            map.put("message", "Create signup success");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
