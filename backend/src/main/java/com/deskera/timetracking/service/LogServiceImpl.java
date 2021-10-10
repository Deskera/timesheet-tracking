package com.deskera.timetracking.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deskera.timetracking.common.EVENT;
import com.deskera.timetracking.dto.ImageDto;
import com.deskera.timetracking.entity.Location;
import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.entity.WorkHours;
import com.deskera.timetracking.exception.BadRequestException;
import com.deskera.timetracking.exception.ResourceNotFoundException;
import com.deskera.timetracking.repository.LogRepository;
import com.deskera.timetracking.repository.WorkHoursRepository;

@Service
public class LogServiceImpl implements LogService{
	@Autowired
	LogRepository logRepository;
	@Autowired
	WorkHoursRepository workHoursRepository;

	@Override
	public LocalDateTime createLoginLog(User user,Location location,ImageDto imageDto) {
		Log log=new Log();
		log.setUserEntity(user);
		log.setType(EVENT.LOGIN);
		log.setLocation(location);
		log.setImage(imageConvert(imageDto));
		//log.setDeviceId(deviceId);
		
		Optional<LocalDateTime> optional1=logRepository.findLastLoginLogoutLog(user,EVENT.LOGIN);
		Optional<LocalDateTime> optional2=logRepository.findLastLoginLogoutLog(user,EVENT.LOGOUT);
		if(optional1.isPresent() && optional2.isPresent())
		{
			if(optional1.get().compareTo(optional2.get()) >= 0) {
				throw new BadRequestException("Already clocked in");
			}
		}
		else if(optional1.isPresent() && !optional2.isPresent())
			throw new BadRequestException("Already clocked in");
		
		logRepository.save(log);
		
		Optional<WorkHours> optional3 = workHoursRepository.findByUserEntityAndDate(user);
		if(! optional3.isPresent())
		{
		WorkHours whr=new WorkHours();
		whr.setCreatedBy(user);
		whr.setDeleted(false);
		whr.setUserEntity(user);
		whr.setFirstLogin(log);
		whr.setWorkingHours(0);
		whr.setUpdatedBy(user);
		workHoursRepository.save(whr);
		}
		
		return log.getPunchAt();
	}
	
	@Override
	public LocalDateTime createLogoutLog(User user,Location location,ImageDto imageDto) {
		Log log=new Log();
		log.setUserEntity(user);
		log.setType(EVENT.LOGOUT);
		log.setLocation(location);
		log.setImage(imageConvert(imageDto));
		//log.setDeviceId(deviceId);
		
		Optional<LocalDateTime> optional1=logRepository.findLastLoginLogoutLog(user, EVENT.LOGIN);
		Optional<LocalDateTime> optional2=logRepository.findLastLoginLogoutLog(user, EVENT.LOGOUT);

		if(optional1.isPresent())
		{	
			LocalDateTime lastLoginEntry = optional1.get();		//for current date
			if(optional2.isPresent()) {
				LocalDateTime lastLogoutEntry = optional2.get();
				if(lastLoginEntry.compareTo(lastLogoutEntry) <= 0) {
					throw new BadRequestException("Already clocked out");
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
//			}
//			else {
//				whr=new WorkHours();
//				whr.setCreatedBy(user);
//				whr.setDeleted(false);
//				whr.setUserEntity(user);
//				whr.setFirstLogin(lastLoginEntry);
//			}
			whr.setWorkingHours(minutes);
			whr.setUpdatedBy(user);
			whr.setLastLogout(log);
			
			workHoursRepository.save(whr);
			}
			return log.getPunchAt();
		}
		else {
			throw new BadRequestException("Device not logged in");
		}
	}

	private byte[] imageConvert(ImageDto imageDto) {
		
		if(!imageDto.getImg().isEmpty())
			{ 
				byte[] decodedString = Base64.getDecoder().decode(imageDto.getImg());
				return decodedString;
			}
		else
			throw new BadRequestException("Image cannot be empty");

	}
	
	@Override
	public Log getLogById(long logId) {
		Optional<Log> optional=logRepository.findById(logId);
		if(!optional.isPresent())
			throw new ResourceNotFoundException("No such log id found");
		return optional.get();
	}
	
}
