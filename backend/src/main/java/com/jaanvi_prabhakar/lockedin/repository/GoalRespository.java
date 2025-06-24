package com.jaanvi_prabhakar.lockedin.repository;

import com.jaanvi_prabhakar.lockedin.model.Goal;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRespository extends ReactiveMongoRepository<Goal, String> {

}
