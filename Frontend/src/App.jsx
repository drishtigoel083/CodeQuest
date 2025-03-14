import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProblemsPage from "../pages/ProblemsPage";
import ProblemPage from "../pages/ProblemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
