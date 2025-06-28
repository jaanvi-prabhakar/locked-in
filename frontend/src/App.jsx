import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GoalTracker from "./pages/GoalTracker";
import CompleteGoals from "./pages/CompletedGoals";
import './App.css';

function App() {

  return (
    <Router>
      <div>
        {/* Navbar always stays visible */}
        <nav className="nav-bar">
          <Link to="/goals">Goals</Link>
          <Link to="/completed">Completed Goals</Link>
        </nav>

        {/* Route specific views go below */}
        <Routes>
          <Route path="/" element={<GoalTracker/>} />
          <Route path="/goals" element={<GoalTracker/>} />
          <Route path="/completed" element={<CompleteGoals/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
