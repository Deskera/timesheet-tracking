package com.deskera.timetracking.dto;

import com.sun.istack.NotNull;

public class UserDto {
	private String firstName;
	private String lastName;
	@NotNull
	private String email;
	private String designation;
	private String contactNumber;
	private String gender;
	private String joiningDate;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getJoiningDate() {
		return joiningDate;
	}
	public void setJoiningDate(String joiningDate) {
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
			String contactNumber, String gender, String joiningDate, long roleId, String tenantName) {

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
