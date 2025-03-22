import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import editorImage from "../src/assets/Frontimage.png.png";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between mt-12 p-6">
    
        <div className="md:w-1/3 flex justify-center">
          <img src={editorImage} alt="Code Editor" className="rounded-lg w-80 md:w-full" />
        </div>

        <div className="md:w-1/2 text-center md:text-left p-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Welcome to <span className="text-emerald-500">CodeQuest</span>
          </h1>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Ready to level up your coding skills? Join <span className="font-semibold text-gray-900">CodeQuest</span>, 
            a platform where you can practice coding challenges, improve problem-solving skills, and prepare for coding interviews in an interactive way.
          </p>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Whether you're a beginner or an experienced coder, our problems cover everything from easy to advanced concepts.  
            <span className="text-gray-900 font-semibold"> Join now and start coding!</span>
          </p>

          <Link to="/problems">
            <button className="bg-gray-900 hover:bg-gray-800 transition-all text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md">
              Start Solving Problems →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
