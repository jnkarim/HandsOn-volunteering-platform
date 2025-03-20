import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
            <p className="text-gray-600 mt-4">{user.bio}</p>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Causes Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Causes I Support</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.causes.map((cause, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm"
                >
                  {cause}
                </span>
              ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8 text-center">
            <Link
              to="/profile/edit"
              className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Volunteer History Link */}
        <div className="mt-8 text-center">
          <Link
            to="/profile/history"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            View Volunteer History →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;