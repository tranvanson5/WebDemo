package org.example.webdemo.product.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.example.webdemo.product.constain.ProductStatus;
import org.example.webdemo.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    Page<Product> findByStatusNotAndIdContainingIgnoreCaseOrNameContaining(@Param("status") ProductStatus status,
                                                                           @Param("id") String id,
                                                                           @Param("name") String name,
                                                                           Pageable pageable);}
