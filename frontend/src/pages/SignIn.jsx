import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import logo from "../assets/khojsewa_logo.png";
import { Link } from "react-router-dom";
import { api } from '../config.js';

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/v1/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Sign in failed');
      } else {
        setSuccess('Sign in successful!');
        console.log('Received token:', data.data?.accessToken);

        console.log('Sign in successful, received data:', data);

        // Store token WITHOUT Bearer prefix (add it in requests)
        const accessToken = data.data?.accessToken;
        console.log('Access token:', accessToken);

        localStorage.setItem('user', JSON.stringify(data.data?.user));
        localStorage.setItem('accessToken', accessToken);

        // Verify token was stored
        const storedToken = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');
        console.log('Stored token:', storedToken);
        console.log('Stored user:', storedUser);

        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 py-8" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)' }}>
      <div className="w-full max-w-5xl bg-white rounded-2xl flex overflow-hidden shadow-2xl border border-stone-100">

        {/* Left Side - Branding */}
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
              Welcome Back
            </span>

            <Link to="/">
              <img src={logo} alt="Logo" className="w-32 h-32 mx-auto mb-6 hover:scale-105 transition-transform duration-300" />
            </Link>

            <h2 className="font-display text-3xl font-semibold text-white mb-4">
              Sign in to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">KhojSewa</span>
            </h2>

            <p className="text-stone-400 max-w-xs mx-auto leading-relaxed">
              Reuniting lost items with their owners through our trusted community platform.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 bg-white">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            </Link>
            <h2 className="font-display text-2xl font-semibold text-stone-900">Sign In</h2>
          </div>

          {/* Desktop Title */}
          <div className="hidden lg:block text-center mb-8">
            <h3 className="font-display text-2xl font-semibold text-stone-900 mb-2">Welcome Back</h3>
            <p className="text-stone-500">Enter your credentials to continue</p>
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
          <form className="flex flex-col gap-5 w-full max-w-sm" onSubmit={handleSubmit}>
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
              <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-4 border border-stone-200 rounded-xl pr-16 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-stone-800 placeholder-stone-400"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-500 hover:text-stone-700 font-medium focus:outline-none transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  color="#ffffff"
                  loading={loading}
                  size={24}
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm my-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-sm text-stone-400">or</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Sign Up Link */}
          <p className="text-stone-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
