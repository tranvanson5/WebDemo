package org.example.webdemo.utils.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class SessionRepository {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void saveSession(String key, String otp, long duration) {
        redisTemplate.opsForValue().set(key, otp, duration, TimeUnit.MILLISECONDS);
    }

    public String getSession(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteSession(String key) {
        redisTemplate.delete(key);
    }
}
