package org.example.webdemo.product.repository;

import java.util.List;

import org.example.webdemo.product.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, String> {
    List<ProductDetail> findByProductId(String productId);
}
