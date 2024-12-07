//package com.example.cultureapp.service;
//import com.example.cultureapp.model.User;
//public interface UserService {
//	User registerUser(User user);
//    User findByUsername(String username);
//}


//package com.example.cultureapp.service;
//
//import com.example.cultureapp.model.User;
//
//public interface UserService {
//    User registerUser(User user);
//    User findByUsername(String username);
//    boolean matchesPassword(String rawPassword, String encodedPassword);
//}


package com.example.cultureapp.service;

import com.example.cultureapp.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    User findByUsername(String username);
    boolean matchesPassword(String rawPassword, String encodedPassword);
    List<User> findAllUsers();
    Optional<User> findUserById(Long id);
    void deleteUserById(Long id);
}
