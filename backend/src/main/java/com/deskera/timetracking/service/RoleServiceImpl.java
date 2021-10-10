package com.deskera.timetracking.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.exception.ResourceNotFoundException;
import com.deskera.timetracking.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService{

	@Autowired
	RoleRepository roleRepository;
	
	@Override
	public Role getRoleById(final long id) {
		Optional<Role> optional=roleRepository.findById(id);
		Role role=null;
		if(optional.isPresent())
		{
			role=optional.get();
		}
		else {
			throw new ResourceNotFoundException("No Role found with id : " + id);
		}
		return role;
	}

	@Override
	public Role getRoleByName(final String roleName) {
		Optional<Role> optional=roleRepository.findByRoleName(roleName);
		Role role=null;
		if(optional.isPresent())
		{
			role=optional.get();
		}
		else {
			throw new ResourceNotFoundException("No Role found with name : " + roleName);
		}
		return role;
	}
	

}
