package com.deskera.timetracking.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.deskera.timetracking.common.EVENT;
import com.deskera.timetracking.entity.Log;
import com.deskera.timetracking.entity.User;

public interface LogRepository extends JpaRepository<Log, Long>{
	List<Log> findByUserEntity(User user);
	
	//@Query("SELECT max(u.punchAt) FROM Log u WHERE u.userEntity = ?1 AND u.deviceId = ?2 AND u.type= ?3 AND to_char(u.punchAt,'YYYY-MM-DD') = to_char(CURRENT_DATE,'YYYY-MM-DD') GROUP BY u.userEntity")
	//Optional<LocalDateTime> findLastLoginLogoutLog(User user,String deviceId,EVENT event);

	@Query("SELECT max(u.punchAt) FROM Log u WHERE u.userEntity = ?1 AND u.type= ?2 AND to_char(u.punchAt,'YYYY-MM-DD') = to_char(CURRENT_DATE,'YYYY-MM-DD') GROUP BY u.userEntity")
	Optional<LocalDateTime> findLastLoginLogoutLog(User user,EVENT event);

	
}//device login same
