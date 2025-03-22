"use client"

import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Random avatar selection
  const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Willow",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Nova",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
  ]

  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await axios.post("https://codequest-server-3fyv.onrender.com/api/auth/register", {
        username,
        email,
        password,
      })

      console.log("Registration successful:", response.data)
      alert("Registration successful! You can now log in.")
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-teal-300 to-emerald-500 text-gray-900 px-4 py-12">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-200 opacity-20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] text-center relative z-10 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.3)]">
        <div className="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white shadow-lg bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center overflow-hidden">
          <img src={randomAvatar || "/placeholder.svg"} alt="User Avatar" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-3xl font-bold mt-4 bg-gradient-to-r from-cyan-600 to-teal-700 text-transparent bg-clip-text">
          Join CodeQuest
        </h2>
        <p className="text-gray-500 mt-2">Create your account to start coding</p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 pl-12 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              required
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 pl-12 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              required
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pl-12 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              required
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="p-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
