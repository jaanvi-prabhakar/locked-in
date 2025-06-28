import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";

export default function CompletedGoals() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/goals/completed")
            .then(res => res.json())
            .then(data => {
                console.log("Fetched completed goals: ", data);
                setGoals(data);
            })
            .catch (err => {
                console.error("Error fetching goals: ", err)
            });
    }, []);

    return (
        <div>
            <h1>Completed Goals</h1>
            {goals.length === 0 ? (
                <p className="no-goals-message"> No completed goals yet. </p>
            ) : (
            <div className="goal-grid">
                {goals.map(goal => (
                    <GoalCard key = {goal.id} goal = {goal} onComplete={() => {}} />
                ))}
            </div>
            )}
        </div>
    );
}