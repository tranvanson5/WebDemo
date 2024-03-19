package org.example.webdemo.authen.repository;

import org.example.webdemo.authen.constain.RoleName;
import org.example.webdemo.authen.model.Role;
import org.example.webdemo.user.constain.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> {
    Optional<Role> findByName(RoleName name);
}
