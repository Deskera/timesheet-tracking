package com.deskera.timetracking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deskera.timetracking.common.EVENT;
import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.repository.LogRepository;
@Service
public class LogServiceImpl implements LogService{
	@Autowired
	LogRepository logRepository;

	@Override
	public long createLoginLog(User user) {
		Log log=new Log();
		log.setUserEntity(user);
		log.setType(EVENT.LOGIN);
		logRepository.save(log);
		return log.getLogId();
	}
	
	
}
