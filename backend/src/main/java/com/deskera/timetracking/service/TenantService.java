package com.deskera.timetracking.service;

import java.util.List;
import com.deskera.timetracking.dto.TenantDto;
import com.deskera.timetracking.dto.UserTenantDto;
import com.deskera.timetracking.entity.Tenant;

public interface TenantService {
	List<TenantDto> getAllTenants();
	TenantDto getTenantById(final long id);
	TenantDto getTenantDetailsByName(final String name);
	TenantDto saveTenant(final TenantDto tenantDto);
	Tenant getTenantByName(final String name);
	TenantDto deleteTenantByName(String tenantName);
	UserTenantDto initialSetup(final UserTenantDto userTenantDto,final String password);
	TenantDto editTenant(TenantDto tenantDto);

}
