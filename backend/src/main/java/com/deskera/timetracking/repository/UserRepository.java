package com.deskera.timetracking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.deskera.timetracking.entity.Tenant;
import com.deskera.timetracking.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	//@Query("SELECT u FROM User u WHERE u.email = ?1 and u.isDeleted=false")
	//List<User> findByEmailWhereSetDeleted(String email);

	@Query("SELECT u FROM User u WHERE u.tenantEntity = ?1 AND u.isDeleted=false ORDER BY joiningDate desc")
	List<User> findAllByTenantId(Tenant tenant);
	
	//List<User> findAllByTenantEntityOrderByJoiningDateDesc(Tenant tenant);
	
	int countAllByTenantEntity(Tenant tenant);
	
	@Query("SELECT u FROM User u WHERE u.email = ?1 AND u.isDeleted=false")
	Optional<User> findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.isDeleted=false")
	List<User> findAllUsers();
}
