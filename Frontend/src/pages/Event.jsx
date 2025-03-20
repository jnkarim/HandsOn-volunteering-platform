import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlus, FaUsers } from 'react-icons/fa';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAttendees, setShowAttendees] = useState(null); 
  const navigate = useNavigate();

 
  const currentUserId = localStorage.getItem('userId');

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await api.get('/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error.response?.data || error.message);
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please log in to join the event.');
        navigate('/login');
        return;
      }

      const res = await api.post(
        `/events/${eventId}/join`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert('Successfully joined the event!');
        fetchEvents(); // Refresh the event list
      }
    } catch (error) {
      console.error('Error joining event:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error joining event. Please try again.');
    }
  };

  useEffect(() => {
    fetchEvents();
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 sm:mb-0">
            🌱 Upcoming Volunteer Events
          </h2>
          {isLoggedIn && (
            <button
              onClick={() => navigate('/create-event')}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaPlus />
              Create Event
            </button>
          )}
        </div>

        {/* Event List */}
        {events.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-16">
            <p className="text-lg text-gray-600 mb-4">
              No events available. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              // Check if the current user is the event creator
              const isCreator = event.creator && event.creator._id === currentUserId;

              // Check if the current user has already joined the event
              const hasJoined = event.attendees.some(attendee => attendee._id === currentUserId);

              return (
                <div
                  key={event._id}
                  className="flex flex-col justify-between bg-white rounded-3xl shadow hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                      {event.description.length > 100
                        ? event.description.slice(0, 100) + '...'
                        : event.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-500">
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
                      <div className="flex items-center">
                        <p className="font-medium">Category:</p>
                        <p className="ml-2">{event.category.join(', ')}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium">Attendees:</p>
                        <p className="ml-2">{event.attendees.length}</p>
                        <button
                          onClick={() => setShowAttendees(event._id)}
                          className="ml-2 text-green-500 hover:text-green-600"
                        >
                          <FaUsers />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-100 border-t">
                    {isCreator ? (
                      <button
                        disabled
                        className="w-full bg-gray-400 cursor-not-allowed text-white font-semibold py-2 px-4 rounded-xl"
                      >
                        Your Event
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinEvent(event._id)}
                        disabled={hasJoined}
                        className={`w-full ${
                          hasJoined
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300`}
                      >
                        {hasJoined ? 'Joined' : 'Join Event'}
                      </button>
                    )}
                  </div>

                  {/* Attendee List Modal */}
                  {showAttendees === event._id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
                        <h3 className="text-xl font-bold mb-4">Attendees</h3>
                        <ul>
                          {event.attendees.map((attendee) => (
                            <li key={attendee._id} className="mb-2">
                              {attendee.name} ({attendee.email})
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => setShowAttendees(null)}
                          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;