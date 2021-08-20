package com.deskera.timetracking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.User;

public interface LogRepository extends JpaRepository<Log, Long>{
	List<Log> findByUserEntity(User user);
}
