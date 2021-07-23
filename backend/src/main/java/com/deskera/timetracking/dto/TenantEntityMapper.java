package com.deskera.timetracking.dto;

import java.util.ArrayList;
import java.util.List;

import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;

public class TenantEntityMapper {
	
	public TenantDto mapTenant(final Tenant tenant) {
		if(tenant==null)
		{
			return null;
		}
		TenantDto tenantDto=new TenantDto();
		tenantDto.setTenantName(tenant.getTenantName());
		tenantDto.setContact(tenant.getContact());
		tenantDto.setCountry(tenant.getCountry());
		tenantDto.setWebsiteUrl(tenant.getWebsiteUrl());
		return tenantDto;
	}
	
	public Tenant mapTenant(final TenantDto tenantDto)
	{
		if(tenantDto==null)
		{
			return null;
		}
		Tenant tenant=new Tenant();
		tenant.setTenantName(tenantDto.getTenantName());
		tenant.setContact(tenantDto.getContact());
		tenant.setCountry(tenantDto.getCountry());
		tenant.setWebsiteUrl(tenantDto.getWebsiteUrl());
		return tenant;
	}
	
	public List<TenantDto> mapTenant(List<Tenant> tenantList) {
		List<TenantDto> tenantDtoList=new ArrayList<TenantDto>();
		for(Tenant t:tenantList)
		{
			tenantDtoList.add(mapTenant(t));
		}
		return tenantDtoList;
	}

	public Tenant mapTenanttoTenant(final Tenant tenant,final TenantDto tenantDto)
	{
		if(!(tenantDto.getCountry()==null))
			tenant.setCountry(tenantDto.getCountry());
		
		if(!(tenantDto.getContact()==null))
			tenant.setContact(tenantDto.getContact());
		
		if(!(tenantDto.getWebsiteUrl()==null))
			tenant.setWebsiteUrl(tenantDto.getWebsiteUrl());
		
		return tenant;
	}
}
