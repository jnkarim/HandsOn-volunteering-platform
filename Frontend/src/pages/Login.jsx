import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      // Store the token in localStorage
      localStorage.setItem("authToken", data.token);

      // Update isLoggedIn state
      setIsLoggedIn(true);

      // Redirect to the dashboard or home page
      navigate("/");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Form Section - Top on Mobile, Left on Desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-600 hover:text-gray-900"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Image Section - Bottom on Mobile, Right on Desktop */}
      <div className="w-full lg:w-1/2 bg-blue-50 flex flex-col items-center justify-center p-4 lg:p-8">
        {/* Catchy Motto */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Welcome Back to HandsOn
          </h2>
          <p className="text-lg text-gray-600">
            Your gateway to making a difference. Log in to continue your journey of impact and inspiration.
          </p>
        </div>
        {/* Image */}
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw1.svg"
          alt="Login Illustration"
          className="w-full h-auto max-w-md lg:max-w-full filter hue-rotate-240 brightness-150"
        />
      </div>
    </div>
  );
};

export default Login;