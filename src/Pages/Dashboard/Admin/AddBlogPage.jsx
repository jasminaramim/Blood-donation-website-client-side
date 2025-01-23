import React, { useState } from 'react';
import useAuth from '../../../Hoooks/useAuth'; 
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { imageUpload } from '../../../Api/utils';

const AddBlogPage = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [uploadImage, setUploadImage] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const imageFile = uploadImage?.image;

    try {
      // Upload image first
      const photoURL = await imageUpload(imageFile); 

      // Prepare blog data
      const blogData = {
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        imageUrl: photoURL, 
        status: 'draft', 
        author: user?.displayName || 'Anonymous', 
      };

      // Save blog data to the server
      const response = await axiosSecure.post(`${import.meta.env.VITE_API_URL}/add-blog`, blogData);

      if (response.status === 201) {
        toast.success('Blog added successfully!');
        event.target.reset();
        setUploadImage({}); // Clear uploaded image
        navigate('/dashboard/ContentManagementPage'); // Redirect to content management page
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error('Failed to add the blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <Helmet>
        <title>Create Blog Post</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-3xl p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Create Blog Post</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border rounded bg-white text-gray-800"
              placeholder="Blog Title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border rounded bg-white text-gray-800"
            >
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              required
              className="w-full px-4 py-2 border rounded bg-white text-gray-800"
              placeholder="Write blog description here..."
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) =>
                setUploadImage({
                  image: e.target.files[0],
                  url: URL.createObjectURL(e.target.files[0]), // Temporary preview
                })
              }
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
            />
            {uploadImage?.url && (
              <div className="mt-4">
                <img
                  src={uploadImage.url}
                  alt="Uploaded Preview"
                  className="w-32 h-32 object-cover rounded-md shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-5 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
