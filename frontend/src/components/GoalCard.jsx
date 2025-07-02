import React from "react";
import './GoalCard.css'

// Utility function to format dates
const formatDate = (dateStr) => {
    if(!dateStr) return "N/A";
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    return new Date(dateStr).toLocaleDateString(undefined, options);
};

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

            <div className="goal-dates">
                <div className="date-row">
                    <span className="date-label">Created:</span>
                    <span className="date-value">{formatDate(goal.createdAt)|| "N/A"}</span>
                </div>
                
                <div className="date-row">
                    <span className="date-label">Due:</span>
                    <span className="date-value">{formatDate(goal.dueDate) || "N/A"}</span>
                </div>
                
                {goal.completed && (
                    <div className="date-row">
                        <span className="date-label">Completed:</span>
                        <span className="date-value">{formatDate(goal.completionDate) || "N/A"}</span>
                    </div>
                )}
            </div>

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