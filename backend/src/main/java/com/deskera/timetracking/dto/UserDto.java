package com.deskera.timetracking.dto;

import java.util.Date;

import com.deskera.timetracking.common.Gender;
import com.sun.istack.NotNull;

public class UserDto {
	private String firstName;
	private String lastName;
	@NotNull
	private String email;
	private String designation;
	private String contactNumber;
	private Gender gender;
	private Date joiningDate;
	private long roleId;
	private String tenantName;
	
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
	public long getRoleId() {
		return roleId;
	}
	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}
	public String getTenantName() {
		return tenantName;
	}
	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}
	public UserDto() {}
	
	public UserDto(String firstName, String lastName, String email, String designation,
			String contactNumber, Gender gender, Date joiningDate, long roleId, String tenantName) {

		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.designation = designation;
		this.contactNumber = contactNumber;
		this.gender = gender;
		this.joiningDate = joiningDate;
		this.roleId = roleId;
		this.tenantName = tenantName;
	}
	
}
