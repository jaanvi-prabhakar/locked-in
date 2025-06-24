import React from "react";
import './GoalCard.css'

export default function GoalCard({ goal, onComplete }) {
    return (
        <div className="goal-card">
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Due: {goal.dueDate || "N/A"} </p>
            <button
                onClick={() => onComplete(goal.id)}
                disabled={goal.completed}
            >
                {goal.completed? "✅ Completed" : "Mark as Complete"}
            </button>
        </div>
    );
}