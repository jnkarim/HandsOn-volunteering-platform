import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Predefined category options
const categoryOptions = [
  "Environmental",
  "Education",
  "Healthcare",
  "Poverty Alleviation",
  "Animal Welfare",
  "Disaster Relief",
];

const CreateEvent = () => {
  const navigate = useNavigate();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    categories: [], // renamed to categories (plural)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleCategory = (category) => {
    setNewEvent((prevState) => {
      const isSelected = prevState.categories.includes(category);
      return {
        ...prevState,
        categories: isSelected
          ? prevState.categories.filter((c) => c !== category)
          : [...prevState.categories, category],
      };
    });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      const res = await api.post(
        "/events",
        {
          ...newEvent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Event created:", res.data);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        categories: [],
      });

      alert("Event created successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      alert("Error creating event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold text-green-900">
            Create a New Event
          </h2>
          <p className="mt-2 text-center text-sm text-green-600">
            Fill out the details below to create your event
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleCreateEvent}>
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={newEvent.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map((category) => (
                <label
                  key={category}
                  className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition ${
                    newEvent.categories.includes(category)
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-green-700 border-green-300 hover:bg-green-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    checked={newEvent.categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="hidden"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
