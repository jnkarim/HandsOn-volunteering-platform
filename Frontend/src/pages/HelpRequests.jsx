import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HelpRequests = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', urgency: 'low', postedBy: '' });
  const [newComment, setNewComment] = useState('');

  const loggedInUser = { name: 'John Doe', id: '123' }; 

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Create new help request
  const handleCreateRequest = async () => {
    try {
      await axios.post('http://localhost:4000/api/requests', {
        ...formData,
        postedBy: loggedInUser.name, 
      });
      setFormData({ title: '', description: '', urgency: 'low', postedBy: '' });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  // Add comment to a request
  const handleCommentSubmit = async (requestId) => {
    try {
      await axios.post(`http://localhost:4000/api/requests/${requestId}/comment`, {
        text: newComment,
        user: loggedInUser.name, 
      });
      setNewComment('');
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  // Get urgency color based on level
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'urgent':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Community Help Board</h2>

      {/* Create Help Request */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Post a Help Request</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name or Organization"
            value={formData.postedBy}
            onChange={(e) => setFormData({ ...formData, postedBy: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          />
          <select
            value={formData.urgency}
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="urgent">Urgent</option>
          </select>
          <button
            onClick={handleCreateRequest}
            className="w-full bg-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition duration-300"
          >
            Post Request
          </button>
        </div>
      </div>

      {/* Display Requests */}
      <div className="max-w-2xl mx-auto space-y-6">
        {requests.map((req) => (
          <div key={req._id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{req.title}</h3>
              <div className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${getUrgencyColor(req.urgency)}`}>
                {req.urgency}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{req.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Posted by: <span className="font-medium">{req.postedBy}</span>
            </p>

            {/* Comments Section */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-700 mb-4">Comments</h4>
              {req.comments.map((c, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-500">{c.user}:</strong> {c.text}
                  </p>
                </div>
              ))}

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Add a comment or offer help..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => handleCommentSubmit(req._id)}
                  className="bg-green-400 text-white px-4 py-3 rounded-lg hover:bg-green-500 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Private Messaging Button */}
            <button
              onClick={() => alert('Private messaging feature coming soon!')}
              className="w-full bg-green-400 text-white px-6 py-3 rounded-lg mt-6 hover:bg-green-500 transition duration-300"
            >
              Message {req.postedBy}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpRequests;