package org.example.webdemo.utils.HTTPonly;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface HttpOnlyService {
    void setCookie(HttpServletResponse response, String name, String value, int maxAge);
    Cookie getCookie(HttpServletRequest request, String name);
    void deleteCookie(HttpServletResponse response, String name);
}
