import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";

export default function GoalTracker() {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "none"
    });
    const [sortOption, setSortOption] = useState("due_asc");

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
        if (!newGoal.title.trim()) {
            alert("Title is required to add a goal.")
            return;
        }

        if(!["low", "medium", "high", "none"].includes(newGoal.priority)) {
            alert("Please select a valid priority");
            return;
        }

        fetch("http://localhost:8080/api/goals", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newGoal)
        }).then(() => {
            setNewGoal({title: "", description: "", dueDate: "", priority: "low"});
            fetchGoals(); // refresh goals list
        })
    }

    const markComplete = (id, updates) => {
        fetch(`http://localhost:8080/api/goals/${id}/complete`, {method: "PUT"})
        .then(() => {
            fetchGoals();
        });
    };

    const updateGoal = async (id, updates) => {
        try {
            await fetch(`http://localhost:8080/api/goals/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(updates),
            });
            fetchGoals();
        } catch (err) {
            console.error("Error updating due date:", err);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/goals/${id}`, {
                method: "DELETE",
            });

            // After deletion, update local state by removing the deleted goal
            setGoals((prevGoals) => prevGoals.filter(goal => goal.id !== id));
        } catch (error) {
            console.error("Error deleting goal: ", error);
        }
    };

    const sortedGoals = [...goals].sort((a,b) => {
        switch(sortOption) {
            case "due_asc":
                return (a.dueDate? new Date(a.dueDate) : Infinity) - (b.dueDate ? new Date(b.dueDate) : Infinity);

            case "due_desc":
                return (b.dueDate ? new Date(b.dueDate) : 0) - (a.dueDate ? new Date(a.dueDate) : 0);

            case "created_newest":
                return new Date(b.createdAt) - new Date(a.createdAt);
            
            case "created_oldest":
                return new Date(a.createdAt) - new Date(b.createdAt);

            case "title_asc":
                return a.title.localeCompare(b.title);
            
            case "title_desc":
                return b.title.localeCompare(a.title);

            case "priority_high_to_low":
                return priorityWeight(b.priority) - priorityWeight(a.priority);

            case "priority_low_to_high":
                return priorityWeight(a.priority) - priorityWeight(a.priority);

            default:
                return 0;
        }
    });

    const priorityWeight = (priority) => {
        switch(priority?.toLowerCase()) {
            case "high": return 3;
            case "medium": return 2;
            case "low": return 1;
            default: return 0;
        }
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
                < select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                >
                    <option value="none">Set Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <button onClick={addGoal} disabled={!newGoal.title.trim()}>Add Goal</button>
            </div>

            <div className="sort-controls">
                <label htmlFor="sort">Sort By: </label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="due_asc">Due Soonest</option>
                    <option value="due_desc">Due Latest</option>
                    <option value="created_newest">Recently Added</option>
                    <option value="created_oldest">Oldest First</option>
                    <option value="title_asc">Title A-Z</option>
                    <option value="title_desc">Title Z-A</option>
                    <option value="priority_high_to_low">High Priority</option>
                    <option value="priority_low_to_high">Low Priority</option>
                </select>
            </div>

            <div className="goal-grid">
                {sortedGoals.filter(goal => !goal.completed).map(goal => (
                    <GoalCard 
                        key = {goal.id} 
                        goal = {goal} 
                        onComplete={markComplete}
                        onUpdate={updateGoal}
                        onDelete={deleteGoal}
                    />
                ))}
            </div>
        </div>
    );
}