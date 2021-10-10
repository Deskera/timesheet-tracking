package com.deskera.timetracking.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.deskera.timetracking.common.COUNTRY;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "tenant",uniqueConstraints=@UniqueConstraint(columnNames={"tenant_name", "contact"}))
public class Tenant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tenant_id")
	private long tid;
	
	@Column(name = "tenant_name",nullable = false)
	private String tenantName;
	
	@Column(name = "country")
	private COUNTRY country;
	
	@Column(name = "website_url")
	private String websiteUrl;
	
	@Column(name = "contact")
	private String contact;
	
	//@CreatedDate
	@CreationTimestamp
	@Column(name = "created_date")
	private LocalDateTime createdDate;
	
	//@LastModifiedDate
	@UpdateTimestamp
	@Column(name = "updated_date")
	private LocalDateTime updatedDate;
	
	@Column(name = "is_deleted")
	private boolean isDeleted;

	public long getTid() {
		return tid;
	}

	public void setTid(long tid) {
		this.tid = tid;
	}

	public String getTenantName() {
		return tenantName;
	}

	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}

	public COUNTRY getCountry() {
		return country;
	}

	public void setCountry(COUNTRY country) {
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

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime now) {
		this.createdDate = now;
	}

	public LocalDateTime getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDateTime now) {
		this.updatedDate = now;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Tenant() {}
	
	public Tenant(String tenantName, COUNTRY country, String websiteUrl, String contact) {
		this.tenantName = tenantName;
		this.country = country;
		this.websiteUrl = websiteUrl;
		this.contact = contact;
	}

}
