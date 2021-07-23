package com.deskera.timetracking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deskera.timetracking.dto.TenantDto;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserEntityMapper;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.exception.BadRequestException;
import com.deskera.timetracking.exception.ResourceNotFoundException;
import com.deskera.timetracking.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	private static final UserEntityMapper USER_ENTITY_MAPPER = new UserEntityMapper();
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleService roleService;
	@Autowired
	private TenantService tenantService;
	
	@Override
	public List<UserDto> getAllUsers() {
		return USER_ENTITY_MAPPER.mapUser(userRepository.findAllUsers());
	}

	@Override
	public UserDto getUserById(final long id) {
		Optional<User> optional = userRepository.findById(id);
		User user = null;
		if (optional.isPresent()) {
			user = optional.get();
		} else {
			throw new ResourceNotFoundException("No User found with id : " + id);
		}
		return USER_ENTITY_MAPPER.mapUser(user);
	}

	@Override
	@Transactional
	public UserDto saveUser(final UserDto userDto,final String password) {
	
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
		
		return USER_ENTITY_MAPPER.mapUser(user);
	}

	@Override
	public void deleteUserById(final long id) {
		//this.userRepository.deleteById(id);		
	}
	

	@Override
	public UserDto getUserByEmail(final String email) {
		Optional<User> optional=userRepository.findByEmail(email);
		User user=null;
		if(optional.isPresent())
		{
			user=optional.get();
		}
		else {
			throw new ResourceNotFoundException("No User found with email : " + email);
		}
		return USER_ENTITY_MAPPER.mapUser(user);
	}
	
	@Override
	public List<UserDto> getAllUsersByTenantName(final String tenantName) {
		
		Tenant tenant=tenantService.getTenantByName(tenantName);		
		return USER_ENTITY_MAPPER.mapUser(userRepository.findAllByTenantId(tenant));
	}

	@Override
	public UserDto isValidLogin(final String email,final String pass) {
		
			Optional<User> optional=userRepository.findByEmail(email);
			User user = null;
			if(optional.isPresent())
			{
				user=optional.get();
				if(pass.equals(user.getPassword()))
				{
					return USER_ENTITY_MAPPER.mapUser(userRepository.findByEmail(email).get());
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
	public UserDto deleteUserByEmail(final String email) {

		Optional<User> optional=userRepository.findByEmail(email);
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No User found with email : " + email);
		}
		User user=optional.get();
		user.setDeleted(true);
		userRepository.save(user);
		return USER_ENTITY_MAPPER.mapUser(user);	
	}
	
	@Override
	@Transactional
	public UserDto editUser(final UserDto userDto) {

		Optional<User> optional=userRepository.findByEmail(userDto.getEmail());
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No User found with email : " + userDto.getEmail());
		}
		User user=optional.get();
		if(userDto.getRoleId()!=0)
		{
			user=USER_ENTITY_MAPPER.mapUsertoUser(user,userDto,roleService.getRoleById(userDto.getRoleId()));
		}
		else {
			user=USER_ENTITY_MAPPER.mapUsertoUser(user,userDto,user.getRoleEntity());
		}
		userRepository.save(user);
		return USER_ENTITY_MAPPER.mapUser(user);	
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
