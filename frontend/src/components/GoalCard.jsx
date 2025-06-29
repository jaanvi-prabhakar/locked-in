import React from "react";
import './GoalCard.css'

export default function GoalCard({ goal, onComplete, onUndo, onDelete }) {
    return (
        <div className="goal-card">
            <div className="goal-header">
                <h3>{goal.title}</h3>
                <div className="goal-actions">
                    {goal.completed && (
                        <button
                            className="icon-button"
                            onClick={() => onUndo(goal.id)}
                            title="Mark as Incomplete"
                            >
                                ↩️
                        </button>
                    )}
                    <button
                        className="icon-button"
                        onClick={() => onDelete(goal.id)}
                        title="Delete Goal"
                    >
                        🗑️
                    </button>
                </div>
            </div>
            
            <p>{goal.description}</p>
            <p>Due: {goal.dueDate || "N/A"} </p>

            {!goal.completed ? (
                <button onClick = {() => onComplete(goal.id)}>
                    Mark as Complete
                </button>
            ) : (
                <div className="completed-label">✅ Completed</div>
            )}
        </div>
    );
}