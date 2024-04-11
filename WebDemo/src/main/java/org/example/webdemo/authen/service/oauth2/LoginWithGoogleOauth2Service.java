package org.example.webdemo.authen.service.oauth2;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import com.google.api.client.http.javanet.NetHttpTransport;

import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.example.webdemo.authen.constain.RoleName;
import org.example.webdemo.authen.dto.req.IdTokenRequestDto;
import org.example.webdemo.authen.model.Role;
import org.example.webdemo.authen.repository.RoleRepository;
import org.example.webdemo.authen.service.jwt.JwtProvider;
import org.example.webdemo.authen.service.userdetails.UserPrinciple;
import org.example.webdemo.user.model.User;
import org.example.webdemo.user.repository.UserRepository;
import org.example.webdemo.utils.HTTPonly.HttpOnlyService;
import org.example.webdemo.utils.OTPGenerator.OTPGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;
import org.apache.commons.codec.binary.Base64;

@Service
public class LoginWithGoogleOauth2Service {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private HttpOnlyService httpOnlyService;

    @Value("${security.jwt.secret}")
    private final String jwtSecretKey = null;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OTPGenerator otpGenerator;

    private static final String accessToken = "accessToken";

    private final GoogleIdTokenVerifier verifier;

    @Autowired
    public LoginWithGoogleOauth2Service(@Value("${security.googleClientId}") String clientId, UserRepository userRepository,JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();
        verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public ResponseEntity loginOAuthGoogle(IdTokenRequestDto requestBody, HttpServletResponse response) {
        User account = verifyIDToken(requestBody.getIdToken());
        account = createOrUpdateUser(account);

        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Role role : account.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getName().toString()));
        }

        Authentication authentication = new OAuth2LoginAuthenticationToken(requestBody.getIdToken(),null, authorities);

        String jwt = jwtProvider.generateJwtToken(authentication);
        if (account == null) {
            throw new IllegalArgumentException();
        }
        UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("accessToken", jwt);
        responseMap.put("roles", userDetails.getAuthorities());
        Date expirationDate = jwtProvider.extractExpiration(jwt, jwtSecretKey);
        long maxAgeInSeconds = (expirationDate.getTime() - System.currentTimeMillis()) / 1000;
        httpOnlyService.setCookie(response, accessToken, jwt, (int) maxAgeInSeconds);

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }


    @Transactional
    public User createOrUpdateUser(User account) {
        Optional<User> existingAccountOptional = userRepository.findByEmail(account.getEmail());
        User existingAccount = null;
        if (existingAccountOptional.isPresent()) {
            existingAccount = existingAccountOptional.get();
            existingAccount.setName(account.getName());
            existingAccount.setAvatar(account.getAvatar());
            if (existingAccount.getRoles() == null || existingAccount.getRoles().isEmpty()) {
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));

                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                existingAccount.setRoles(roles);
            }
            return userRepository.save(existingAccount);
        } else {
            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));

            Set<Role> roles = new HashSet<>();
            roles.add(userRole);
            account.setRoles(roles);
            account.setUsername(UUID.randomUUID().toString().substring(0, 15));
            return userRepository.save(account);
        }
    }

    private User verifyIDToken(String idToken) {
        try {
            GoogleIdToken idTokenObj = verifier.verify(idToken);
            if (idTokenObj == null) {
                return null;
            }
            GoogleIdToken.Payload payload = idTokenObj.getPayload();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");
            String name = lastName + firstName;
            String email = payload.getEmail();
            String pictureUrl = (String) payload.get("picture");

            return new User(name, email, pictureUrl);
        } catch (GeneralSecurityException | IOException e) {
            return null;
        }
    }
}
