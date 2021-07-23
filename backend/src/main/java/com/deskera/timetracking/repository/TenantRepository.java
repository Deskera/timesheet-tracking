package com.deskera.timetracking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.deskera.timetracking.entity.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long>{

	@Query("SELECT t FROM Tenant t WHERE t.tenantName = ?1 AND t.isDeleted=false")
	Optional<Tenant> findByTenantName(String tenantName);
	
	@Query("SELECT t FROM Tenant t WHERE t.isDeleted=false")
	List<Tenant> findAllTenants();
	
}
