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
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.repository.TenantRepository;
import com.deskera.timetracking.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest()
//@EnableConfigurationProperties
//@TestMethodOrder(OrderAnnotation.class)
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = Replace.NONE)

class UserRepoTests {

	
	@Autowired
    private UserRepository userRepo;
	@Autowired
    private TenantRepository tenantRepo;
	
	@Test
	public void testSaveUser() {
			Tenant tenant=new Tenant("test-tenant",COUNTRY.IN,"xyz.com","7889677867");
			tenantRepo.save(tenant);
			Role role=new Role(1,"admin");
			Date joiningDate=new Date();
	        
			User user=new User("Akansha","B","abc@gmail.com",tenant,role,"pass","developer","9089789078",GENDER.FEMALE,joiningDate);
	        userRepo.save(user);   
	        
	        User testuser = userRepo.findByEmail(user.getEmail()).get();
	        assertEquals(testuser.getEmail(),"abc@gmail.com");
	}

}
