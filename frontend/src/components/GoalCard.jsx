import React, { useState } from "react";
import './GoalCard.css'

// Utility function to format dates
const formatDate = (dateStr) => {
    if(!dateStr) return "N/A";
    const date = new Date(dateStr + "T00:00:00"); // ensures local time parsing
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    return date.toLocaleDateString(undefined, options); // undefined because want user's default locale
    // locale such as: Jul 3, 2025 (US) vs 3 Jul 2025 (UK)
};

export default function GoalCard({ goal, onComplete, onUndo, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [editableDescription, setEditableDescription] = useState(goal.description);
    const [editableDueDate, setEditableDueDate] = useState(goal.dueDate || "");

    const handleSave = () => {
        onUpdate(goal.id, {
            description: editableDescription,
            dueDate: editableDueDate,
        });
        setEditing(false);
    };

    const handleCancel = () => {
        setEditableDescription(goal.description);
        setEditableDueDate(goal.dueDate || '');
        setEditing(false);
    };
    
    return (
        <div className="goal-card">
            <div className="goal-header">
                <h3>{goal.title}</h3>
                <div className="goal-actions">
                    {!goal.completed && (
                        <button 
                            className="icon-button" 
                            onClick={() => setEditing(true)} 
                            title="Edit Goal">
                                ✏️
                            </button>
                    )}
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

            {editing ? (
                <>
                    <textarea
                        className="description-edit"
                        value={editableDescription}
                        onChange={(e) => setEditableDescription(e.target.value)}
                    />

                    <input
                        type="date"
                        value={editableDueDate}
                        onChange={(e) => setEditableDueDate(e.target.value)}
                    />
                    <div className="edit-buttons">
                        <button className="save" onClick={handleSave}>Save</button>
                        <button className="cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
            
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
                </>
            )}

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