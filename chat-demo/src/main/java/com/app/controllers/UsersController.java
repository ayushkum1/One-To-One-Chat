package com.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.app.exception.NoUserExistException;
import com.app.exception.UserAlreadyExistException;
import com.app.storage.UserStorage;

@CrossOrigin("*")
@RestController
public class UsersController {

	//i feel this could be post mapping and not get mapping as we are registering
	@GetMapping("/registration/{userName}")
	public ResponseEntity<?> register(@PathVariable String userName) throws NoUserExistException{
		System.out.println("inside user controller " + userName);
		try {
			UserStorage.getInstance().setUsers(userName);
			UserStorage.getInstance().getUsers().forEach(System.out::println);
		}catch (UserAlreadyExistException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.ok().build();//build the response entity with no body
	}
	
	@GetMapping("/fetchAllUsers")
	public ResponseEntity<?> fetchAll(){
		try {
			return ResponseEntity.ok(UserStorage.getInstance().getUsers());
		}catch (NoUserExistException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
}
