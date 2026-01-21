import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import logo from '../assets/khojsewa_logo.png';
import { Link, useNavigate } from "react-router-dom";
import { api } from '../config.js';

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  // Send OTP and initiate sign-up process
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${api}/api/v1/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phoneNumber: form.mobile,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to send OTP');
      } else {
        setSuccess('OTP sent to your email! Please verify.');
        setUserEmail(form.email);
        setShowOtpForm(true);
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  // Verify OTP and complete sign-up
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setOtpLoading(true);

    try {
      const res = await fetch(`${api}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          otp: otp
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'OTP verification failed');
      } else {
        setSuccess('Signup successful! Redirecting to sign in...');
        if (data?.data?.user) {
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
        setShowOtpForm(false);
        setForm({ name: '', email: '', mobile: '', password: '', confirmPassword: '' });
        setOtp('');
      }
    } catch (err) {
      setError('Network error');
    }
    setOtpLoading(false);
  };

  const handleResendOtp = async () => {
    setError('');
    setOtpLoading(true);

    try {
      const res = await fetch(`${api}/api/v1/auth/resend-verification-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to resend OTP');
      } else {
        setSuccess('New OTP sent to your email!');
      }
    } catch (err) {
      setError('Network error');
    }
    setOtpLoading(false);
  };

  // OTP Verification UI
  if (showOtpForm) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center px-4 py-8" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)' }}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-100 p-8">
          <div className="text-center mb-8">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            </Link>
            <h2 className="font-display text-2xl font-semibold text-stone-900 mb-2">Verify Your Email</h2>
            <p className="text-stone-500">
              We've sent a 6-digit OTP to <strong className="text-stone-700">{userEmail}</strong>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Enter OTP</label>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-4 border border-stone-200 rounded-xl text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center font-medium shadow-lg hover:shadow-xl"
              disabled={otpLoading}
            >
              {otpLoading ? (
                <ClipLoader color="#ffffff" loading={otpLoading} size={24} />
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={handleResendOtp}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
              disabled={otpLoading}
            >
              Didn't receive OTP? Resend
            </button>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-stone-100">
            <Link to="/signin" className="text-stone-600 hover:text-stone-800 transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Signup UI
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 py-8" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)' }}>
      <div className="w-full max-w-5xl bg-white rounded-2xl flex overflow-hidden shadow-2xl border border-stone-100">

        {/* Left Panel - Branding */}
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)' }}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 163, 115, 0.3) 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-amber-300 text-sm font-medium tracking-wide mb-8">
              Join Our Community
            </span>

            <Link to="/">
              <img src={logo} alt="Logo" className="w-32 h-32 mx-auto mb-6 hover:scale-105 transition-transform duration-300" />
            </Link>

            <h2 className="font-display text-3xl font-semibold text-white mb-4">
              Sign up for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">KhojSewa</span>
            </h2>

            <p className="text-stone-400 max-w-xs mx-auto leading-relaxed">
              Join thousands of people helping reunite lost items with their owners.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 bg-white">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6 text-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-3" />
            </Link>
            <h2 className="font-display text-xl font-semibold text-stone-900">Create Account</h2>
          </div>

          {/* Desktop Title */}
          <div className="hidden lg:block text-center mb-6">
            <h3 className="font-display text-2xl font-semibold text-stone-900 mb-2">Create Account</h3>
            <p className="text-stone-500">Fill in your details to get started</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="w-full max-w-sm mb-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="w-full max-w-sm mb-4 p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full p-4 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-stone-800 placeholder-stone-400"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                className="w-full p-4 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-stone-800 placeholder-stone-400"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="+977 98XXXXXXXX"
                className="w-full p-4 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-stone-800 placeholder-stone-400"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 6 characters"
                  className="w-full p-4 border border-stone-200 rounded-xl pr-16 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-stone-800 placeholder-stone-400"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-500 hover:text-stone-700 font-medium focus:outline-none transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full p-4 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-stone-800 placeholder-stone-400"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#ffffff" loading={loading} size={24} />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-stone-600 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
