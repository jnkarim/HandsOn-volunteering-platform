import { Link } from "react-router-dom";

const isLoggedIn = () => {
  return localStorage.getItem('authToken') !== null;
};

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Welcome to <span className="font-pacifico text-green-200">HandsOn</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 animate-fade-in-up delay-100">
            Join a vibrant community of changemakers in Bangladesh and make a
            real difference in your community. Discover volunteer opportunities,
            collaborate with others, and track your impact—all in one place.
          </p>
          <p className="text-2xl font-semibold text-green-100 mb-8 animate-fade-in-up delay-200">
            Ready to change the world?
          </p>
          <div className="space-x-4 animate-fade-in-up delay-300">
            {!isLoggedIn() && (
              <Link
                to="/signup"
                className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            )}
            <Link
              to="/events"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-700 hover:shadow-lg transition-all duration-300"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose <span className="font-pacifico text-green-600">HandsOn</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                ),
                title: "Discover Events",
                description:
                  "Find and join volunteer-driven events that align with your passions and skills.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Build Teams",
                description:
                  "Collaborate with like-minded individuals to tackle large-scale social challenges.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                title: "Track Your Impact",
                description:
                  "Log your contributions and see the tangible difference you're making in your community.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Photos Section */}
      <div className="py-24 bg-[#f0eee2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Our Volunteers in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            ].map((src, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={src}
                  alt={`Volunteer ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold">
                    Volunteer Action
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Sign Up",
                description:
                  "Create your free account and join the HandsOn community in just a few clicks.",
              },
              {
                step: "2",
                title: "Find Opportunities",
                description:
                  "Browse through a wide range of volunteer events and initiatives near you.",
              },
              {
                step: "3",
                title: "Make a Difference",
                description:
                  "Join events, contribute your time, and track your impact over time.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference in Bangladesh?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join HandsOn today and be part of a community that's changing
            Bangladesh, one act of kindness at a time.
          </p>
          {!isLoggedIn() && (
            <Link
              to="/signup"
              className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 hover:shadow-lg transition-all duration-300"
            >
              Join Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}