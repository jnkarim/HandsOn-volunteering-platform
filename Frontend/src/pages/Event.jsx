import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // Change if needed
});

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err.response?.data || err.message);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🌀 Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-opacity-50"></div>
      </div>
    );
  }

  // ❌ Error Handling
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header + Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4 sm:mb-0">
            Upcoming Events
          </h2>

          {/* Show only if user logged in */}
          {authToken && (
            <button
              onClick={() => navigate("/create-event")}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-5 rounded-lg transition"
            >
              <FaPlus className="mr-2" />
              Create Event
            </button>
          )}
        </div>

        {/* Event List */}
        {events.length === 0 ? (
          <p className="text-center text-green-600">No events available. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold text-green-900 mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-3 text-sm text-green-700">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-green-500" />
                      <p>{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-green-500" />
                      <p>{event.time}</p>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-green-500" />
                      <p>{event.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Categories:</span>{" "}
                      {event.category.join(", ")}
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <div className="p-4 bg-green-50 border-t border-green-100">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
