package com.company.taskapi.repository;


import com.company.taskapi.entity.Task;
import com.company.taskapi.entity.TaskStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.status = :status WHERE t.id = :id")
    void updateStatusById(@Param("id") Long id, @Param("status") TaskStatus status);

    @Query("SELECT t FROM Task t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :searchString, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :searchString, '%'))")
    List<Task> searchTaskByTitleAndDescription( @Param("searchString") String searchString);
}
