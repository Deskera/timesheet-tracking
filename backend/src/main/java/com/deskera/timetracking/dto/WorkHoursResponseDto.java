package com.deskera.timetracking.dto;

import java.time.LocalDateTime;

public class WorkHoursResponseDto {
	private LocalDateTime firstLogin;
	private LocalDateTime lastLogout;
	private long workHours;
	
	public LocalDateTime getFirstLogin() {
		return firstLogin;
	}
	public void setFirstLogin(LocalDateTime firstLogin) {
		this.firstLogin = firstLogin;
	}
	public LocalDateTime getLastLogout() {
		return lastLogout;
	}
	public void setLastLogout(LocalDateTime lastLogout) {
		this.lastLogout = lastLogout;
	}
	public long getWorkHours() {
		return workHours;
	}
	public void setWorkHours(long workHours) {
		this.workHours = workHours;
	}
	
	public WorkHoursResponseDto(){}
	
	public WorkHoursResponseDto(LocalDateTime firstLogin, LocalDateTime lastLogout, long workHours) {
		this.firstLogin = firstLogin;
		this.lastLogout = lastLogout;
		this.workHours = workHours;
	}
	
}
