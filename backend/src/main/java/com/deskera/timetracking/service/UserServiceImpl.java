package com.deskera.timetracking.service;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.dto.ImageDto;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserEntityMapper;
import com.deskera.timetracking.dto.UserResponseDto;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.entity.Location;
import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.LoginImage;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.entity.WorkHours;
import com.deskera.timetracking.exception.BadRequestException;
import com.deskera.timetracking.exception.ResourceNotFoundException;
import com.deskera.timetracking.repository.LocationRepository;
import com.deskera.timetracking.repository.LoginImageRepository;
import com.deskera.timetracking.repository.UserRepository;
import com.deskera.timetracking.repository.WorkHoursRepository;

@Service
public class UserServiceImpl implements UserService{

	private static final UserEntityMapper USER_ENTITY_MAPPER = new UserEntityMapper();
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleService roleService;
	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private LogService logService;
	
	@Autowired
	private LoginImageRepository loginImageRepository;
	
	@Autowired
	private LocationRepository locationRepository;
	
	@Autowired
	private WorkHoursRepository workHoursRepository;
	
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
		if(!gender.isEmpty())
		{
			if(!GENDER.isExist(gender))
				{
					throw new BadRequestException("invalid gender");
				}
			if(!joiningdate.isEmpty()) userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,GENDER.valueOf(gender),joiningdate,pageable);
			else userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,GENDER.valueOf(gender),pageable);
		}
		else if(!joiningdate.isEmpty())
			userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,joiningdate,pageable);
		else userPage=userRepository.findAllByTenant(tenant,name,email,designation,contactnumber,pageable);
		
		return USER_ENTITY_MAPPER.mapPageResponse(userPage);
	}

	@Override
	public Map<String, Object> getAllUsersGlobal(final String tenantName,final Pageable pageable,final String global) {
		Tenant tenant=tenantService.getTenantByName(tenantName);
		return USER_ENTITY_MAPPER.mapPageResponse(userRepository.findAllByTenant(tenant,global,pageable));
	}
	
	@Override
	public Map<String,Object> isValidLogin(final String email,final String pass) {
		
			Optional<User> optional=userRepository.findByEmail(email);
			User user = null;
			if(optional.isPresent())
			{
				user=optional.get();
				if(pass.equals(user.getPassword()))
				{	
					long logId=logService.createLoginLog(user);
					Map<String,Object> response=new HashMap<String,Object>();
					response.put("logId", logId);
					response.put("userId",user.getUid());
					response.put("user",USER_ENTITY_MAPPER.mapUserTenant(USER_ENTITY_MAPPER.mapUser(user),tenantService.getTenantDetailsByName(user.getTenantEntity().getTenantName())));
					return response;
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

	@Override
	@Transactional
	public UserDto logout(final long userId) {
		Optional<User> optional=userRepository.findById(userId);
		if(!optional.isPresent())
			throw new ResourceNotFoundException("No user found with id "+userId);	
		logService.createLogoutLog(optional.get());
		return USER_ENTITY_MAPPER.mapUser(optional.get());
	}

	@Override
	@Transactional
	public void saveImage(long logId, ImageDto imageDto) {
	
		if(!imageDto.getImg().isEmpty())
		{
		Log log=logService.getLogById(logId);
		byte[] decodedString = Base64.getDecoder().decode(imageDto.getImg());

		LoginImage loginImage=new LoginImage();
		loginImage.setImage(decodedString);
		loginImage.setLog(log);
		loginImageRepository.save(loginImage);
		
		//String s=new String(Base64.getEncoder().encode(loginImageRepository.findById(loginImage.getImgId()).get().getImage()));
		//String binaryStr = new BigInteger(1, decodedString).toString(2);
		//System.out.println(s);
		//System.out.println(binaryStr);
		
		}
		else
			throw new BadRequestException("empty image");
		}

	@Override
	@Transactional
	public void saveLocation(long userId, double latitude, double longitude) {
		Optional<User> optional=userRepository.findById(userId);
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No User found with id : " + userId);
		}
		Location location=new Location();
		location.setLatitude(latitude);
		location.setLongitude(longitude);
		location.setUserEntity(optional.get());
		locationRepository.save(location);
	}

	@Override
	public Map<String, Object> workingTimeHistory(long userId,Pageable pageable) {
		Optional<User> optional=userRepository.findById(userId);
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No User found with id : " + userId);
		}
		Map<String,Object> response=new HashMap<String,Object>();
		Page<WorkHours> workHoursPage=workHoursRepository.findAllByUserEntityAndIsDeletedFalseOrderByFirstLoginDesc(optional.get(),pageable);
		response.put("currentPage", workHoursPage.getNumber());
		response.put("totalItems", workHoursPage.getTotalElements());
		response.put("totalPages", workHoursPage.getTotalPages());
		response.put("worktimehistory", USER_ENTITY_MAPPER.mapWorkHours(workHoursPage.getContent()));
		return response;
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
