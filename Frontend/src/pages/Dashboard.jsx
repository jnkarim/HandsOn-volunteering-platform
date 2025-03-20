import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HelpRequestForm from "../components/HelpRequestForm";  // Import HelpRequestForm
import HelpRequestList from "../components/HelpRequestList";  // Import HelpRequestList

const Dashboard = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by validating the auth token
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // Redirect to login page if not logged in
      navigate("/login");
    } else {
      // Optionally, fetch user data from your server
      // For now, we are just setting a mock user
      setUser({
        name: "John Doe",
        email: "johndoe@example.com",
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome to your Dashboard, {user?.name}
          </h2>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              Email: {user?.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="w-full lg:w-1/2 bg-blue-50 flex flex-col items-center justify-center p-4 lg:p-8">
        {/* Catchy Motto */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Continue Making a Difference
          </h2>
          <p className="text-lg text-gray-600">
            Your journey of impact continues here. Explore volunteer opportunities, manage your events, and much more.
          </p>
        </div>

        {/* Help Request Form and List */}
        <HelpRequestForm userId="user123" /> {/* Pass userId or other necessary data */}
        <HelpRequestList /> {/* Display list of requests */}
      </div>
    </div>
  );
};

export default Dashboard;
