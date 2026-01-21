import { Bars3Icon, XMarkIcon, BellIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/khojsewa_logo.png";

function safeParseUser() {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setOpen(!open);
  const toggleAccountMenu = () => setAccountOpen(!accountOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize user state
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsSignedIn(!!token);
    if (token) {
      setUser(safeParseUser());
    }
  }, []);

  // Listen for localStorage changes (for avatar updates)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === null) {
        const token = localStorage.getItem('accessToken');
        setIsSignedIn(!!token);
        if (token) {
          setUser(safeParseUser());
        } else {
          setUser(null);
        }
      }
    };

    // Listen to storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab updates
    const handleCustomUserUpdate = () => {
      const token = localStorage.getItem('accessToken');
      setIsSignedIn(!!token);
      if (token) {
        setUser(safeParseUser());
      }
    };

    window.addEventListener('userUpdated', handleCustomUserUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', handleCustomUserUpdate);
    };
  }, []);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('notifications');
        const list = raw ? JSON.parse(raw) : [];
        setNotifications(Array.isArray(list) ? list : []);
      } catch {
        setNotifications([]);
      }
    };

    // Load immediately when signed in
    if (isSignedIn) load();

    const onUpdate = () => load();
    const onStorage = (e) => {
      if (!e || e.key === 'notifications' || e.key === null) load();
    };

    window.addEventListener('notificationsUpdated', onUpdate);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('notificationsUpdated', onUpdate);
      window.removeEventListener('storage', onStorage);
    };
  }, [isSignedIn]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setIsSignedIn(false);
    setUser(null);
    // Force page reload to clear all state
    window.location.href = '/';
  };

  let avatarUrl = null;
  if (user) {
    avatarUrl = user.avatar || `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(user.email || user._id || 'random')}`;
  } else if (isSignedIn) {
    avatarUrl = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=random`;
  }

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-stone-200/50 border-b border-stone-100'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className={`text-xl font-display font-semibold hidden sm:inline transition-colors duration-300 ${scrolled ? 'text-stone-900' : 'text-stone-800'
              }`}>
              KhojSewa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-stone-100 ${scrolled ? 'text-stone-700 hover:text-stone-900' : 'text-stone-700 hover:text-stone-900'
                }`}
            >
              Home
            </Link>
            {isSignedIn && (
              <Link
                to="/user/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-stone-100 ${scrolled ? 'text-stone-700 hover:text-stone-900' : 'text-stone-700 hover:text-stone-900'
                  }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-stone-100 ${scrolled ? 'text-stone-700 hover:text-stone-900' : 'text-stone-700 hover:text-stone-900'
                }`}
            >
              About
            </Link>

            {!isSignedIn && (
              <>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-stone-100 ${scrolled ? 'text-stone-700 hover:text-stone-900' : 'text-stone-700 hover:text-stone-900'
                    }`}
                >
                  Sign Up
                </Link>
                <Link
                  to="/signin"
                  className="ml-2 px-5 py-2.5 rounded-md text-sm font-medium bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Sign In
                </Link>
              </>
            )}

            {isSignedIn && (
              <div className="relative flex items-center space-x-2 ml-4">
                {/* Messages */}
                <Link
                  to="/user/messages"
                  className={`p-2 rounded-full transition-all duration-300 hover:bg-stone-100 ${scrolled ? 'text-stone-600' : 'text-stone-600'
                    }`}
                  title="Messages"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 rounded-full transition-all duration-300 hover:bg-stone-100 relative ${scrolled ? 'text-stone-600' : 'text-stone-600'
                      }`}
                  >
                    <BellIcon className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                        {notifications.length > 9 ? '9+' : notifications.length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white shadow-2xl rounded-xl z-50 max-h-80 overflow-auto border border-stone-100 animate-scale-in origin-top-right">
                      <div className="p-4 font-semibold border-b border-stone-100 text-stone-900">Notifications</div>
                      {notifications.length === 0 ? (
                        <div className="p-6 text-sm text-stone-400 text-center">
                          <BellIcon className="h-8 w-8 mx-auto mb-2 text-stone-300" />
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((note, index) => (
                          <div key={index} className="px-4 py-3 hover:bg-stone-50 text-sm border-b border-stone-50 text-stone-700 transition-colors">
                            {note.message}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative ml-2">
                  <button
                    onClick={toggleAccountMenu}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-100 transition-all duration-300"
                  >
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="h-9 w-9 rounded-full border-2 border-stone-200 hover:border-amber-400 transition-colors"
                    />
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-2xl rounded-xl z-50 p-4 border border-stone-100 animate-scale-in origin-top-right">
                      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-stone-100">
                        <img src={avatarUrl} alt="avatar" className="h-12 w-12 rounded-full border-2 border-stone-200" />
                        <div>
                          <p className="font-semibold text-stone-900">{user?.fullName || user?.name || "User"}</p>
                          <p className="text-sm text-stone-500">{user?.phoneNumber || user?.phone || "No phone"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate('/User/UserInterface')}
                        className="w-full text-left px-3 py-2.5 text-sm hover:bg-stone-50 rounded-lg text-stone-700 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Manage Account
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2.5 text-sm hover:bg-red-50 rounded-lg text-red-600 transition-colors flex items-center gap-2 mt-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-all duration-300 ${scrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-stone-700 hover:bg-stone-100'
                }`}
            >
              {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100 animate-slide-down">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <Link to="/" className="block px-4 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-50 transition-colors">Home</Link>
            {isSignedIn && <Link to="/user/dashboard" className="block px-4 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-50 transition-colors">Dashboard</Link>}
            <Link to="/about" className="block px-4 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-50 transition-colors">About</Link>
            {!isSignedIn && <Link to="/signup" className="block px-4 py-3 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-50 transition-colors">Sign Up</Link>}
            {!isSignedIn && <Link to="/signin" className="block px-4 py-3 rounded-lg text-base font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors text-center mt-2">Sign In</Link>}

            {isSignedIn && (
              <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                <Link to="/user/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors">
                  <ChatBubbleLeftIcon className="h-5 w-5" /> Messages
                </Link>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <BellIcon className="h-5 w-5" />
                  Notifications
                  {notifications.length > 0 && (
                    <span className="ml-auto bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="bg-stone-50 rounded-lg max-h-48 overflow-auto mx-4">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-sm text-stone-400 text-center">No notifications</div>
                    ) : (
                      notifications.map((note, index) => (
                        <div key={index} className="px-4 py-3 text-sm border-b border-stone-100 text-stone-700">
                          {note.message}
                        </div>
                      ))
                    )}
                  </div>
                )}
                <div className="bg-stone-50 p-4 rounded-xl mt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <img src={avatarUrl} alt="avatar" className="h-10 w-10 rounded-full border-2 border-stone-200" />
                    <div>
                      <p className="font-semibold text-stone-900">{user?.fullName || user?.name || "User"}</p>
                      <p className="text-sm text-stone-500">{user?.phoneNumber || user?.phone || "No phone"}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/User/UserInterface')} className="w-full text-left px-3 py-2.5 text-sm hover:bg-white rounded-lg text-stone-700 transition-colors">Manage Account</button>
                  <button onClick={handleSignOut} className="w-full text-left px-3 py-2.5 text-sm hover:bg-red-50 rounded-lg text-red-600 transition-colors mt-1">Sign Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
