package com.deskera.timetracking;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDateTime;
import java.util.Date;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserEntityMapper;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.repository.RoleRepository;
import com.deskera.timetracking.repository.TenantRepository;
import com.deskera.timetracking.repository.UserRepository;
import com.deskera.timetracking.service.TenantService;
import com.deskera.timetracking.service.UserServiceImpl;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class UserServiceTests {

//	private static final UserEntityMapper USER_ENTITY_MAPPER = new UserEntityMapper();
//	
//	@InjectMocks 
//	UserServiceImpl userService;
//	
//	@InjectMocks 
//	TenantService tenantService;
//	
//	@Mock
//	UserRepository userRepository;
//	
//	@Mock
//	TenantRepository tenantRepository;
//	
//	@Mock
//	RoleRepository roleRepository;
//	
//	@Test
//	@Order(1)
//	public void saveUsersTest() {
//		UserDto user1=new UserDto();
//		user1.setFirstName("Abc");
//		user1.setLastName("Def");
//		user1.setContactNumber("6798560956");
//		user1.setDesignation("HR");
//		user1.setEmail("t1@gmail.com");
//		user1.setGender(GENDER.MALE);
//		Date d=new Date();
//		//d.parse("2020-10-03");  
//		user1.setJoiningDate(d.toString());
//		user1.setRoleId(2);
//		user1.setTenantName("tenant");
//		userService.saveUser(user1, "test");
//		Tenant t = tenantRepository.findByTenantName(user1.getTenantName()).get();
//		Role r = roleRepository.findById(user1.getRoleId()).get();
//		verify(userRepository,times(1)).save(USER_ENTITY_MAPPER.mapUser(user1,t,r));
//	}

}
