package com.deskera.timetracking.entity;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="workhours")
public class WorkHours {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "workhr_id")
	private long workHrId;
	
//	@JsonFormat(pattern="YYYY-MM-DD")
//	@Column(name = "date")
//	private LocalDateTime date;
//	
	@Column(name = "working_hours")
	private long workingHours;
	
	@ManyToOne
	@JoinColumn(name="user_id",referencedColumnName="user_id",nullable = false)
	private User userEntity;
	
	@OneToOne
	@JoinColumn(name="first_login",referencedColumnName="log_id")
	private Log firstLogin;
	
	@OneToOne
	@JoinColumn(name="last_logout",referencedColumnName="log_id")
	private Log lastLogout;
	
//	@JsonFormat(pattern = "hh:mm")
//	@Column(name = "lastlogout_time")
//	private LocalDateTime lastLogout;
//	
//	@JsonFormat(pattern = "hh:mm")
//	@Column(name = "firstlogin_time")
//	private LocalDateTime firstLogin;
	
	@ManyToOne
	@JoinColumn(name="created_by",referencedColumnName="user_id",nullable = false)
	private User createdBy;
	
	@ManyToOne
	@JoinColumn(name="updated_by",referencedColumnName="user_id",nullable = false)
	private User updatedBy;

//	@OneToOne
//	@JoinColumn(name="first_location",referencedColumnName="loc_id")
//	private Location firstLocation;
//	
//	@OneToOne
//	@JoinColumn(name="last_location",referencedColumnName="loc_id")
//	private Location lastLocation;
	
	@CreationTimestamp
	@Column(name = "created_date")
	private LocalDateTime createdDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date")
	private LocalDateTime updatedDate;
	
	@Column(name = "is_deleted")
	private boolean isDeleted;

//	public LocalDateTime getDate() {
//		return date;
//	}
//
//	public void setDate(LocalDateTime date) {
//		this.date = date;
//	}

//	public Location getFirstLocation() {
//		return firstLocation;
//	}
//
//	public void setFirstLocation(Location firstLocation) {
//		this.firstLocation = firstLocation;
//	}
//
//	public Location getLastLocation() {
//		return lastLocation;
//	}
//
//	public void setLastLocation(Location lastLocation) {
//		this.lastLocation = lastLocation;
//	}

	public long getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(long workingHours) {
		this.workingHours = workingHours;
	}

	public User getUserEntity() {
		return userEntity;
	}

	public void setUserEntity(User userEntity) {
		this.userEntity = userEntity;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public User getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(User updatedBy) {
		this.updatedBy = updatedBy;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDateTime getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDateTime updatedDate) {
		this.updatedDate = updatedDate;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public long getWorkHrId() {
		return workHrId;
	}

	public void setWorkHrId(long workHrId) {
		this.workHrId = workHrId;
	}

	public Log getFirstLogin() {
		return firstLogin;
	}

	public void setFirstLogin(Log firstLogin) {
		this.firstLogin = firstLogin;
	}

	public Log getLastLogout() {
		return lastLogout;
	}

	public void setLastLogout(Log lastLogout) {
		this.lastLogout = lastLogout;
	}

//	public LocalDateTime getLastLogout() {
//		return lastLogout;
//	}
//
//	public void setLastLogout(LocalDateTime lastLogout) {
//		this.lastLogout = lastLogout;
//	}
//
//	public LocalDateTime getFirstLogin() {
//		return firstLogin;
//	}
//
//	public void setFirstLogin(LocalDateTime firstLogin) {
//		this.firstLogin = firstLogin;
//	}
	
	
}
