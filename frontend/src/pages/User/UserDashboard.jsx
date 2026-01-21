import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import MyPosts from './MyPosts';
import Messages from './Messages';
import MyDetail from './MyDetails';
import logo from '../../assets/khojsewa_logo.png';

const UserDashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get initial tab from URL parameter
  const initialTab = searchParams.get('tab') || 'myPosts';
  const [activeSection, setActiveSection] = useState(initialTab);
  const tabs = [
    {
      key: 'myPosts', label: 'My Posts', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      key: 'messages', label: 'Messages', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      key: 'myDetails', label: 'My Account', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  // Handle URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['myPosts', 'messages', 'myDetails'].includes(tab)) {
      setActiveSection(tab);
    }
  }, [searchParams]);

  // Get user object for avatar
  const rawUser = localStorage.getItem('user');
  let user = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  }

  let avatarUrl = null;
  if (user) {
    avatarUrl = user.avatar || `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(user.email || user._id || 'random')}`;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)' }}>
      {/* Premium Top Bar */}
      <div className="w-full flex items-center justify-between px-6 lg:px-8 h-20 bg-white/80 backdrop-blur-xl border-b border-stone-100 shadow-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-xl font-display font-semibold text-stone-900 hidden sm:inline">KhojSewa</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 mr-4">
            <img
              src={avatarUrl}
              alt="avatar"
              className="h-10 w-10 rounded-full border-2 border-stone-200"
            />
            <div className="text-right">
              <p className="text-sm font-medium text-stone-900">{user?.fullName || user?.name || 'User'}</p>
              <p className="text-xs text-stone-500">Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
          </button>
        </div>
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold text-stone-900 mb-2">Dashboard</h1>
            <p className="text-stone-600">Manage your posts, messages, and account settings</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden">
            <div className="flex border-b border-stone-100">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSection(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm focus:outline-none transition-all duration-300 ${activeSection === tab.key
                      ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-500'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                    }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 min-h-[600px]">
              {activeSection === 'myPosts' && <MyPosts />}
              {activeSection === 'messages' && <Messages user={user} />}
              {activeSection === 'myDetails' && <MyDetail />}
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-sm text-stone-500 border-t border-stone-100 bg-white/50">
        © {new Date().getFullYear()} KhojSewa. All rights reserved.
      </footer>
    </div>
  );
};

export default UserDashboard;