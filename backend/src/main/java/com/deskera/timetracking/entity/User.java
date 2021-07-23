package com.deskera.timetracking.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.deskera.timetracking.common.Gender;

//import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

//@Data
@Entity
@Table(name = "usert")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "uid")
	private long uid;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email", nullable = false)
	private String email;
	
	@OneToOne
	@JoinColumn(name="tenant_id",referencedColumnName="tid",nullable = false)
	private Tenant tenantEntity;
	
	@OneToOne
	@JoinColumn(name="role_id",referencedColumnName="rid", nullable = false)
	private Role roleEntity;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "designation")
	private String designation;
	
	@Column(name = "contact_number")
	private String contactNumber;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "gender")
	private Gender gender;
	
	@Column(name = "joining_date")
	private Date joiningDate;
	
	//@CreatedDate
	@CreationTimestamp
	@Column(name = "created_date")
	private Date createdDate;
	
	//@LastModifiedDate
	@UpdateTimestamp
	@Column(name = "updated_date")
	private LocalDateTime updatedDate;
	
	@Column(name = "is_deleted")
	private boolean isDeleted;

	public long getUid() {
		return uid;
	}

	public void setUid(long uid) {
		this.uid = uid;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Tenant getTenantEntity() {
		return tenantEntity;
	}

	public void setTenantEntity(Tenant tenantEntity) {
		this.tenantEntity = tenantEntity;
	}

	public Role getRoleEntity() {
		return roleEntity;
	}

	public void setRoleEntity(Role roleEntity) {
		this.roleEntity = roleEntity;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date now) {
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
	
	
}
