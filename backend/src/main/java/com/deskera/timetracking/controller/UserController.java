package com.deskera.timetracking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.service.UserService;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

//get all users from user table
	@GetMapping("")
	public ResponseEntity<List<UserDto>> getAllUsers() {
		return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);	
	}

//get all users of an organization(by org name)
	@GetMapping("/tenant/{tenantname}")
	public ResponseEntity<List<UserDto>> getAllUsers(@PathVariable("tenantname") final String tenantName) {
		return new ResponseEntity<>(userService.getAllUsersByTenantName(tenantName),HttpStatus.OK);	
	}
	
//user login with email and password(match)
	@GetMapping("/login")	
	public ResponseEntity<UserTenantDto> login(@RequestParam("email") final String email,@RequestParam("password") final String password) {
		return new ResponseEntity<>(userService.isValidLogin(email,password),HttpStatus.OK);	
	}

//	add new user (returns details of the new user)
	@PostMapping(value="/save")
	public ResponseEntity<UserDto> saveUser(@RequestBody final UserDto userDto,@RequestParam final String password) {
		
		return new ResponseEntity<>(userService.saveUser(userDto,password),HttpStatus.OK);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<UserDto> deleteUser(@RequestParam final String email) {
		
		return new ResponseEntity<>(userService.deleteUserByEmail(email),HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<UserDto> editUser(@RequestBody final UserDto userDto) {
		
		return new ResponseEntity<>(userService.editUser(userDto),HttpStatus.OK);
	}
	
	@GetMapping("/search")	
	public ResponseEntity<Boolean> isPresent(@RequestParam("email") final String email) {
		return new ResponseEntity<>(userService.isPresent(email),HttpStatus.OK);	
	}
}
 
