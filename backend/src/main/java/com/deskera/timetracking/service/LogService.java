package com.deskera.timetracking.service;

import java.time.LocalDateTime;
import java.util.Optional;

import com.deskera.timetracking.dto.ImageDto;
import com.deskera.timetracking.entity.Location;
import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.User;

public interface LogService {
	LocalDateTime createLoginLog(User user, Location location, ImageDto imageDto);
	LocalDateTime createLogoutLog(User user, Location location, ImageDto imageDto);
	Log getLogById(long logId);
}
