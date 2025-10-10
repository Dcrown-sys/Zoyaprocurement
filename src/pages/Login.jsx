// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/users/login`, formData);

      // Save backend response
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setMessage("");
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post(`${API_URL}/auth/firebase`, {
        token,
        name: result.user.displayName,
      });

      if (res.data) navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.error || err.message || "Google login failed");
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-purple-50 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Log In
        </h1>

        {message && <p className="text-red-500 mb-4">{message}</p>}

        {/* Email/Password Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-900 transition-all font-medium"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <hr className="my-6 border-gray-300" />

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 py-2 rounded-lg shadow hover:bg-gray-100 flex items-center justify-center gap-2 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
            <path fill="#4285F4" d="M24 9.5c3.94 0 6.6 1.7 8.12 3.12l5.72-5.72C34.3 3.56 29.6 1.5 24 1.5 14.82 1.5 7.09 7.48 4.47 15.62l6.93 5.38C12.83 13.79 17.97 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.5 24.5c0-1.65-.15-3.22-.42-4.75H24v9h12.72c-.55 2.86-2.19 5.28-4.72 6.9l7.38 5.73C43.97 38.08 46.5 31.77 46.5 24.5z"/>
            <path fill="#FBBC05" d="M11.4 28.38a14.4 14.4 0 0 1 0-8.76l-6.93-5.38a23.46 23.46 0 0 0 0 19.52l6.93-5.38z"/>
            <path fill="#EA4335" d="M24 47.5c6.48 0 11.92-2.14 15.9-5.79l-7.38-5.73c-2.05 1.38-4.68 2.2-8.52 2.2-6.03 0-11.17-4.29-12.6-10.13l-6.93 5.38C7.09 41.52 14.82 47.5 24 47.5z"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-700 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
