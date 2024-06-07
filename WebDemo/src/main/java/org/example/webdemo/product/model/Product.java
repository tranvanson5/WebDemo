package org.example.webdemo.product.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.example.webdemo.product.constain.ProductStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(generator = "prefixed-uuid")
    @GenericGenerator(
            name = "prefixed-uuid",
            strategy = "org.example.webdemo.utils.uuid.PrefixedUuidGenerator",
            parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "product"))
    private String id;
    private String name;
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "text")
    private String shortDescription;

    @Column(columnDefinition = "longtext")
    private String description;

    @Column(columnDefinition = "text")
    private String image;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @OneToMany(mappedBy = "product",
            cascade = CascadeType.ALL
    )
    @JsonManagedReference
    private List<ProductDetail> productDetails = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "product_categories",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories = new ArrayList<>();
}
