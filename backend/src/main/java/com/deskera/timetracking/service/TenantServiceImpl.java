package com.deskera.timetracking.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deskera.timetracking.dto.TenantDto;
import com.deskera.timetracking.dto.TenantEntityMapper;
import com.deskera.timetracking.dto.UserDto;
import com.deskera.timetracking.dto.UserEntityMapper;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.exception.BadRequestException;
import com.deskera.timetracking.exception.ResourceNotFoundException;
import com.deskera.timetracking.repository.TenantRepository;

@Service
public class TenantServiceImpl implements TenantService{

	private static final TenantEntityMapper TENANT_ENTITY_MAPPER = new TenantEntityMapper();
	private static final UserEntityMapper USER_ENTITY_MAPPER = new UserEntityMapper();
	
	@Autowired
	private TenantRepository tenantRepository;
	@Autowired
	private UserService userService;

	@Override
	public List<TenantDto> getAllTenants() {
		return TENANT_ENTITY_MAPPER.mapTenant(tenantRepository.findAllTenants());
	}

	@Override
	public TenantDto getTenantById(final long id) {
		Optional<Tenant> optional=tenantRepository.findById(id);
		Tenant tenant=null;
		if(optional.isPresent())
		{
			tenant=optional.get();
		}
		else {
			throw new ResourceNotFoundException("No Tenant found with id : " + id);
		}
		return TENANT_ENTITY_MAPPER.mapTenant(tenant);
	}

	@Override
	@Transactional
	public TenantDto saveTenant(final TenantDto tenantDto) {
			
		Optional<Tenant> optional=tenantRepository.findByTenantName(tenantDto.getTenantName());
		if(optional.isPresent())
			{
					throw new BadRequestException("tenant already exists");
			}

		Tenant tenant=TENANT_ENTITY_MAPPER.mapTenant(tenantDto);
		tenant.setDeleted(false);
		tenantRepository.save(tenant);
		return TENANT_ENTITY_MAPPER.mapTenant(tenant);
	}

	@Override
	@Transactional
	public TenantDto deleteTenantByName(final String tenantName) {
		//tenantRepository.deleteById(id);
		Optional<Tenant> optional=tenantRepository.findByTenantName(tenantName);
		Tenant tenant=null;
		if(optional.isPresent())
		{
			tenant=optional.get();
			if(userService.getUserCountByTenant(tenantName)>0)
			{
				throw new BadRequestException("cannot delete tenant with 1 or more users");
			}
			tenant.setDeleted(true);
			tenantRepository.save(tenant);
			return TENANT_ENTITY_MAPPER.mapTenant(tenant);
		}
		else {
			throw new ResourceNotFoundException("No Tenant found with name : " + tenantName);
		}
		
	}
	
	@Override
	public TenantDto getTenantDetailsByName(final String tenantName){
		Optional<Tenant> optional=tenantRepository.findByTenantName(tenantName);
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No Tenant found with name : " + tenantName);
		}		
		return TENANT_ENTITY_MAPPER.mapTenant(optional.get());
	}
	
//used in userService only	
	@Override
	public Tenant getTenantByName(final String tenantName) {
		Optional<Tenant> optional=tenantRepository.findByTenantName(tenantName);
		
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No Tenant found with name : " + tenantName);
		}
		return optional.get();
	}

	@Override
	@Transactional
	public UserTenantDto initialSetup(final UserTenantDto userTenantDto,final String password) {
		
		UserDto userDto=userTenantDto.getUserDto();
		TenantDto tenantDto=userTenantDto.getTenantDto();
		
		if(!userService.isPresent(userDto.getEmail()))
		{
			if(saveTenant(tenantDto)!=null)
			{
				userDto.setTenantName(tenantDto.getTenantName());
				userDto.setRoleId(1);	//1 for admin
				return USER_ENTITY_MAPPER.mapUserTenant(userService.saveUser(userDto, password),tenantDto);
			}
		}
		throw new BadRequestException("User already exists with email : " + userDto.getEmail());
	}

	@Override
	@Transactional
	public TenantDto editTenant(final TenantDto tenantDto) {
		Optional<Tenant> optional=tenantRepository.findByTenantName(tenantDto.getTenantName());
		if(!optional.isPresent())
		{
			throw new ResourceNotFoundException("No Tenant found with name : " + tenantDto.getTenantName());
		}
		Tenant tenant=optional.get();
		tenant=TENANT_ENTITY_MAPPER.mapTenanttoTenant(tenant,tenantDto);
		tenantRepository.save(tenant);
		return TENANT_ENTITY_MAPPER.mapTenant(tenant);
		
	}

}
