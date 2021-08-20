package com.deskera.timetracking.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.deskera.timetracking.common.EVENT;

@Entity
@Table(name = "log")
public class Log {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "log_id")
	private long logId;
	
	@CreationTimestamp
	@Column(name = "log_date")
	private LocalDateTime logDate;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "type")
	private EVENT type;
	
	@ManyToOne
	@JoinColumn(name="user_id",referencedColumnName="user_id",nullable = false)
	private User userEntity;

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public LocalDateTime getLogDate() {
		return logDate;
	}

	public void setLogDate(LocalDateTime logDate) {
		this.logDate = logDate;
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
	
}
