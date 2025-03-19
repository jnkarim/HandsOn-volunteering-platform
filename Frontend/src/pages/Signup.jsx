import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa"; // Added FaPhone icon
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setIsLoggedIn }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState(""); // State for contact number
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!name || !email || !password || !contactNumber) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:4000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, contactNumber }), // Include contactNumber
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Registration failed. Please try again.");
                return;
            }

            // Registration successful
            console.log("Registration successful:", data);

            // Save the token to localStorage
            localStorage.setItem("authToken", data.token);

            // Update isLoggedIn state
            setIsLoggedIn(true);

            // Redirect to the home page
            navigate("/");
        } catch (err) {
            setError("Failed to connect to the server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Illustration with Catchy Motto */}
            <div className="w-full lg:w-1/2 bg-blue-50 flex flex-col items-center justify-center p-4 lg:p-8">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    alt="Signup Illustration"
                    className="w-full h-auto max-w-md lg:max-w-full filter hue-rotate-240 brightness-150"
                />
                {/* Catchy Motto Section */}
                <div className="mt-8 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                        HandsOn: Where Passion Meets Purpose
                    </h2>
                    <p className="text-lg text-gray-600">
                        Join a vibrant community of changemakers. Discover volunteer opportunities, create meaningful connections, and make a lasting impact.
                    </p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">
                        Create an Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                            <FaUser className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Contact Number Input */}
                        <div className="relative">
                            <FaPhone className="absolute top-3 left-3 text-gray-400" /> {/* Phone icon */}
                            <input
                                type="tel"
                                placeholder="Contact Number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
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
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-center text-sm">
                                {error}
                            </div>
                        )}

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
                        >
                            {isLoading ? "Registering..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-green-600 hover:text-gray-900"
                            >
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;