package com.deskera.timetracking.service;

import java.util.List;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserTenantDto;

public interface UserService {
	List<UserDto> getAllUsers();
	UserDto getUserById(final long id);
	UserDto saveUser(final UserDto userDto,final String password);
	void deleteUserById(final long id);
	UserDto getUserByEmail(final String email);
	List<UserDto> getAllUsersByTenantName(final String tenantName);
	UserTenantDto isValidLogin(final String email,final String pass);
	long getUserCountByTenant(final String tenantName);
	boolean isPresent(final String email);
	UserDto deleteUserByEmail(final String email);
	UserDto editUser(UserDto userDto);
	
//	boolean isPresent(final long id);
//	boolean isAdmin(final String email);
//	boolean isAdmin(final long id);
//	void updateUser(final User admin);

}
