import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";

export default function GoalTracker() {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({
        title: "",
        description: "",
        dueDate: ""
    });

    const fetchGoals = () => {
        fetch("http://localhost:8080/api/goals")
            .then(res => res.json())
            .then(data => {
                console.log("Fetched goals: ", data);
                setGoals(data);
            })
            .catch(err => {
                console.log("Error fetching goals: ", err)
            });
    };

    const addGoal = () => {
        fetch("http://localhost:8080/api/goals", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newGoal)
        }).then(() => {
            setNewGoal({title: "", description: "", dueDate: ""});
            fetchGoals(); // refresh goals list
        })
    }

    const markComplete = (id) => {
        fetch(`http://localhost:8080/api/goals/${id}/complete`, {method: "PUT"})
        .then(() => {
            fetchGoals();
        });
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return ( 
        <div>
            <h1> Goals </h1>
            <div className="goal-form">
                <input
                    type = "text"
                    placeholder="Title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value })}
                />
                <input
                    type = "text"
                    placeholder = "Description"
                    value = {newGoal.description}
                    onChange = {(e) => setNewGoal({ ...newGoal, description: e.target.value})}
                />
                <input
                    type = "date"
                    value = {newGoal.dueDate}
                    onChange = {(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                />

                <button onClick={addGoal}>Add Goal</button>
            </div>

            <div className="goal-grid">
                {goals.filter(goal => !goal.completed).map(goal => (
                    <GoalCard key = {goal.id} goal = {goal} onComplete={markComplete} />
                ))}
            </div>
        </div>
    );
}