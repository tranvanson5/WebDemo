package org.example.webdemo.order.model;

import java.time.LocalDateTime;

import org.example.webdemo.order.constain.OrderStatus;
import org.example.webdemo.order.constain.PaymentMethod;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "orders") // Đổi tên bảng từ "order" thành "orders"

public class Order {
    @Id
    @GeneratedValue(generator = "prefixed-uuid")
    @GenericGenerator(name = "prefixed-uuid", strategy = "org.example.webdemo.utils.uuid.PrefixedUuidGenerator", parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "Order"))
    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String note;

    // Trong class Order
    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

}
