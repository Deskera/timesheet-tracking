package com.deskera.timetracking.entity;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.deskera.timetracking.common.EVENT;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "log")
public class Log {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "log_id")
	private long logId;
	
	@CreationTimestamp
	@Column(name = "punch_at")
	private LocalDateTime punchAt;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "type")
	private EVENT type;
	
	@Column(name="device_id")
	private String deviceId;
//	@Lob
//    @Column(name="image", columnDefinition="BYTEA")
//    private byte[] image;

	@ManyToOne
	@JoinColumn(name="user_id",referencedColumnName="user_id",nullable = false)
	private User userEntity;

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public EVENT getType() {
		return type;
	}

	public void setType(EVENT type) {
		this.type = type;
	}

	public User getUserEntity() {
		return userEntity;
	}

	public void setUserEntity(User userEntity) {
		this.userEntity = userEntity;
	}

	public LocalDateTime getPunchAt() {
		return punchAt;
	}

	public void setPunchAt(LocalDateTime punchAt) {
		this.punchAt = punchAt;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	
	
//	public byte[] getImage() {
//		return image;
//	}
//
//	public void setImage(byte[] image) {
//		this.image = image;
//	}

}
