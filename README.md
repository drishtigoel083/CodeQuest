# CodeQuest

A full-stack web application that replicates the core functionality of LeetCode, allowing users to browse coding problems, write and run code, and submit solutions.

## Features
- **User Authentication**: Sign up, log in, and manage user profiles.
- **Problem Listing Page**: Displays coding problems with title, difficulty level, status, and solution links.
- **Problem Page**: Split-screen interface with a problem statement on the left and a code editor on the right.
- **Code Editor**: Supports multiple programming languages, code execution, and submission.
- **Submissions Page**: Displays results of past submissions.
- **Responsive UI**: Styled with Tailwind CSS and plain CSS.

## Technologies Used
### Frontend:
- React.js
- React Router
- Tailwind CSS
- Monacco editor (for code editor)

### Backend:
- Node.js
- Express.js
- MongoDB (for database)
- JWT for authentication

### Other Tools:
- Git & GitHub for version control
- VS Code for development

## Directory Structure

```
Leetcode-Clone/
│── Backend/
│   ├── models/
│   │   ├── Problem.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── problemRoutes.js
│   ├── scripts/
│   │   ├── seedProblems.js
│
│── Frontend/
│   ├── components/
│   │   ├── CodeEditor.jsx
│   │   ├── Navbar.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProblemPage.jsx
│   │   ├── ProblemsPage.jsx

```


