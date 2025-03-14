import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">CodeQuest</h1>
      <div>
        <Link to="/problems" className="mr-4 hover:text-gray-300">
          Explore Problems
        </Link>
        <Link to="/profile" className="mr-4 hover:text-gray-300">
          Profile
        </Link>
        <Link to="/login">
          <button className="bg-green-300 px-4 py-2 rounded text-black hover:bg-green-400 transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
