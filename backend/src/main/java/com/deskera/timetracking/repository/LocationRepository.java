package com.deskera.timetracking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deskera.timetracking.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{

}
