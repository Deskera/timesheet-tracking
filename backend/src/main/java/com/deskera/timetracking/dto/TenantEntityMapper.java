package com.deskera.timetracking.dto;

import java.util.ArrayList;
import java.util.List;

import com.deskera.timetracking.common.COUNTRY;
import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.entity.Role;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.exception.BadRequestException;

public class TenantEntityMapper {
	
	public TenantDto mapTenant(final Tenant tenant) {
		if(tenant==null)
		{
			return null;
		}
		TenantDto tenantDto=new TenantDto();
		tenantDto.setTenantName(tenant.getTenantName());
		tenantDto.setContact(tenant.getContact());
		tenantDto.setCountry(tenant.getCountry()==null?null:tenant.getCountry().toString());
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
		
		if(!(tenantDto.getCountry()==null) && !(tenantDto.getCountry().isEmpty()))
			if(COUNTRY.isExist(tenantDto.getCountry()))
				tenant.setCountry(COUNTRY.valueOf(tenantDto.getCountry()));
			else
				throw new BadRequestException("Invalid country");
			
		
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
		if(!(tenantDto.getCountry()==null) && !(tenantDto.getCountry().isEmpty()))
			if(COUNTRY.isExist(tenantDto.getCountry()))
				tenant.setCountry(COUNTRY.valueOf(tenantDto.getCountry()));
			else
				throw new BadRequestException("Invalid country");
		
		if(!(tenantDto.getContact()==null))
			tenant.setContact(tenantDto.getContact());
		
		if(!(tenantDto.getWebsiteUrl()==null))
			tenant.setWebsiteUrl(tenantDto.getWebsiteUrl());
		
		return tenant;
	}
}
