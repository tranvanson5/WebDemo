package org.example.webdemo.authen.service.userdetails;

import jakarta.transaction.Transactional;
import org.example.webdemo.user.constain.UserStatus;
import org.example.webdemo.user.model.User;
import org.example.webdemo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));


        if (user.getStatus() != UserStatus.ACTIVE) {
            if (user.getStatus() == UserStatus.BLOCK){
                throw new LockedException("Account has been locked");
            }
        }
        return UserPrinciple.build(user);
    }

}