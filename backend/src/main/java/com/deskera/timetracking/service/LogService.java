package com.deskera.timetracking.service;

import com.deskera.timetracking.entity.User;

public interface LogService {
	void createLoginLog(User user,String deviceId);
	void createLogoutLog(User user,String deviceId);
}
