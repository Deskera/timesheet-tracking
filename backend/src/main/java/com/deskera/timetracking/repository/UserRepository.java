package com.deskera.timetracking.repository;

import java.util.Date;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.deskera.timetracking.common.GENDER;
import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	//@Query("SELECT u FROM User u WHERE u.email = ?1 and u.isDeleted=false")
	//List<User> findByEmailWhereNotSetDeleted(String email);

	@Query("SELECT u FROM User u WHERE u.tenantEntity = ?1 AND u.isDeleted=false ORDER BY joiningDate desc")
	Page<User> findAllByTenant(Tenant tenant, Pageable pageable);
	
	@Query("SELECT u FROM User u WHERE u.tenantEntity = ?1 AND (LOWER(u.firstName) LIKE CONCAT('%',LOWER(?2),'%') OR LOWER(u.lastName) LIKE CONCAT('%',LOWER(?2),'%')) AND LOWER(u.email) LIKE CONCAT('%',LOWER(?3),'%') AND LOWER(u.designation) LIKE CONCAT('%',LOWER(?4),'%') AND u.contactNumber LIKE %?5% AND u.isDeleted=false")
	Page<User> findAllByTenant(Tenant tenant,String name,String email,String designation,String contactnumber, Pageable pageable);

	@Query("SELECT u FROM User u WHERE u.tenantEntity = ?1 AND (LOWER(u.firstName) LIKE CONCAT('%',LOWER(?2),'%') OR LOWER(u.lastName) LIKE CONCAT('%',LOWER(?2),'%')) AND LOWER(u.email) LIKE CONCAT('%',LOWER(?3),'%') AND LOWER(u.designation) LIKE CONCAT('%',LOWER(?4),'%') AND u.contactNumber LIKE %?5% AND to_char(u.joiningDate,'YYYY-MM-DD') LIKE %?6% AND u.isDeleted=false")
	Page<User> findAllByTenant(Tenant tenant,String name,String email,String designation,String contactnumber,String joiningDate, Pageable pageable);
	
	@Query("SELECT u FROM User u WHERE u.tenantEntity = ?1 AND (LOWER(u.firstName) LIKE CONCAT('%',LOWER(?2),'%') OR LOWER(u.lastName) LIKE CONCAT('%',LOWER(?2),'%')) AND LOWER(u.email) LIKE CONCAT('%',LOWER(?3),'%') AND LOWER(u.designation) LIKE CONCAT('%',LOWER(?4),'%') AND u.contactNumber LIKE %?5% AND u.gender=?6 AND to_char(u.joiningDate,'YYYY-MM-DD') LIKE %?7% AND u.isDeleted=false")
	Page<User> findAllByTenant(Tenant tenant,String name,String email,String designation,String contactnumber,GENDER gender,String joiningDate, Pageable pageable);

	@Query("SELECT u FROM User u WHERE u.tenantEntity = ?1 AND (LOWER(u.firstName) LIKE CONCAT('%',LOWER(?2),'%') OR LOWER(u.lastName) LIKE CONCAT('%',LOWER(?2),'%')) AND LOWER(u.email) LIKE CONCAT('%',LOWER(?3),'%') AND LOWER(u.designation) LIKE CONCAT('%',LOWER(?4),'%') AND u.contactNumber LIKE %?5% AND u.gender=?6 AND u.isDeleted=false")
	Page<User> findAllByTenant(Tenant tenant,String name,String email,String designation,String contactnumber,GENDER gender,Pageable pageable);

	
	//global search
	@Query("SELECT u FROM User u WHERE u.tenantEntity = ?1 AND (LOWER(u.firstName) LIKE CONCAT('%',LOWER(?2),'%') OR LOWER(u.lastName) LIKE CONCAT('%',LOWER(?2),'%') OR LOWER(u.email) LIKE CONCAT('%',LOWER(?2),'%') OR LOWER(u.designation) LIKE CONCAT('%',LOWER(?2),'%') OR u.contactNumber LIKE %?2% OR to_char(u.joiningDate,'YYYY-MM-DD') LIKE %?2%) AND u.isDeleted=false")
	Page<User> findAllByTenant(Tenant tenant,String global, Pageable pageable);
	
	//List<User> findAllByTenantEntityOrderByJoiningDateDesc(Tenant tenant);
	
	int countAllByTenantEntity(Tenant tenant);
	
	@Query("SELECT u FROM User u WHERE u.email = ?1 AND u.isDeleted=false")
	Optional<User> findByEmail(String email);       
	
//	@Query("SELECT u FROM User u WHERE u.isDeleted=false")
//	Page<User> findAllUsers(Pageable pageable);
}
