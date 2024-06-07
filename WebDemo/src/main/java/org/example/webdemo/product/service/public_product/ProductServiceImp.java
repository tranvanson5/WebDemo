package org.example.webdemo.product.service.public_product;

import java.util.List;

import org.example.webdemo.product.constain.ProductStatus;
import org.example.webdemo.product.model.Product;
import org.example.webdemo.product.model.ProductDetail;
import org.example.webdemo.product.repository.ProductDetailRepository;
import org.example.webdemo.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    private ProductRepository productRepository;
       @Autowired
       private ProductDetailRepository productDetailRepository;

    public ResponseEntity<?> listProduct(Pageable pageable, String search) {
        try {
            Page<Product> products = productRepository.findByStatusNotAndIdContainingIgnoreCaseOrNameContaining(ProductStatus.DISCONTINUED,search,search,pageable);
            return new ResponseEntity<>(products,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getByIdProduct(String id) {
        try {
            Product product = productRepository.findById(id).get();
            return new ResponseEntity<>(product,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getAllProductDetails(String id) {
        try {
            List<ProductDetail> productDetails = productDetailRepository.findByProductId(id);
            return new ResponseEntity<>(productDetails, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
