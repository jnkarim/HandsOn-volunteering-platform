import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from './pages/EditProfilePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Get the current route

  // Check if the user is logged in on initial load
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // Hide Navbar on login and signup pages
  const hideNavbarPaths = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally Render Navbar */}
      {shouldShowNavbar && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      {/* Main Content */}
      <div className="flex-grow container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Routes>
      </div>

      {/* Footer (Optional) */}
      <footer className="bg-gray-800 text-white text-center py-4 ">
        <p>&copy; 2023 HandsOn. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Wrap App inside BrowserRouter to use useLocation
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
