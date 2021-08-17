package com.deskera.timetracking.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.dto.TenantDto;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserEntityMapper;
import com.deskera.timetracking.dto.UserResponseDto;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.exception.BadRequestException;
import com.deskera.timetracking.exception.ResourceNotFoundException;
import com.deskera.timetracking.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	private static final UserEntityMapper USER_ENTITY_MAPPER = new UserEntityMapper();
	private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleService roleService;
	@Autowired
	private TenantService tenantService;
	
//	@Override
//	public Map<String,Object> getAllUsers() {
//		return USER_ENTITY_MAPPER.mapPageResponse(userRepository.findAllUsers());
//	}

	@Override
	public UserResponseDto getUserById(final long id) {
		Optional<User> optional = userRepository.findById(id);
		if (!optional.isPresent()) {
			throw new ResourceNotFoundException("No User found with id : " + id);
		}
		return USER_ENTITY_MAPPER.mapUserResponse(optional.get());
	}

	@Override
	@Transactional
	public UserResponseDto saveUser(final UserDto userDto,final String password) {
	
		Optional<User> optional=userRepository.findByEmail(userDto.getEmail());
		if(optional.isPresent())
			{
					throw new BadRequestException("user already exists");
			}	
		
		Tenant tenantToMap=tenantService.getTenantByName(userDto.getTenantName());
		Role userRole=roleService.getRoleById(userDto.getRoleId());
		
		User user = USER_ENTITY_MAPPER.mapUser(userDto,tenantToMap,userRole);
		user.setPassword(password);
		user.setDeleted(false);
		
		this.userRepository.save(user);
		
		return USER_ENTITY_MAPPER.mapUserResponse(user);
	}

	@Override
	public UserResponseDto getUserByEmail(final String email) {
		Optional<User> optional=userRepository.findByEmail(email);
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No User found with email : " + email);
		}
		return USER_ENTITY_MAPPER.mapUserResponse(optional.get());
	}
	
	@Override
	public Map<String,Object> getAllUsersByTenantName(final String tenantName,final Pageable pageable,String name,String email,String designation,String contactnumber,String gender,String joiningdate) {
		
		Tenant tenant=tenantService.getTenantByName(tenantName);
		Page<User> userPage;
		if(!gender.isEmpty() && !joiningdate.isEmpty())
		{
			if(!GENDER.isExist(gender))
				{
					throw new BadRequestException("invalid gender");
				}
			try {
				Date date=DATE_FORMAT.parse(joiningdate);
				userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,GENDER.valueOf(gender),date,pageable);
				
			} catch (Exception e) {
				throw new BadRequestException("Invalid joining date");
			}
			}
		else if(!gender.isEmpty()) {
			if(!GENDER.isExist(gender))
			{
				throw new BadRequestException("invalid gender");
			}
			userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,GENDER.valueOf(gender),pageable);
		}
		else if(!joiningdate.isEmpty())
		{
			try {
				Date date=DATE_FORMAT.parse(joiningdate);
				userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,date,pageable);
				
			} catch (Exception e) {
				throw new BadRequestException("Invalid joining date");
			}	
		}
		else
			userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,pageable);
		
		return USER_ENTITY_MAPPER.mapPageResponse(userPage);
					//return USER_ENTITY_MAPPER.mapUser(userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,pageable));
	}

	@Override
	public UserTenantDto isValidLogin(final String email,final String pass) {
		
			Optional<User> optional=userRepository.findByEmail(email);
			User user = null;
			if(optional.isPresent())
			{
				user=optional.get();
				if(pass.equals(user.getPassword()))
				{
					return USER_ENTITY_MAPPER.mapUserTenant(USER_ENTITY_MAPPER.mapUser(user),tenantService.getTenantDetailsByName(user.getTenantEntity().getTenantName()));
				}
				else {
					throw new BadRequestException("Invalid password");
				}
			}
			else {
				throw new ResourceNotFoundException("No user found with email : "+email);
			}
	}

	@Override
	public long getUserCountByTenant(String tenantName) {
		Tenant tenant=tenantService.getTenantByName(tenantName);
		return userRepository.countAllByTenantEntity(tenant);
	}

//	@Override
//	public void updateUser(final User admin) {
//		userRepository.save(admin);	
//	}

	@Override
	public boolean isPresent(final String email) {
		Optional<User> optional=userRepository.findByEmail(email);
		if(optional.isPresent())
		{
			return true;
		}
		return false;
	}	
	
	@Override
	@Transactional
	public UserResponseDto deleteUserByEmail(final String email) {

		Optional<User> optional=userRepository.findByEmail(email);
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No User found with email : " + email);
		}
		User user=optional.get();
		user.setDeleted(true);
		userRepository.save(user);
		return USER_ENTITY_MAPPER.mapUserResponse(user);	
	}
	
	@Override
	@Transactional
	public UserResponseDto editUser(final UserResponseDto userResponseDto) {
		
		Optional<User> optional=userRepository.findById(userResponseDto.getUserId());
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No User found with id : " + userResponseDto.getUserId());
		}
		User user=optional.get();
		if(userResponseDto.getUserDto().getRoleId()!=0)
		{
			user=USER_ENTITY_MAPPER.mapUsertoUser(user,userResponseDto.getUserDto(),roleService.getRoleById(userResponseDto.getUserDto().getRoleId()));
		}
		else {
			user=USER_ENTITY_MAPPER.mapUsertoUser(user,userResponseDto.getUserDto(),user.getRoleEntity());
		}
		if(userResponseDto.getUserDto().getEmail()!=null && !(userResponseDto.getUserDto().getEmail().isEmpty()))
		{
			Optional<User> optionalByEmail=userRepository.findByEmail(userResponseDto.getUserDto().getEmail());
		if(optionalByEmail.isPresent() && optionalByEmail.get().getUid()!=userResponseDto.getUserId())
			{
					throw new BadRequestException("email already exists");
			}	
		user.setEmail(userResponseDto.getUserDto().getEmail());
		}
		userRepository.save(user);
		return USER_ENTITY_MAPPER.mapUserResponse(user);	
	}
	
//	@Override
//	public boolean isPresent(final long id) {
//		Optional<User> optional=userRepository.findById(id);
//		if(optional.isPresent())
//		{
//			return true;
//		}
//		return false;
//	}

//	@Override
//	public boolean isAdmin(final String email) {
//		Optional<User> optional=userRepository.findByEmail(email);
//		if(optional.isPresent())
//		{
//			User u=optional.get();
//			if(u.getRoleEntity().getRid()==1)
//			{return true;}
//		}
//		return false;
//	}
//
//	@Override
//	public boolean isAdmin(final long id) {
//		Optional<User> optional=userRepository.findById(id);
//		if(optional.isPresent())
//		{
//			User u=optional.get();
//			if(u.getRoleEntity().getRid()==1)
//			{return true;}
//		}
//		return false;
//	}

}
