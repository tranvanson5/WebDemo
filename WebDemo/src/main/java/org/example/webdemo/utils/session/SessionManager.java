package org.example.webdemo.utils.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SessionManager {
    @Autowired
    private SessionRepository sessionRepository;

    public void setSession(String key, String value, long duration) {
        sessionRepository.saveSession(key, value, duration);
    }

    public String getSession(String key) {
        return sessionRepository.getSession(key);
    }

    public void deleteSession(String key) {
        sessionRepository.deleteSession(key);
    }
}
