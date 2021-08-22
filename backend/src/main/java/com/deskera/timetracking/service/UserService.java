package com.deskera.timetracking.service;

import java.util.Map;
import org.springframework.data.domain.Pageable;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserResponseDto;
import com.deskera.timetracking.dto.UserTenantDto;

public interface UserService {
	//Map<String, Object> getAllUsers();
	UserResponseDto getUserById(final long id);
	UserResponseDto saveUser(final UserDto userDto,final String password);
	UserResponseDto getUserByEmail(final String email);
	Map<String, Object> getAllUsersByTenantName(final String tenantName,final Pageable pageable,final String name,final String email,final String designation,final String contactnumber,final String gender,final String joiningdate);
	UserTenantDto isValidLogin(final String email,final String pass);
	long getUserCountByTenant(final String tenantName);
	boolean isPresent(final String email);
	UserResponseDto deleteUserByEmail(final String email);
	UserResponseDto editUser(final UserResponseDto userDto);
	Map<String, Object> getAllUsersGlobal(final String tenantName, final Pageable pageable, final String global);
	UserDto logout(final long userId);
//	boolean isPresent(final long id);
//	boolean isAdmin(final String email);
//	boolean isAdmin(final long id);
//	void updateUser(final User admin);

}
