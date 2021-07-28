package com.deskera.timetracking.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.exception.BadRequestException;

public class UserEntityMapper {
	private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	public UserDto mapUser(final User user) {
		if(user==null)
		{
			return null;
		}
		
		UserDto userDto=new UserDto();
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setEmail(user.getEmail());
		userDto.setContactNumber(user.getContactNumber());
		userDto.setDesignation(user.getDesignation());
		userDto.setGender((user.getGender()==null)?null:user.getGender().toString());
		
		userDto.setJoiningDate((user.getJoiningDate()==null)?null:DATE_FORMAT.format(user.getJoiningDate()));
		
		userDto.setRoleId(user.getRoleEntity().getRid());
		userDto.setTenantName(user.getTenantEntity().getTenantName());
		
		return userDto;
	}
	
	public User mapUser(final UserDto userDto,final Tenant tenantEntity,final Role roleEntity)
	{
		if(userDto==null)
		{
			return null;
		}
		if(tenantEntity==null || roleEntity==null)
		{
			throw new BadRequestException("tenant name and role name cannot be null");
		}
		User user=new User();
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setEmail(userDto.getEmail());
		user.setContactNumber(userDto.getContactNumber());
		user.setDesignation(userDto.getDesignation());
		
		if(!(userDto.getGender()==null) && !(userDto.getGender().isEmpty()))
			user.setGender(GENDER.valueOf(userDto.getGender()));

		if(!(userDto.getJoiningDate()==null) && !(userDto.getJoiningDate().isEmpty()))
		{		
			try {
				user.setJoiningDate(DATE_FORMAT.parse(userDto.getJoiningDate()));
			} catch (Exception e) {
				throw new BadRequestException("Invalid joining date");
			}
		}
	
		user.setRoleEntity(roleEntity);
		user.setTenantEntity(tenantEntity);
		
		return user;
	}
	
	public User mapUsertoUser(final User user,final UserDto userDto, Role roleEntity)
	{
		if(!(userDto.getFirstName()==null))
			user.setFirstName(userDto.getFirstName());
		
		if(!(userDto.getLastName()==null))
			user.setLastName(userDto.getLastName());

		if(!(userDto.getContactNumber()==null))
			user.setContactNumber(userDto.getContactNumber());

		if(!(userDto.getDesignation()==null))
			user.setDesignation(userDto.getDesignation());

		if(!(userDto.getGender()==null) && !(userDto.getGender().isEmpty()))
			user.setGender(GENDER.valueOf(userDto.getGender()));
		
		if(!(userDto.getJoiningDate()==null) && !(userDto.getJoiningDate().isEmpty()))
		{		
			try {
				user.setJoiningDate(DATE_FORMAT.parse(userDto.getJoiningDate()));
			} catch (ParseException e) {
				throw new BadRequestException("Invalid joining date");
			}
		}

		user.setRoleEntity(roleEntity);
		
		return user;
	}

	public List<UserDto> mapUser(List<User> userList) {
		List<UserDto> userDtoList=new ArrayList<UserDto>();
		for(User u:userList)
		{
			userDtoList.add(mapUser(u));
		}
		return userDtoList;
	}

	public UserTenantDto mapUserTenant(UserDto userDto, TenantDto tenantDto) {
		if(userDto==null || tenantDto==null)
		{
			throw new BadRequestException("user and tenant cannot be null");
		}
		UserTenantDto userTenantDto = new UserTenantDto();
		userTenantDto.setUserDto(userDto);
		userTenantDto.setTenantDto(tenantDto);
		return userTenantDto;
	}
	
}
