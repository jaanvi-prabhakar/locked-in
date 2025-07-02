package com.jaanvi_prabhakar.lockedin.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalRespository goalRespository;

    @GetMapping
    public Flux<Goal> getAllGoals() {
        return goalRespository.findAll();
    }

    @GetMapping("/completed")
    public Flux<Goal> getCompletedGoals() {
        return goalRespository.findByCompletedTrue();
    }

    @PostMapping
    public ResponseEntity<Mono<Goal>> createGoal(@RequestBody Goal goal) {
        if (goal.getTitle() == null || goal.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        goal.setCompleted(false); // default
        goal.setCreatedAt(LocalDate.now());
        return ResponseEntity.ok(goalRespository.save(goal));
    }

    @PutMapping("/{id}/complete")
    public Mono<Goal> markAsComplete(@PathVariable String id) {
        return goalRespository.findById(id)
                .flatMap(goal -> {
                    goal.setCompleted(true);
                    goal.setCompletionDate(LocalDate.now());
                    return goalRespository.save(goal);
                });
    }

    @PutMapping("{id}/incomplete")
    public Mono<ResponseEntity<Goal>> markAsIncomplete(@PathVariable String id) {
        return goalRespository.findById(id)
                .flatMap(goal -> {
                    goal.setCompleted(false);
                    goal.setCompletionDate(null);
                    return goalRespository.save(goal)
                            .map(updatedGoal -> ResponseEntity.ok(updatedGoal));
                })
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteGoal(@PathVariable String id) {
        return goalRespository.findById(id)
                .flatMap(existingGoal -> goalRespository.delete(existingGoal)
                        .then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT))))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
