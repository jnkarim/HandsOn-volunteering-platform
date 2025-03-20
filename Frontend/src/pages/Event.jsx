import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // Update if different
});

const Event = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Get your token
      const res = await api.get("/events", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the header
        },
      });
      setEvents(res.data); // Update the events state
    } catch (error) {
      console.error(
        "Failed to fetch events:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Create Event Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-900">Upcoming Events</h2>
          <button
            onClick={() => {
              // Navigate to create event page or open a modal
              console.log("Create Event clicked");
            }}
            className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            <FaPlus className="mr-2" />
            Create Event
          </button>
        </div>

        {/* Event List */}
        {events.length === 0 ? (
          <p className="text-center text-green-600">No events available. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-green-600 mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-green-500" />
                      <p>
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-green-500" />
                      <p>{event.time}</p>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-green-500" />
                      <p>{event.location}</p>
                    </div>
                    <p>
                      <span className="font-medium">Categories:</span>{" "}
                      {event.category.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border-t border-green-100">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
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