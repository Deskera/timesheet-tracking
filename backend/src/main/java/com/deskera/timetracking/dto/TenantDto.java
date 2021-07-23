package com.deskera.timetracking.dto;

public class TenantDto {
	private String tenantName;
	private String country;
	private String websiteUrl;
	private String contact;
	
	TenantDto(){}

	public TenantDto(String tenantName, String country, String websiteUrl, String contact) {
		this.tenantName = tenantName;
		this.country = country;
		this.websiteUrl = websiteUrl;
		this.contact = contact;
	}

	public String getTenantName() {
		return tenantName;
	}

	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getWebsiteUrl() {
		return websiteUrl;
	}

	public void setWebsiteUrl(String websiteUrl) {
		this.websiteUrl = websiteUrl;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}
	
}
