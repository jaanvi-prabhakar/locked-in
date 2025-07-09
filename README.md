# Locked In: A Gamified Productivity Tool

Welcome to the official documentation for **Locked In**: a simple, powerful, and gamified goal-tracking application.

## Introduction

**Locked In** is a gamified productivity tool that helps users stay focused by visually tracking goals with due dates and priorities. Inspired by minimalist design and interactive engagement, it aims to create a "flow state" experience for personal and professional productivity.

### Key Features
- Add and manage goals
- Assign due dates and priorities
- Mark goals complete or undo completion
- Sort and filter goals
- Priority tag visualization
- (Planned) Gamification with streaks and badges

### Component Breakdown
- **Frontend**: React with modular components and basic routing
- **Backend**: Spring Boot (WebFlux for async/non-blocking support)
- **Database**: MongoDB (via Spring Data Reactive Mongo)

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/goals` | Get all goals |
| GET    | `/api/goals/completed` | Get only completed goals |
| POST   | `/api/goals` | Create a new goal |
| PUT    | `/api/goals/{id}` | Update goal (description, due date, priority) |
| PUT    | `/api/goals/{id}/complete` | Mark goal as complete |
| PUT    | `/api/goals/{id}/incomplete` | Revert completion |
| DELETE | `/api/goals/{id}` | Delete a goal |

### Sample Goal JSON
```json
{
  "title": "Finish project",
  "description": "Work on frontend polish",
  "dueDate": "2025-07-10",
  "priority": "high"
}
```

## Developer Setup
Prerequisites
Java 17+
Node.js 18+
MongoDB URI (local or Atlas)

Run Locally

```
# Backend
cd backend/
./mvnw spring-boot:run

# Frontend
cd frontend/
npm install
npm start
```

Environment File Example
```
REACT_APP_API_URL=http://localhost:8080
```

## Contribution Guide
### How to Contribute
* Fork the repo
* Create a new branch
* Commit and push
* Open a pull request

### Coding Standards
* Follow consistent naming
* Write clean, commented code
* Use environment variables (no hardcoded URLs)

## Folder Structure (Simplified)
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
backend/
├── src/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   └── LockedInApplication.java
```

## Contact
Built by [@jaanvi-prabhakar](https://github.com/jaanviprabhakar)
Feel free to open issues, feature requests, or PRs!
