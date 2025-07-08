import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";

export default function CompletedGoals() {
    const [goals, setGoals] = useState([]);
    const [sortOption, setSortOption] = useState("due_asc");

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

    const markIncomplete = (id) => {
        fetch(`http://localhost:8080/api/goals/${id}/incomplete`, {
            method: "PUT"
        }).then(() => {
            setGoals(goals.filter(goal => goal.id !== id));
        });
    };

    const sortedGoals = [...goals].sort((a,b) => {
        switch(sortOption) {
            case "due_asc":
                return new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity);
            
            case "due_desc":
                return new Date(b.dueDate || 0) - new Date(a.dueDate || 0);

            case "created_newest":
                return new Date(b.createdAt) - new Date(a.createdAt);

            case "created_oldest":
                return new Date(a.createdAt) - new Date(b.createdAt);
            
            case "title_asc":
                return a.title.localeCompare(b.title);

            case "title_desc":
                return b.title.localeCompare(a.title);
            
            default:
                return 0;
            
        }

    });

    const deleteGoal = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/goals/${id}`, {
                method: "DELETE",
            });

            // After deletion, update local state by removing the deleted goal
            setGoals((prevGoals) => prevGoals.filter(goal => goal.id !== id));
        } catch (error) {
            console.log("Error deleting goal: ", error)
        }
    };

    return (
        <div>
            <h1>Completed Goals</h1>
            {goals.length === 0 ? (
                <p className="no-goals-message"> No completed goals yet. </p>
            ) : 
            (
                <>
                    <div className="sort-controls">
                        <label htmlFor="sort">Sort By: </label>
                        <select
                            id = "sort"
                            value = {sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="due_asc">Due Soonest</option>
                            <option value="due_desc">Due Latest</option>
                            <option value="created_newest">Recently Added</option>
                            <option value="created_oldest">Oldest First</option>
                            <option value="title_asc">Title A-Z</option>
                            <option value="title_desc">Title Z-A</option>
                        </select>
                    </div>
                
                    <div className="goal-grid">
                        {sortedGoals.map(goal => (
                            <GoalCard 
                                key = {goal.id} 
                                goal = {goal} 
                                onComplete={() => {}} 
                                onUndo={() => markIncomplete(goal.id)}
                                onDelete={deleteGoal}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}