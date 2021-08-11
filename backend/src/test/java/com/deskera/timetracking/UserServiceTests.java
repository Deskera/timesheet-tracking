package com.deskera.timetracking;


import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.deskera.timetracking.common.COUNTRY;
import com.deskera.timetracking.common.GENDER;
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
//@TestMethodOrder(OrderAnnotation.class)
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = Replace.NONE)

class UserRepoTests {
	
	@Autowired
    private UserService userService;
	@Autowired
    private TenantService tenantService;
	
	@Test
	public void testSaveUser() {
			TenantDto tenantDto=new TenantDto("test-tenant1","IN","xyz.com","7889677867");
			UserDto userDto=new UserDto("Akansha","B","abc@gmail.com","developer","9089789078","FEMALE","29-10-2021",1,"test-tenant1");
	        
			tenantService.initialSetup(new UserTenantDto(userDto,tenantDto),"testpassword");
			
	        UserResponseDto testuser = userService.getUserByEmail(userDto.getEmail());
	        assertEquals(testuser.getUserDto().getEmail(),"abc@gmail.com");
	}

}
