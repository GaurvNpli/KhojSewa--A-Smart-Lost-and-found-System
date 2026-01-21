import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { Sparkles } from 'lucide-react';

const MyPosts = () => {
  const [lostPosts, setLostPosts] = useState([]);
  const [foundPosts, setFoundPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          fetch(`${api}/api/v1/posts/my/lost`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          }),
          fetch(`${api}/api/v1/posts/my/found`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
        ]);

        const lostData = await lostRes.json();
        const foundData = await foundRes.json();

        if (!lostRes.ok || !foundRes.ok) {
          setError((lostData.message || foundData.message) || 'Failed to fetch posts');
        } else {
          setLostPosts(Array.isArray(lostData.data) ? lostData.data : []);
          setFoundPosts(Array.isArray(foundData.data) ? foundData.data : []);
        }
      } catch (err) {
        setError('Network error - please check your connection');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId, type) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeletingId(postId);
    const accessToken = localStorage.getItem('accessToken');

    try {
      const endpoint = type === 'lost' ? 'lost' : 'found';
      const res = await fetch(`${api}/api/v1/posts/${endpoint}/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (res.ok) {
        if (type === 'lost') {
          setLostPosts(prev => prev.filter(p => p._id !== postId));
        } else {
          setFoundPosts(prev => prev.filter(p => p._id !== postId));
        }
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to delete post');
      }
    } catch (err) {
      alert('Network error - please try again');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCardClick = (postId, type) => {
    navigate(`/post/${type}/${postId}`);
  };

  const handleEditClick = (postId, type, e) => {
    e.stopPropagation();
    navigate(`/user/edit/${postId}/${type}`);
  };

  const handleRecommendationsClick = (postId, e) => {
    e.stopPropagation();
    navigate(`/user/recommendations/${postId}`);
  };

  const handleClaimsClick = (postId, type, e) => {
    e.stopPropagation();
    navigate(`/user/claims/${postId}?type=${type}`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <p className="text-stone-500">Loading your posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (lostPosts.length === 0 && foundPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-display font-semibold text-stone-900 mb-2">No posts yet</h3>
        <p className="text-stone-500 mb-6">You haven't created any posts yet.</p>
        <button
          onClick={() => navigate('/Search')}
          className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
        >
          Create Your First Post
        </button>
      </div>
    );
  }

  const PostCard = ({ post, type }) => (
    <div
      key={post._id}
      className="group rounded-2xl bg-white border border-stone-200 flex flex-col overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-300 cursor-pointer"
      onClick={() => handleCardClick(post._id, type)}
    >
      {/* Image Preview */}
      <div className="w-full h-40 bg-stone-100 flex items-center justify-center overflow-hidden relative">
        {post.images && post.images.length > 0 ? (
          <img
            src={post.images[0]}
            alt={post.itemName || post.title || 'Post image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : (
          <div className="text-stone-400 flex items-center justify-center w-full h-full">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {post.images && post.images.length > 0 && (
          <div className="hidden text-stone-400 items-center justify-center w-full h-full">
            No Image
          </div>
        )}

        {/* Type Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${type === 'lost'
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
          }`}>
          {type === 'lost' ? 'Lost' : 'Found'}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="block text-lg font-semibold mb-1 truncate text-stone-900 group-hover:text-amber-700 transition-colors">
          {post.itemName || post.title || 'Untitled Post'}
        </span>
        <p className="text-stone-500 text-sm mb-3 line-clamp-2">
          {post.description || 'No description provided'}
        </p>

        <div className="flex flex-wrap gap-2 text-xs text-stone-400 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.lostDate || post.foundDate
              ? new Date(post.lostDate || post.foundDate).toLocaleDateString()
              : 'N/A'
            }
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {post.category || 'N/A'}
          </span>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            title="Edit"
            className="p-2.5 rounded-lg bg-stone-100 hover:bg-amber-100 transition-colors disabled:opacity-50"
            onClick={(e) => handleEditClick(post._id, type, e)}
            disabled={deletingId === post._id}
          >
            <MdEdit className="h-4 w-4 text-stone-600" />
          </button>

          <button
            title="Delete"
            className="p-2.5 rounded-lg bg-stone-100 hover:bg-red-100 transition-colors disabled:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePost(post._id, type);
            }}
            disabled={deletingId === post._id}
          >
            {deletingId === post._id ? (
              <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <MdDelete className="h-4 w-4 text-red-500" />
            )}
          </button>

          {type === 'lost' ? (
            <button
              className="flex-1 py-2 px-3 rounded-lg bg-amber-500 text-white font-medium text-sm
                         hover:bg-amber-600 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              onClick={(e) => handleRecommendationsClick(post._id, e)}
              disabled={deletingId === post._id}
            >
              <Sparkles className="w-4 h-4" />
              <span>Find Matches</span>
            </button>
          ) : (
            <button
              className="flex-1 py-2 px-3 rounded-lg bg-stone-900 text-white font-medium text-sm
                         hover:bg-stone-800 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed"
              onClick={(e) => handleClaimsClick(post._id, type, e)}
              disabled={deletingId === post._id}
            >
              See Claims
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Lost Posts Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-semibold text-stone-900 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Lost Posts
            <span className="text-stone-400 font-normal">({lostPosts.length})</span>
          </h3>
        </div>
        {lostPosts.length === 0 ? (
          <div className="text-center py-8 bg-stone-50 rounded-xl border border-stone-100">
            <p className="text-stone-500">No lost posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostPosts.map((post) => (
              <PostCard key={post._id} post={post} type="lost" />
            ))}
          </div>
        )}
      </div>

      {/* Found Posts Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-semibold text-stone-900 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Found Posts
            <span className="text-stone-400 font-normal">({foundPosts.length})</span>
          </h3>
        </div>
        {foundPosts.length === 0 ? (
          <div className="text-center py-8 bg-stone-50 rounded-xl border border-stone-100">
            <p className="text-stone-500">No found posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundPosts.map((post) => (
              <PostCard key={post._id} post={post} type="found" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;