package com.deskera.timetracking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.entity.WorkHours;

public interface WorkHoursRepository extends JpaRepository<WorkHours, Long>{
	@Query("SELECT w from WorkHours w WHERE w.userEntity = ?1 AND to_char(w.createdDate,'YYYY-MM-DD') = to_char(CURRENT_DATE,'YYYY-MM-DD')")
	Optional<WorkHours> findByUserEntityAndDate(User user); 
}
