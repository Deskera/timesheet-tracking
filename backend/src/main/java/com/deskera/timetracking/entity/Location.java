package com.deskera.timetracking.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "location")
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loc_id")
	private long locId;
	
	@Column(name="longitude")
	private double longitude;
	
	@Column(name="latitude")
	private double latitude;
	
	@CreationTimestamp
	@Column(name = "created_date")
	private LocalDateTime createdDate;
	
	@ManyToOne
	@JoinColumn(name="user_id",referencedColumnName="user_id",nullable = false)
	private User userEntity;

	public long getLocId() {
		return locId;
	}

	public void setLocId(long locId) {
		this.locId = locId;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public User getUserEntity() {
		return userEntity;
	}

	public void setUserEntity(User userEntity) {
		this.userEntity = userEntity;
	}
	
}
