package org.example.webdemo.authen.service.oauth2;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.servlet.http.HttpServletResponse;
import org.example.webdemo.authen.constain.RoleName;
import org.example.webdemo.authen.dto.req.IdTokenRequestDto;
import org.example.webdemo.authen.model.Role;
import org.example.webdemo.authen.repository.RoleRepository;
import org.example.webdemo.authen.service.jwt.JwtProvider;
import org.example.webdemo.authen.service.userdetails.UserPrinciple;
import org.example.webdemo.user.model.User;
import org.example.webdemo.user.repository.UserRepository;
import org.example.webdemo.utils.HTTPonly.HttpOnlyService;
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

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

@Service
public class AuthSocialServiceImpl implements AuthSocialService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

   
    @Autowired
    private UserRepository userRepository;

    private static final String accessToken = "accessToken";

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



    @Value("${security.jwt.secret}")
    private final String jwtSecretKey = null;

  
    @Value("${security.defaultPassword}")
    private String password;

    @Override
    public ResponseEntity<?> googleOauth2(IdTokenRequestDto idTokenRequestDto, HttpServletResponse response) {
        try {
            String idToken = idTokenRequestDto.getIdToken();
            GoogleIdToken.Payload payload = validateIdToken(idToken);
            if (payload == null) {
                return ResponseEntity.badRequest().body("Invalid ID token");
            }
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                String originalUrl = (String) payload.get("picture");
                String resizedUrl = resizeImageUrl(originalUrl, 1080);

                User user = new User();
                user.setEmail(email);
                user.setName(name);
                user.setPassword(passwordEncoder.encode(password));
                user.setAvatar(resizedUrl);
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));

                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                user.setRoles(roles);
                User savedUser = userRepository.save(user);
                savedUser.setUsername(savedUser.getId());
                userRepository.save(user);
                return signIn(user.getUsername(), response);
            } else {
                return signIn(userOptional.get().getUsername(), response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during authentication");
        }
    }

    @Override
    public ResponseEntity<?> githubOauth2(String code, HttpServletResponse response) {
        return null;
    }

    private GoogleIdToken.Payload validateIdToken(String idToken) {
        try {
            HttpTransport transport = new NetHttpTransport();
            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(clientId))
                    .build();

            GoogleIdToken token = verifier.verify(idToken);
            if (token != null) {
                return token.getPayload();
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
        }

        return null;
    }
    public ResponseEntity<?> signIn(String username, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            String jwt = jwtProvider.generateJwtToken(authentication);
            UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("accessToken", jwt);
            responseMap.put("roles", userDetails.getAuthorities());
            Date expirationDate = jwtProvider.extractExpiration(jwt, jwtSecretKey);
            long maxAgeInSeconds = (expirationDate.getTime() - System.currentTimeMillis()) / 1000;
            httpOnlyService.setCookie(response, accessToken, jwt, (int) maxAgeInSeconds);

            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public static String resizeImageUrl(String originalUrl, int newSize) {
        // Kiểm tra xem URL có chứa tham số "s96-c" không
        if (originalUrl.contains("=s96-c")) {
            // Thay thế "s96-c" thành "s<size>-c"
            String resizedUrl = originalUrl.replace("=s96-c", "=s" + newSize + "-c");
            return resizedUrl;
        } else {
            // Nếu không có tham số "s96-c", chỉ cần thêm tham số "s<size>-c" vào cuối URL
            String resizedUrl = originalUrl + "=s" + newSize + "-c";
            return resizedUrl;
        }
    }
}
