package org.example.webdemo.image.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
public class Image {
    @Id
    @GeneratedValue(generator = "prefixed-uuid")
    @GenericGenerator(
            name = "prefixed-uuid",
            strategy = "org.example.webdemo.utils.uuid.PrefixedUuidGenerator",
            parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = "image"))
    private String id;
    private String url;
}
