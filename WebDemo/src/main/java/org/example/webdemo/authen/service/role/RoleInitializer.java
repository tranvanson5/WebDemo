package org.example.webdemo.authen.service.role;

import jakarta.annotation.PostConstruct;
import org.example.webdemo.authen.constain.RoleName;
import org.example.webdemo.authen.model.Role;
import org.example.webdemo.authen.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RoleInitializer {
    @Autowired
    private RoleRepository roleRepository;
    @PostConstruct
    public void initRoles() {
        if (roleRepository.count()==0){
            Set<Role> roles = new HashSet<>();
            for (RoleName roleName : RoleName.values()){
                Role role= new Role();
                role.setId(roleName.toString());
                role.setName(roleName);
                roles.add(role);
            }
            roleRepository.saveAll(roles);
        }
    }
}
