package com.deskera.timetracking;


import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Date;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.deskera.timetracking.common.COUNTRY;
import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.dto.ImageDto;
import com.deskera.timetracking.dto.TenantDto;
import com.deskera.timetracking.dto.TenantEntityMapper;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserEntityMapper;
import com.deskera.timetracking.dto.UserResponseDto;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.repository.TenantRepository;
import com.deskera.timetracking.repository.UserRepository;
import com.deskera.timetracking.service.TenantService;
import com.deskera.timetracking.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest()
//@EnableConfigurationProperties
@TestMethodOrder(OrderAnnotation.class)
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = Replace.NONE)

class UserServiceTests {
	
	@Autowired
    private UserService userService;
	@Autowired
    private TenantService tenantService;
	
	@Test
	@Order(1)
	public void testSaveUser() {
			TenantDto tenantDto=new TenantDto("test-tenant1","IN","xyz.com","788967786");
			UserDto userDto=new UserDto("Akansha","B","testemail1@gmail.com","developer","9089789078","FEMALE","29-10-2021",1,"test-tenant1");
	        
			tenantService.initialSetup(new UserTenantDto(userDto,tenantDto),"testpassword");
			
	        UserResponseDto testuser = userService.getUserByEmail(userDto.getEmail());
	        assertEquals(testuser.getUserDto().getEmail(),"testemail1@gmail.com");
	}
	@Test
	@Order(2)
	public void testEditUser() {
			UserDto userDto=new UserDto("Akansha","Akansha","testemail2@gmail.com","manager","9089789078","FEMALE","29-10-2021",1,"");
	        long uid=userService.getUserByEmail("testemail1@gmail.com").getUserId();
			userService.editUser(new UserResponseDto(uid,userDto));
			
	        UserResponseDto userDetails = userService.getUserById(uid);
	        assertEquals(userDetails.getUserDto().getEmail(),"testemail2@gmail.com");
	        assertEquals(userDetails.getUserDto().getDesignation(),"manager");
	        assertEquals(userDetails.getUserDto().getLastName(),"Akansha");
	        
	}
	@Test
	@Order(3)
	public void testUserLogin() {
		ImageDto imageDto=new ImageDto();
		UserTenantDto userDetails=(UserTenantDto) userService.isValidLogin("testemail2@gmail.com", "testpassword").get("user");
			
	    assertEquals(userDetails.getUserDto().getEmail(),"testemail2@gmail.com");
	    assertEquals(userDetails.getTenantDto().getTenantName(),"test-tenant1");
	}
	@Test
	@Order(4)
	public void testDeleteUser() {
			userService.deleteUserByEmail("testemail2@gmail.com");
			tenantService.deleteTenantByName("test-tenant1");
	}

}
