package org.example.webdemo.product.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;
import org.example.webdemo.product.constain.ProductStatus;
import org.example.webdemo.image.model.Image;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class ProductDetail {
    @Id
    @GeneratedValue(generator = "prefixed-uuid")
    @GenericGenerator(
            name = "prefixed-uuid",
            strategy = "org.example.webdemo.utils.uuid.PrefixedUuidGenerator",
            parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "product"))
    private String id;
    private String name;
    private BigDecimal price;
    private int quantity;
    private String description;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonBackReference
    private Product product;

    @ManyToMany
    private List<Image> images = new ArrayList<>();

}
