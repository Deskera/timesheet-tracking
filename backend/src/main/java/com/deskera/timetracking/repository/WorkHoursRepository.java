package com.deskera.timetracking.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.deskera.timetracking.entity.User;
import com.deskera.timetracking.entity.WorkHours;

public interface WorkHoursRepository extends JpaRepository<WorkHours, Long>{
	@Query("SELECT w from WorkHours w WHERE w.userEntity = ?1 AND to_char(w.createdDate,'YYYY-MM-DD') = to_char(CURRENT_DATE,'YYYY-MM-DD')")
	Optional<WorkHours> findByUserEntityAndDate(User user); 
	
	Page<WorkHours> findAllByUserEntityAndIsDeletedFalseOrderByFirstLoginDesc(User user,Pageable pageable);
	
	@Query("SELECT w from WorkHours w WHERE w.userEntity = ?1 AND DATE(w.createdDate) >= ?2 AND DATE(w.createdDate) <= ?3 AND w.isDeleted=false order by w.createdDate DESC")
	Page<WorkHours> findAllByDate(User user,Date fromDate,Date toDate,Pageable pageable);
	
}
