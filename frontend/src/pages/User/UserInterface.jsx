import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const UserInterface = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [lostPosts, setLostPosts] = useState([]);
  const [foundPosts, setFoundPosts] = useState([]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  /* ------------------------- Fetch user and posts ------------------------- */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const profileRes = await fetch("http://localhost:8000/api/v1/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const profileData = await profileRes.json();

        if (profileRes.ok) {
          const userInfo = profileData.data;
          setUser(userInfo);
          setAvatarPreview(
            userInfo.avatar ||
            `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(
              userInfo.email || userInfo._id || "random"
            )}`
          );
        } else {
          throw new Error(profileData.message || "Failed to fetch user");
        }

        // Fetch lost posts
        const lostRes = await fetch("http://localhost:8000/api/v1/users/user-lost-posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const lostData = await lostRes.json();
        if (lostRes.ok) setLostPosts(lostData.data || []);

        // Fetch found posts
        const foundRes = await fetch("http://localhost:8000/api/v1/users/user-found-posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundData = await foundRes.json();
        if (foundRes.ok) setFoundPosts(foundData.data || []);
      } catch (err) {
        console.error("Error fetching user data:", err);
        alert("Failed to load user data. Please login again.");
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  /* ------------------------- Handlers ------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);

    setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/api/v1/users/upload-avatar", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        const newAvatarUrl = data.data.avatar;

        setUser((prev) => ({ ...prev, avatar: newAvatarUrl }));
        setAvatarPreview(newAvatarUrl);

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        storedUser.avatar = newAvatarUrl;
        localStorage.setItem('user', JSON.stringify(storedUser));

        window.dispatchEvent(new Event('userUpdated'));

        alert('Avatar updated successfully!');
        setIsUploadingAvatar(false);
      } else {
        alert(data.message || "Failed to upload avatar.");
        setIsUploadingAvatar(false);
      }
    } catch (err) {
      alert("Error uploading avatar: " + err.message);
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/api/v1/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          bio: user.bio,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (err) {
      alert("Error updating profile.");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return alert("Please fill all password fields.");
    if (newPassword !== confirmPassword)
      return alert("New passwords do not match.");

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/api/v1/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        alert("Password changed successfully!");
      } else {
        alert(data.message || "Password change failed.");
      }
    } catch (err) {
      alert("Error changing password.");
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/api/v1/users/delete-account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        alert("Account deleted successfully.");
        navigate("/");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete account.");
      }
    } catch (err) {
      alert("Error deleting account.");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirm(false);
  };

  /* ------------------------- Loading ------------------------- */
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-stone-600 font-medium">Loading your account...</p>
        </div>
      </div>
    );
  }

  /* ------------------------- JSX ------------------------- */
  return (
    <>
      <Navbar />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-stone-100">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-display font-semibold text-stone-900">Delete Account</h3>
              </div>
            </div>
            <p className="text-stone-600 mb-8">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDeleteAccount}
                className="px-5 py-2.5 text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen pt-24 pb-12 px-4" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)' }}>
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link to="/user/dashboard" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
            {/* Header Section */}
            <div className="p-8 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-amber-50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="User Avatar"
                    className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer hover:opacity-90 transition"
                    onClick={handleAvatarClick}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={isUploadingAvatar}
                  />
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                  {!isUploadingAvatar && (
                    <button
                      onClick={handleAvatarClick}
                      className="absolute bottom-0 right-0 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-full hover:bg-stone-800 transition shadow-lg"
                    >
                      Edit
                    </button>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-display font-semibold text-stone-900 mb-1">
                    {user.fullName || "User"}
                  </h1>
                  <p className="text-stone-500 mb-4">
                    {user.email || "No email set"}
                  </p>
                  <button
                    onClick={() => navigate("/user/dashboard")}
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>

            {/* Account Details Section */}
            <div className="p-8">
              <h2 className="text-lg font-display font-semibold text-stone-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={user.fullName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={user.bio || ""}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all resize-none"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Password Section */}
            <div className="p-8 border-t border-stone-100">
              <h2 className="text-lg font-display font-semibold text-stone-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Change Password
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleChangePassword}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-8 border-t border-stone-100 bg-red-50/50">
              <h2 className="text-lg font-display font-semibold text-red-700 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Danger Zone
              </h2>
              <p className="text-stone-600 mb-6">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInterface;
