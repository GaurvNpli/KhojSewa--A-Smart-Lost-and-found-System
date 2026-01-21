import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../config.js';
import LocationSelector from '../components/LocationSelector';
import Navbar from '../components/Navbar';

const LostItemPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Electronics',
    location: '',
    locationData: null,
    date: '',
    description: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [locationError, setLocationError] = useState('');

  const categories = ['Electronics', 'Stationeries', 'Clothing', 'Food', 'Toys', 'Other'];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (locationData) => {
    console.log('Location selected in form:', locationData);

    if (locationData && locationData.coordinates) {
      setFormData(prev => ({
        ...prev,
        locationData: locationData,
        location: locationData.address || `Lat: ${locationData.latitude}, Lng: ${locationData.longitude}`
      }));
      setLocationError('');
    } else {
      setFormData(prev => ({
        ...prev,
        locationData: null,
        location: ''
      }));
      setLocationError('Please select a location on the map');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setFormData(prev => ({ ...prev, images: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!formData.locationData) {
      setError('Please select a location on the map');
      setLoading(false);
      return;
    }

    if (formData.images.length === 0) {
      setError('Please upload at least one image');
      setLoading(false);
      return;
    }

    if (!formData.itemName.trim()) {
      setError('Please enter item name');
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError('Please select category');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('You must be logged in');
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.itemName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('locationLost', formData.location);
      formDataToSend.append('lostDate', formData.date);
      formDataToSend.append('category', formData.category);

      const locationData = {
        coordinates: formData.locationData.coordinates,
        latitude: formData.locationData.latitude,
        longitude: formData.locationData.longitude,
        address: formData.locationData.address,
        addressDetails: formData.locationData.addressDetails
      };

      formDataToSend.append('location', JSON.stringify(locationData));

      formData.images.forEach((img) => {
        formDataToSend.append('images', img);
      });

      const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const response = await fetch(`${api}/api/v1/posts/lost`, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
        },
        body: formDataToSend,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Server returned invalid JSON response');
      }

      if (!response.ok) {
        const errorMessage = data.message || data.error || (data.errors && data.errors[0]?.msg) || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      setSuccess('Lost item posted successfully! Redirecting...');

      setFormData({
        itemName: '',
        category: '',
        location: '',
        locationData: null,
        date: '',
        description: '',
        images: [],
      });
      setImagePreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => navigate('/'), 2000);

    } catch (err) {
      setError(err.message || 'Failed to post lost item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)' }}>
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium tracking-wide mb-4">
              Lost Item Report
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
              Report Your Lost Item
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Fill out the details below to report your lost item. Our community will help you find it.
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
            <div className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Item Name */}
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-stone-700 mb-2">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    id="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., iPhone 13, Black Wallet, Blue Backpack"
                    className="w-full px-4 py-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-stone-800 placeholder-stone-400"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-stone-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-stone-800 bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Location Selector */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-stone-700 mb-2">
                    Where did you lose this item? <span className="text-red-500">*</span>
                  </label>
                  <LocationSelector
                    onLocationSelect={handleLocationSelect}
                    initialLocation={formData.locationData}
                    required={true}
                  />
                  {locationError && (
                    <div className="mt-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                      {locationError}
                    </div>
                  )}
                  {formData.locationData && (
                    <div className="mt-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Location selected: {formData.location}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-stone-700 mb-2">
                    When did you lose it? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().slice(0, 16)}
                    className="w-full px-4 py-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-stone-800"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-stone-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Provide detailed description: brand, color, size, model, serial numbers, distinguishing features, contents, etc."
                    className="w-full px-4 py-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-stone-800 placeholder-stone-400 resize-none"
                  />
                  <p className="mt-2 text-sm text-stone-500">
                    Be as detailed as possible to help people identify your item
                  </p>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Upload Images (Max 3)
                  </label>
                  <div className="flex items-center gap-4 mb-4">
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Choose Images
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <span className="text-sm text-stone-500">
                      {formData.images.length} / 3 images selected
                    </span>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {imagePreviews.map((src, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={src}
                            alt={`Preview ${idx + 1}`}
                            className="h-32 w-full object-cover rounded-xl border-2 border-stone-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-stone-100">
                  <button
                    type="submit"
                    disabled={loading || !formData.locationData}
                    className={`w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${!formData.locationData ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Posting Lost Item...
                      </div>
                    ) : (
                      'Post Lost Item'
                    )}
                  </button>

                  {!formData.locationData && (
                    <p className="mt-3 text-sm text-amber-600 text-center">
                      Please select a location by clicking on the map or using search
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-stone-500">
              Your lost item will be visible to the community. People can contact you if they find it.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 mt-4 text-amber-600 hover:text-amber-700 font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemPage;