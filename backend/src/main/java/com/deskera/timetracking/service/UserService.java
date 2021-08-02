package com.deskera.timetracking.service;

import java.util.List;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserResponseDto;
import com.deskera.timetracking.dto.UserTenantDto;

public interface UserService {
	List<UserResponseDto> getAllUsers();
	UserResponseDto getUserById(final long id);
	UserResponseDto saveUser(final UserDto userDto,final String password);
	UserResponseDto getUserByEmail(final String email);
	List<UserResponseDto> getAllUsersByTenantName(final String tenantName);
	UserTenantDto isValidLogin(final String email,final String pass);
	long getUserCountByTenant(final String tenantName);
	boolean isPresent(final String email);
	UserResponseDto deleteUserByEmail(final String email);
	UserResponseDto editUser(final UserDto userDto);
	
//	boolean isPresent(final long id);
//	boolean isAdmin(final String email);
//	boolean isAdmin(final long id);
//	void updateUser(final User admin);

}
