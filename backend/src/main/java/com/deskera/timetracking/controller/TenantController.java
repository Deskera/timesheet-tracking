package com.deskera.timetracking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.deskera.timetracking.dto.TenantDto;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.service.TenantService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tenants") 
public class TenantController {
	@Autowired
	private TenantService tenantService;
	
	@GetMapping("")
	public ResponseEntity<List<TenantDto>> getAllTenants() {
		return new ResponseEntity<>(tenantService.getAllTenants(),HttpStatus.OK);	
	}
	
	@GetMapping("/{tenantname}")
	public ResponseEntity<TenantDto> getTenantDetailsByName(@PathVariable(value = "tenantname") final String tenantName){
			return new ResponseEntity<>(tenantService.getTenantDetailsByName(tenantName),HttpStatus.OK);

	}

//	@PostMapping("/savetenant")
//	public ResponseEntity<TenantDto> saveTenant(@RequestBody final TenantDto tenantDto) {
//			return new ResponseEntity<>(tenantService.saveTenant(tenantDto),HttpStatus.OK);
//			
//	}
	
	@PostMapping("/initial-setup")
	public ResponseEntity<UserTenantDto> initialSetup(@RequestBody final UserTenantDto userTenantDto,@RequestParam("password") final String password) {
			return new ResponseEntity<>(tenantService.initialSetup(userTenantDto,password),HttpStatus.OK);		
	}
	
	@PutMapping("/edit")
	public ResponseEntity<TenantDto> editUser(@RequestBody final TenantDto tenantDto) {
		
		return new ResponseEntity<>(tenantService.editTenant(tenantDto),HttpStatus.OK);
	}

}
