package com.jaanvi_prabhakar.lockedin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jaanvi_prabhakar.lockedin.model.Goal;
import com.jaanvi_prabhakar.lockedin.repository.GoalRespository;

import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalRespository goalRespository;

    @GetMapping
    public Flux<Goal> getAllGoals() {
        return goalRespository.findAll();
    }

    @PostMapping
    public Mono<Goal> createGoal(@RequestBody Goal goal) {
        goal.setCompleted(false); // default
        return goalRespository.save(goal);
    }

    @PutMapping
    public Mono<Goal> markAsComplete(@PathVariable String id) {
        return goalRespository.findById(id)
                .flatMap(goal -> {
                    goal.setCompleted(true);
                    return goalRespository.save(goal);
                });
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteGoal(@PathVariable String id) {
        return goalRespository.deleteById(id);
    }

}
