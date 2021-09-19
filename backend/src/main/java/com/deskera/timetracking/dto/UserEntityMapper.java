package com.deskera.timetracking.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;

import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.entity.WorkHours;
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
			if(GENDER.isExist(userDto.getGender()))
				user.setGender(GENDER.valueOf(userDto.getGender()));
			else
				throw new BadRequestException("Invalid gender");

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
			if(GENDER.isExist(userDto.getGender()))
				user.setGender(GENDER.valueOf(userDto.getGender()));
			else
				throw new BadRequestException("Invalid gender");
		
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
	
	public List<UserResponseDto> mapUser(List<User> userList) {
		List<UserResponseDto> userResponseDtoList=new ArrayList<UserResponseDto>();
		for(User u:userList)
		{
			userResponseDtoList.add(mapUserResponse(u));
		}
		return userResponseDtoList;
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
	
	public UserTenantDto mapUserTenant(UserResponseDto userResponseDto, TenantDto tenantDto) {
		if(userResponseDto==null || tenantDto==null)
		{
			throw new BadRequestException("user and tenant cannot be null");
		}
		UserTenantDto userTenantDto = new UserTenantDto();
		userTenantDto.setUserDto(userResponseDto.getUserDto());
		userTenantDto.setTenantDto(tenantDto);
		return userTenantDto;
	}
	
	public UserResponseDto mapUserResponse(final User user) {
		return new UserResponseDto(user.getUid(),mapUser(user));
	}
	
	public Map<String,Object> mapPageResponse(Page<User> userPage){
		Map<String,Object> response=new HashMap<String,Object>();
		response.put("currentPage", userPage.getNumber());
		response.put("totalItems", userPage.getTotalElements());
		response.put("totalPages", userPage.getTotalPages());
		response.put("users", mapUser(userPage.getContent()));
		return response;
	}
	
	public List<WorkHoursResponseDto> mapWorkHours(List<WorkHours> workHours) {
		List<WorkHoursResponseDto> workHoursResponseDto=new ArrayList<WorkHoursResponseDto>();
		for(WorkHours w:workHours)
		{
			if(w.getLastLogout() !=null)
			     workHoursResponseDto.add(new WorkHoursResponseDto(w.getFirstLogin().getPunchAt(),w.getLastLogout().getPunchAt(),w.getWorkingHours(),
					new LocationDto(w.getFirstLogin().getLocation().getLatitude(),w.getFirstLogin().getLocation().getLongitude()),
					new LocationDto(w.getLastLogout().getLocation().getLatitude(),w.getLastLogout().getLocation().getLongitude())));
			else
				workHoursResponseDto.add(new WorkHoursResponseDto(w.getFirstLogin().getPunchAt(),null,w.getWorkingHours(),
						new LocationDto(w.getFirstLogin().getLocation().getLatitude(),w.getFirstLogin().getLocation().getLongitude()),null));
				
		}
		return workHoursResponseDto;
	}
	
}
