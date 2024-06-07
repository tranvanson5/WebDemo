package org.example.webdemo.product.service.public_product;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> listProduct(Pageable pageable, String search);

    ResponseEntity<?> getByIdProduct(String id);
    
    ResponseEntity<?> getAllProductDetails(String id);
}
