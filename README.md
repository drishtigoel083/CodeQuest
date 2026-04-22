# 🚀 CodeQuest

> **Practice. Code. Conquer.**

CodeQuest is a full-stack coding practice platform, built to help developers sharpen their problem-solving skills. Write code, run it instantly, submit solutions, and track your progress — all in one place.

Whether you're preparing for technical interviews or just love solving algorithmic challenges, CodeQuest provides a clean, distraction-free environment to focus on what matters most: **writing great code**.

---

## 🌐 Live Demo

https://code-quest-teal.vercel.app/

---

## ✨ Features

- **User Authentication** — Secure sign up, log in, and user profile management using JWT
- **Problem Listing Page** — Browse coding problems with title, difficulty level, status, and solution links
- **Problem Page** — Split-screen interface with problem statement on the left and a code editor on the right
- **Code Editor** — Powered by Monaco Editor (same as VS Code) with multi-language support, code execution, and submission
- **Submissions Page** — View results and history of all past submissions
- **Responsive UI** — Clean, modern interface styled with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Monaco Editor | In-browser code editor |
| Axios | API requests |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| Cookie Parser | Cookie management |
| CORS | Cross-origin requests |

### DevOps & Tools
| Tool | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Cloud database |
| Git & GitHub | Version control |
| VS Code | Development environment |

---

## 📁 Project Structure

```
codequest/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios instance
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # React Router config
│   │   └── main.jsx        # Entry point
│   ├── .env                # Frontend env variables
│   └── vite.config.js
│
└── server/                 # Express backend
    ├── routes/             # API routes
    │   ├── authRoutes.js
    │   ├── problemRoutes.js
    │   └── executionRoutes.js
    ├── models/             # Mongoose models
    ├── middleware/         # Auth middleware
    ├── .env                # Backend env variables
    └── server.js           # Entry point
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/codequest.git
cd codequest
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

> Server runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

> App runs on `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get token | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/profile` | Get user profile | ✅ |

### Problem Routes — `/api/problems`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/problems` | Get all problems | ❌ |
| GET | `/api/problems/:id` | Get a single problem | ❌ |
| POST | `/api/problems` | Create a problem | ✅ |
| PUT | `/api/problems/:id` | Update a problem | ✅ |
| DELETE | `/api/problems/:id` | Delete a problem | ✅ |

### Execution Routes — `/api/execution`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/execution/run` | Run code | ✅ |
| POST | `/api/execution/submit` | Submit solution | ✅ |


---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes and commit
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** and describe your changes

### Guidelines

- Follow existing code style and folder structure
- Write clear and descriptive commit messages
- Test your changes before submitting a PR
- Keep PRs focused — one feature or fix per PR

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).


---

⭐ If you found this project helpful, please give it a star!
