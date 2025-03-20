import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            {user.bio && (
              <p className="mt-4 text-gray-600 italic">{user.bio}</p>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Skills
          </h2>
          {user.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills added yet.</p>
          )}
        </div>

        {/* Causes Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Causes I Support
          </h2>
          {user.causes && user.causes.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.causes.map((cause, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {cause}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No causes supported yet.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/profile/edit"
            className="inline-block w-full md:w-auto text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Edit Profile
          </Link>

          <Link
            to="/profile/history"
            className="inline-block w-full md:w-auto text-center text-green-600 hover:text-green-700 font-semibold py-3 px-6 rounded-lg transition border border-green-500 hover:border-green-600"
          >
            View Volunteer History →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
