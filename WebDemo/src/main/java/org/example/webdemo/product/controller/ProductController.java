package org.example.webdemo.product.controller;

import org.example.webdemo.product.service.public_product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("public/product")
@CrossOrigin(originPatterns = "*",allowCredentials = "true")
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping("")
    public ResponseEntity<?> listProduct(@PageableDefault(5) Pageable pageable,@RequestParam("search") String search){
        return productService.listProduct(pageable,search);
    }
    @GetMapping("getById")
    public ResponseEntity<?> getByIdProduct(@RequestParam("id") String id){
        return productService.getByIdProduct(id);
    }
    @GetMapping("getById/getAllProductDetails")
    public ResponseEntity<?> getAllProductDetails(@RequestParam("id") String id) {
        return productService.getAllProductDetails(id);
    }

}
