//package com.example.cultureapp.controller;
//
//import com.example.cultureapp.model.Blog;
//import com.example.cultureapp.service.BlogService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/blogs")
//@CrossOrigin(origins = "http://localhost:3000")
//public class BlogController {
//
//    @Autowired
//    private BlogService blogService;
//
//    @PostMapping
//    public ResponseEntity<?> createBlog(@RequestBody Blog blog) {
//        // Remove the role-based check, allow anyone to post
//        // Optionally, set the author from authentication if required (authentication.getName())
//        Blog createdBlog = blogService.createBlog(blog);
//        return ResponseEntity.ok(createdBlog);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Blog>> getAllBlogs() {
//        return ResponseEntity.ok(blogService.getAllBlogs());
//    }
//}




package com.example.cultureapp.controller;

import com.example.cultureapp.model.Blog;
import com.example.cultureapp.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // Directory where the images will be stored
    private static final String UPLOAD_DIR = "uploaded_images/";

    // Create the directory if it doesn't exist
    static {
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();  // Create the directory if it doesn't exist
        }
    }

    @PostMapping
    public ResponseEntity<?> createBlog(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("author") String author,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setContent(content);
        blog.setAuthor(author);

        if (image != null && !image.isEmpty()) {
            // Generate a unique filename for the image
            String imageName = StringUtils.cleanPath(image.getOriginalFilename());
            Path targetLocation = Paths.get(UPLOAD_DIR + imageName);

            try {
                // Save the image locally
                Files.copy(image.getInputStream(), targetLocation);

                // Set the image URL relative to your server
                blog.setImageUrl(UPLOAD_DIR + imageName);
            } catch (IOException e) {
                return ResponseEntity.status(500).body("Error uploading image");
            }
        }

        Blog createdBlog = blogService.createBlog(blog);
        return ResponseEntity.ok(createdBlog);
    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }
}


