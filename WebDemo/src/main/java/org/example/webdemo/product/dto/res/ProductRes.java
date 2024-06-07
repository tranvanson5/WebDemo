package org.example.webdemo.product.dto.res;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import org.example.webdemo.image.model.Image;
import org.example.webdemo.product.constain.ProductStatus;
import org.example.webdemo.product.model.Category;
import org.example.webdemo.product.model.ProductDetail;
import org.example.webdemo.user.model.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
public class ProductRes {
    private String id;
    private String name;
    private LocalDateTime createdAt;
    private String description;
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private Set<Image> images= new HashSet<>();

    private Set<Category> categories= new HashSet<>();

    private Set<ProductDetail> productDetails = new HashSet<>();

    private User user;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

}
