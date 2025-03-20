import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHandsHelping } from 'react-icons/fa';

const privateNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Profile', href: '/profile' },
];

const publicNavigation = [
  { name: 'Events', href: '/events' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-green-500 shadow-md">
      {({ open }) => (
        <>
          {/* Top Bar */}
          <div className="py-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                {/* Logo & Name */}
                <Link to="/" className="flex items-center">
                  <FaHandsHelping className="h-8 w-8 text-white" />
                  <span
                    className="ml-2 text-3xl font-bold text-white"
                    style={{ fontFamily: 'Pacifico, cursive' }}
                  >
                    HandsOn
                  </span>
                </Link>

                {/* Login / Logout */}
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-lg font-semibold text-white hover:text-gray-900 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-lg font-semibold text-white hover:text-gray-900 transition"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white w-full" />

          {/* Navigation Links */}
          <div className="bg-white py-2">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-4">
                {/* Always show Events link */}
                {publicNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        isActive
                          ? 'bg-gray-100 text-black'
                          : 'text-gray-800 hover:text-green-600',
                        'px-3 py-2 text-md font-medium transition rounded-md'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Show private navigation links only if logged in */}
                {isLoggedIn &&
                  privateNavigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          isActive
                            ? 'bg-gray-100 text-black'
                            : 'text-gray-800 hover:text-green-600',
                          'px-3 py-2 text-md font-medium transition rounded-md'
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 bg-white">
              {/* Always show Events link */}
              {publicNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-800 hover:bg-gray-100 hover:text-black',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}

              {/* Show private navigation links only if logged in */}
              {isLoggedIn &&
                privateNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className={classNames(
                        isActive
                          ? 'bg-gray-100 text-black'
                          : 'text-gray-800 hover:bg-gray-100 hover:text-black',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  );
                })}

              {isLoggedIn && (
                <DisclosureButton
                  as="button"
                  onClick={handleLogout}
                  className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 text-left"
                >
                  Sign out
                </DisclosureButton>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}