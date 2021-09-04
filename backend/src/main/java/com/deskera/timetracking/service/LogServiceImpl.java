package com.deskera.timetracking.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deskera.timetracking.common.EVENT;
import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.entity.WorkHours;
import com.deskera.timetracking.exception.BadRequestException;
import com.deskera.timetracking.repository.LogRepository;
import com.deskera.timetracking.repository.WorkHoursRepository;

@Service
public class LogServiceImpl implements LogService{
	@Autowired
	LogRepository logRepository;
	@Autowired
	WorkHoursRepository workHoursRepository;

	@Override
	public void createLoginLog(User user) {
		Log log=new Log();
		log.setUserEntity(user);
		log.setType(EVENT.LOGIN);
		//log.setDeviceId(deviceId);
		
		Optional<LocalDateTime> optional1=logRepository.findLastLoginLogoutLog(user,EVENT.LOGIN);
		Optional<LocalDateTime> optional2=logRepository.findLastLoginLogoutLog(user,EVENT.LOGOUT);
		if(optional1.isPresent() && optional2.isPresent())
		{
			if(optional1.get().compareTo(optional2.get()) >= 0) {
				throw new BadRequestException("Already logged in");
			}
		}
		else if(optional1.isPresent() && !optional2.isPresent())
			throw new BadRequestException("Already logged in");
		
		logRepository.save(log);
	}
	
	@Override
	public void createLogoutLog(User user) {
		Log log=new Log();
		log.setUserEntity(user);
		log.setType(EVENT.LOGOUT);
		//log.setDeviceId(deviceId);
		
		Optional<LocalDateTime> optional1=logRepository.findLastLoginLogoutLog(user, EVENT.LOGIN);
		Optional<LocalDateTime> optional2=logRepository.findLastLoginLogoutLog(user, EVENT.LOGOUT);

		if(optional1.isPresent())
		{	
			LocalDateTime lastLoginEntry = optional1.get();		//for current date
			if(optional2.isPresent()) {
				LocalDateTime lastLogoutEntry = optional2.get();
				if(lastLoginEntry.compareTo(lastLogoutEntry) <= 0) {
					throw new BadRequestException("Already logged out");
				}	
			}
			logRepository.save(log);
			Duration dur = Duration.between(lastLoginEntry, log.getPunchAt());
			long minutes = dur.toMinutes();
			Optional<WorkHours> optional3 = workHoursRepository.findByUserEntityAndDate(user);
			WorkHours whr=null;
			if(optional3.isPresent())
			{
				whr=optional3.get();
				minutes+=whr.getWorkingHours();
			}
			else {
				whr=new WorkHours();
				whr.setCreatedBy(user);
				whr.setDeleted(false);
				whr.setUserEntity(user);
				whr.setFirstLogin(lastLoginEntry);
			}
			whr.setWorkingHours(minutes);
			whr.setUpdatedBy(user);
			whr.setLastLogout(log.getPunchAt());
			workHoursRepository.save(whr);
		}
		else {
			throw new BadRequestException("Device not logged in");
		}
	}
	
}
