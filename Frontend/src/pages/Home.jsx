import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-green-500 py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="font-pacifico">HandsOn</span>
          </h1>
          <p className="text-xl text-white mb-8">
            Join a vibrant community of changemakers in Bangladesh and make a
            real difference in your community. Discover volunteer opportunities,
            collaborate with others, and track your impact—all in one place.
            Ready to change the world?
          </p>
          <p className="text-2xl font-semibold text-white mb-8">

            Ready to change the world?
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-white text-green-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-50 transition"
            >
              Get Started
            </Link>
            <Link
              to="/events"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-green-600 transition"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose <span className="font-pacifico">HandsOn</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Discover Events
              </h3>
              <p className="text-gray-600">
                Find and join volunteer-driven events that align with your
                passions and skills.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Build Teams
              </h3>
              <p className="text-gray-600">
                Collaborate with like-minded individuals to tackle large-scale
                social challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track Your Impact
              </h3>
              <p className="text-gray-600">
                Log your contributions and see the tangible difference you're
                making in your community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Photos Section */}
      <div className="py-16 bg-[#f0eee2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Volunteers in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Photo 1 */}
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Volunteers planting trees"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            {/* Photo 2 */}
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                alt="Volunteers distributing food"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            {/* Photo 3 */}
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Volunteers teaching children"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sign Up
              </h3>
              <p className="text-gray-600">
                Create your free account and join the HandsOn community in just
                a few clicks.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Find Opportunities
              </h3>
              <p className="text-gray-600">
                Browse through a wide range of volunteer events and initiatives
                near you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Make a Difference
              </h3>
              <p className="text-gray-600">
                Join events, contribute your time, and track your impact over
                time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-green-500 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference in Bangladesh?
          </h2>
          <p className="text-xl text-white mb-8">
            Join HandsOn today and be part of a community that's changing
            Bangladesh, one act of kindness at a time.
          </p>
          <Link
            to="/signup"
            className="bg-white text-green-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-50 transition"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}
