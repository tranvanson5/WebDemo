package org.example.webdemo.utils.HTTPonly;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service
public class HttpOnlyServiceImpl implements HttpOnlyService {

    @Override
    public void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        if (response == null || name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Invalid argument provided to setCookie method");
        }

        try {
            Cookie cookie = new Cookie(name, value);
            cookie.setMaxAge(maxAge);
            cookie.setHttpOnly(true);
            cookie.setPath("/"); // Set the cookie path to root to make it accessible across the application
            response.addCookie(cookie);
        } catch (Exception e) {
            throw new RuntimeException("Failed to set cookie: " + e.getMessage(), e);
        }
    }

    @Override
    public Cookie getCookie(HttpServletRequest request, String name) {
        if (request == null || name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Invalid argument provided to getCookie method");
        }

        try {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (name.equals(cookie.getName())) {
                        return cookie;
                    }
                }
            } else {
                System.out.println("No cookies found in the request.");
                return null;
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to get cookie: " + e.getMessage(), e);
        }
        return null;
    }
}
