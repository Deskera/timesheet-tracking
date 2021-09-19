package com.deskera.timetracking.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

import com.deskera.timetracking.common.Mail;
import com.deskera.timetracking.dto.ImageDto;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserResponseDto;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.service.UserService;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	//get all users from user table
//	@GetMapping("")
//	public ResponseEntity<Map<String,Object>> getAllUsers() {
//		return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);	
//	}

	//get all users of an organization(by org name)
	@GetMapping("/tenant/{tenantname}")
	public ResponseEntity<Map<String,Object>> getAllUsers(@PathVariable("tenantname") final String tenantName,
		    @RequestParam(defaultValue = "0") int page,
		    @RequestParam(defaultValue = "5") int size,
		    @RequestParam(defaultValue = "firstName,ASC") String[] sort,
		    @RequestParam(value = "global", required = false,defaultValue = "") final String global,
			@RequestParam(value = "name", required = false,defaultValue = "") final String name,
			@RequestParam(value = "email", required = false,defaultValue = "") final String email,
			@RequestParam(value = "designation", required = false,defaultValue = "") final String designation,
			@RequestParam(value = "contactnumber", required = false,defaultValue = "") final String contactnumber,
			@RequestParam(value = "gender", required = false,defaultValue = "") final String gender,
			@RequestParam(value = "joiningdate", required = false,defaultValue = "") final String joiningdate) {
			
		Pageable pageable = PageRequest.of(page, size,Sort.by(Direction.valueOf(sort[1]),sort[0]));
		if(!global.isEmpty())
			return new ResponseEntity<>(userService.getAllUsersGlobal(tenantName,pageable,global),HttpStatus.OK);
		return new ResponseEntity<>(userService.getAllUsersByTenantName(tenantName,pageable,name,email,designation,contactnumber,gender,joiningdate),HttpStatus.OK);	
	}
	
	//user login with email and password(match)
	@PostMapping("/login")	
	public ResponseEntity<Map<String,Object>> login(@RequestParam("email") final String email,
			@RequestParam("password") final String password) {
		return new ResponseEntity<>(userService.isValidLogin(email,password),HttpStatus.OK);	
	}
		
	@PostMapping("/clockin")	
	public ResponseEntity<LocalDateTime> clockin(@RequestParam("uid") final long uid,
			@RequestParam final double latitude,
			@RequestParam final double longitude,
			@RequestBody final ImageDto imageDto) {
		return new ResponseEntity<>(userService.clockin(uid,latitude,longitude,imageDto),HttpStatus.OK);	
	}
	
	@PostMapping("/clockout")
	public ResponseEntity<LocalDateTime> clockout(@RequestParam("uid") final long uid,
			@RequestParam final double latitude,
			@RequestParam final double longitude,
			@RequestBody final ImageDto imageDto)
	{
		return new ResponseEntity<>(userService.clockout(uid,latitude,longitude,imageDto),HttpStatus.OK);
	}
	
//	@PostMapping(value="/image")
//	public ResponseEntity<String> saveImage(@RequestBody final ImageDto imageDto,@RequestParam final long logId) {
//		userService.saveImage(logId,imageDto);
//		return new ResponseEntity<>("image saved",HttpStatus.OK);
//	}
	
	//add new user (returns details of the new user)
	@PostMapping(value="/save")
	public ResponseEntity<UserResponseDto> saveUser(@RequestBody final UserDto userDto,@RequestParam final String password) {
		
		return new ResponseEntity<>(userService.saveUser(userDto,password),HttpStatus.OK);
	}
	
	@PostMapping(value="/location")
	public ResponseEntity<String> saveUserLocation(@RequestParam final long userId,@RequestParam final double latitude,@RequestParam final double longitude) {
		userService.saveLocation(userId,latitude,longitude);
		return new ResponseEntity<>("location saved",HttpStatus.OK);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<UserResponseDto> deleteUser(@RequestParam final String email) {
		
		return new ResponseEntity<>(userService.deleteUserByEmail(email),HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<UserResponseDto> editUser(@RequestBody final UserResponseDto userResponseDto) {
		
		return new ResponseEntity<>(userService.editUser(userResponseDto),HttpStatus.OK);
	}
	
	@GetMapping("/search")	
	public ResponseEntity<Boolean> isPresent(@RequestParam("email") final String email) {
		return new ResponseEntity<>(userService.isPresent(email),HttpStatus.OK);	
	}
	
	@GetMapping("/worktimehistory")	
	public ResponseEntity<Map<String,Object>> workingTimeHistory(@RequestParam("uid") final long userId,
			@RequestParam(defaultValue = "0") int page,
		    @RequestParam(defaultValue = "5") int size,
			@RequestParam(value = "from", required = false,defaultValue = "") final String fromDate,
			@RequestParam(value = "to", required = false,defaultValue = "") final String toDate) {
		Pageable pageable = PageRequest.of(page, size);
		
		return new ResponseEntity<>(userService.workingTimeHistory(userId,pageable,fromDate,toDate),HttpStatus.OK);	
		
	}
	
}
 
