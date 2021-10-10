package com.deskera.timetracking.service;

import com.deskera.timetracking.entity.Role;

public interface RoleService {
	Role getRoleById(final long id);
	Role getRoleByName(final String name);
}
