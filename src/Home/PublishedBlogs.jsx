import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hoooks/useAxiosSecure';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiFileText } from 'react-icons/fi'; // Icon for empty blogs

const PublishedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const axiosSecure = useAxiosSecure();

  // Fetch published blogs from the server
  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await axiosSecure.get('/add-blog');
        const publishedBlogs = response.data.filter(
          (blog) => blog.status === 'published'
        );
        setBlogs(publishedBlogs);
      } catch (err) {
        console.error('Error fetching published blogs:', err);
      }
    };

    fetchPublishedBlogs();

    // Initialize AOS on component mount
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, [axiosSecure]);

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl mt-20 font-bold text-red-600 mb-6 text-center">
        Published Blogs
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-black bg-red-900 md:w-1/2 px-4 py-2 border border-red-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 group h-full"
              data-aos="flip-left"
            >
              {/* Border Animation on Hover */}
              <div className="absolute rounded-lg bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>

              {/* Blog Thumbnail */}
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover mb-4 p-4 rounded-lg transition duration-300 ease-in-out hover:scale-105"
                />
              )}

              <h2 className="text-xl px-4 font-semibold text-red-800 mb-4 truncate">
                {blog.title}
              </h2>

              {/* Blog Information */}
              <div className="text-gray-600 flex justify-between mb-4">
                <p className='bg-red-400 w-full h-10 flex items-center justify-start px-2'>
                  <strong className='text-red-200'>Category: </strong>{blog.category}
                </p>
                <p className='bg-red-500 w-full h-10 flex items-center justify-start px-2'>
                  <strong className='text-red-100'>Status: </strong>{blog.status}
                </p>
              </div>

              {/* Read More Link - Centered Button */}
              <div className="flex p-4 justify-center mt-4">
                <Link
                  to={`/blog-details/${blog._id}`}
                  className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">
            {/* No blogs icon and message */}
            <FiFileText className="text-6xl text-gray-400 mb-4 mx-auto" />
            <p className="text-xl text-gray-700">No published blogs available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishedBlogs;
