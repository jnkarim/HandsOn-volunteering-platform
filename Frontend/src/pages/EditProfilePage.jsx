import React, { useEffect, useState } from 'react';

const EditProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    skills: [],
    causes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Predefined options for skills and causes
  const skillOptions = ['Teaching', 'Event Planning', 'Public Speaking', 'Coding', 'Design', 'Writing', 'Cleaning'];
  const causeOptions = ['Environmental', 'Education', 'Healthcare', 'Poverty Alleviation', 'Animal Welfare', 'Disaster Relief'];

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Add or remove a skill
  const toggleSkill = (skill) => {
    if (user.skills.includes(skill)) {
      setUser({ ...user, skills: user.skills.filter((s) => s !== skill) });
    } else {
      setUser({ ...user, skills: [...user.skills, skill] });
    }
  };

  // Add or remove a cause
  const toggleCause = (cause) => {
    if (user.causes.includes(cause)) {
      setUser({ ...user, causes: user.causes.filter((c) => c !== cause) });
    } else {
      setUser({ ...user, causes: [...user.causes, cause] });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      alert('Profile updated successfully!');
      console.log('Updated Profile:', data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Bio</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
              />
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      user.skills.includes(skill)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Causes */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Causes I Support</label>
              <div className="flex flex-wrap gap-2">
                {causeOptions.map((cause, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleCause(cause)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      user.causes.includes(cause)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {cause}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;