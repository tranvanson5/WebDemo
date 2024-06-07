package org.example.webdemo.order.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Payment {
    @Id
    private String id;
    private String content;
    // Trong class Payment
    @OneToOne(mappedBy = "payment")
    private Order order;
}
