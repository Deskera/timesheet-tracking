package com.deskera.timetracking.dto;

public class UserTenantDto {
	private UserDto userDto;
	private TenantDto tenantDto;
	
	public UserDto getUserDto() {
		return userDto;
	}
	public void setUserDto(UserDto userDto) {
		this.userDto = userDto;
	}
	public TenantDto getTenantDto() {
		return tenantDto;
	}
	public void setTenantDto(TenantDto tenantDto) {
		this.tenantDto = tenantDto;
	}
	
	public UserTenantDto() {}
	
	public UserTenantDto(final UserDto userDto,final TenantDto tenantDto) {
		this.userDto = userDto;
		this.tenantDto = tenantDto;
	}
	
}
