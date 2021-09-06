package com.deskera.timetracking.service;

import java.util.Optional;

import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.User;

public interface LogService {
	long createLoginLog(User user);
	void createLogoutLog(User user);
	Log getLogById(long logId);
}
