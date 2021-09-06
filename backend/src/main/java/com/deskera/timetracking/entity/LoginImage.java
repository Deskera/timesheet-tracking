package com.deskera.timetracking.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "loginimage")
public class LoginImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "img_id")
	private long imgId;
	
	@OneToOne
	@JoinColumn(name="log_id",referencedColumnName="log_id",nullable = false)
	private Log log;
	
	//@Lob
	@Type(type="org.hibernate.type.BinaryType")
	@Column(name="image", columnDefinition="BYTEA")
    private byte[] image;
	
	public long getImgId() {
		return imgId;
	}

	public void setImgId(long imgId) {
		this.imgId = imgId;
	}

	public Log getLog() {
		return log;
	}

	public void setLog(Log log) {
		this.log = log;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
	
	
}
