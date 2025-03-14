import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProblemsPage from "../pages/ProblemsPage";
import ProblemPage from "../pages/ProblemPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import ProfilePage from "../pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemPage />} />
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/profile" element={<ProfilePage/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
