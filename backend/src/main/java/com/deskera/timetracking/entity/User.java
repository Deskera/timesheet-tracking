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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.deskera.timetracking.common.GENDER;

//import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

//@Data
@Entity
@Table(name = "usert")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private long uid;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email", nullable = false)
	private String email;
	
	@OneToOne
	@JoinColumn(name="tenant_id",referencedColumnName="tenant_id",nullable = false)
	private Tenant tenantEntity;
	
	@OneToOne
	@JoinColumn(name="role_id",referencedColumnName="role_id", nullable = false)
	private Role roleEntity;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "designation")
	private String designation;
	
	@Column(name = "contact_number")
	private String contactNumber;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "gender")
	private GENDER gender;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "joining_date")
	private Date joiningDate;
	
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

	public GENDER getGender() {
		return gender;
	}

	public void setGender(GENDER gender) {
		this.gender = gender;
	}

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
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
	
	public User() {}
	
	public User(String firstName, String lastName, String email, Tenant tenantEntity, Role roleEntity, String password,
			String designation, String contactNumber, GENDER gender, Date joiningDate) {

		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.tenantEntity = tenantEntity;
		this.roleEntity = roleEntity;
		this.password = password;
		this.designation = designation;
		this.contactNumber = contactNumber;
		this.gender = gender;
		this.joiningDate = joiningDate;
	}
}
