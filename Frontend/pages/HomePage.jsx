import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import editorImage from "../src/assets/Frontimage.png.png";


const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between mt-12 p-6">
        
        <div className="md: w-1/3">
          <img src={editorImage} alt="Code Editor" className="rounded-lg" />
        </div>

        
        <div className="md:w-1/2 text-center md:text-left p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CodeQuest</h1>
          <p className="text-gray-600 text-lg mb-6">
            Solve coding challenges, improve your problem-solving skills, and prepare for coding interviews with our interactive platform.
          </p>
          <Link to="/problems">
            <button className="bg-gray-900 text-white px-6 py-3 rounded text-lg font-semibold">
              Start Solving Problems
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
