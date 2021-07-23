package com.deskera.timetracking;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.deskera.timetracking.controller.TenantController;
import com.deskera.timetracking.controller.UserController;

@SpringBootTest
class TimeTrackingApplicationTests {

	@Autowired
	UserController userController;
	
	@Autowired
	TenantController tenantController;
	
	@Test
	void contextLoads() {
		assertThat(userController).isNotNull();
		assertThat(tenantController).isNotNull();
	}

}
