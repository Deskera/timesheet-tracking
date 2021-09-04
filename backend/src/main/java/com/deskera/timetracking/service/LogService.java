package com.deskera.timetracking.service;

import com.deskera.timetracking.entity.User;

public interface LogService {
	void createLoginLog(User user);
	void createLogoutLog(User user);
}
