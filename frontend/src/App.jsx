import React, {useEffect, useState} from "react";
import GoalCard from './components/GoalCard';
import './App.css';

function App() {

  const[goals, setGoals] = useState([]);
  const[newGoal, setNewGoal] = useState( {title: "", description: "", dueDate: ""});

  const fetchGoals = () => {
    fetch("api/goals")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched goals:", data);
        setGoals(data);
      })
      .catch(err => {
        console.error("Error fetching goals:", err)
      });
  };

  const addGoal = () => {
    fetch("/api/goals", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newGoal)
    }).then(() => {
      setNewGoal({ title: "", description: "" });
      fetchGoals(); //refresh goal list
    })
  }

  const markComplete = (id) => {
    fetch(`/api/goals/${id}/complete`, {method: "PUT"})
      .then(fetchGoals);
  };

  useEffect(fetchGoals, []);

  return (
    <div>
      <h1>🎯 Locked In </h1>
      <h2>Goal Tracker</h2>
      <div className="goal-form">
        <input
          type="text"
          placeholder="Title"
          value={newGoal.title}
          onChange={e => setNewGoal({...newGoal, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Description"
          value={newGoal.description}
          onChange={e => setNewGoal({...newGoal, description: e.target.value})}
        />
        <input
          type="date"
          value={newGoal.dueDate}
          onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>

      {goals.length === 0 && (
        <p style={{ textAlign: "center" }}>No goals yet. Add one above!</p>
      )}

      <div className="goal-grid">
        {goals.map(goal => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onComplete={markComplete} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
