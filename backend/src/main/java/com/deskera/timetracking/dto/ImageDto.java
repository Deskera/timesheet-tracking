package com.deskera.timetracking.dto;

public class ImageDto {
	private String img;
	private long logId;
	
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public long getLogId() {
		return logId;
	}
	public void setLogId(long logId) {
		this.logId = logId;
	}
	public ImageDto() {}
	public ImageDto(String img, long logId) {
		this.img = img;
		this.logId = logId;
	}
	
}
