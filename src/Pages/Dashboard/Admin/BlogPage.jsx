import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useRole from '../../../Hoooks/useRole'; // Assuming the useRole hook path is correct

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); // State for blogs
  const [filter, setFilter] = useState('all'); // State for filtering by status
  const axiosSecure = useAxiosSecure();
  const [role, isLoadingRole] = useRole(); // Get role using useRole hook

  // Fetch blogs from the server using axiosSecure
  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const response = await axiosSecure.get('/add-blog');
        if (isMounted && Array.isArray(response.data)) {
          setBlogs(response.data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, [axiosSecure]);

  // Handle blog deletion with SweetAlert2 confirmation
  const deleteBlog = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/add-blog/${id}`);
        toast.success('Blog Deleted Successfully!');
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id)); // Corrected state update
      } catch (err) {
        toast.error('Failed to delete the Blog!');
      }
    }
  };

  // Handle blog status update (Publish)
  const handlePublish = async (id) => {
    try {
      const response = await axiosSecure.patch(`/add-blog/${id}`, {
        status: 'published',
      });
      if (response.data.modifiedCount > 0) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, status: 'published' } : blog
          )
        );
        Swal.fire('Published!', 'Your blog has been published.', 'success');
      }
    } catch (err) {
      console.error('Error publishing blog:', err);
      Swal.fire('Error!', 'Failed to publish the blog. Please try again.', 'error');
    }
  };

  // Handle blog status update (Unpublish)
  const handleUnpublish = async (id) => {
    try {
      const response = await axiosSecure.patch(`/add-blog/${id}`, {
        status: 'draft',
      });
      if (response.data.modifiedCount > 0) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, status: 'draft' } : blog
          )
        );
        Swal.fire('Unpublished!', 'Your blog has been moved back to draft.', 'success');
      }
    } catch (err) {
      console.error('Error unpublishing blog:', err);
      Swal.fire('Error!', 'Failed to unpublish the blog. Please try again.', 'error');
    }
  };

  // Filter blogs based on status
  const filteredBlogs = blogs.filter((blog) => {
    if (filter === 'all') return true;
    return blog.status === filter;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Blog Management
      </h1>

      {/* Filtering Dropdown */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          <label htmlFor="filter" className="text-lg font-medium text-gray-700">
            Filter Blogs:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              {/* Image Display */}
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}
              <h2 className="text-2xl font-bold text-red-800 mb-4">
                {blog.title}
              </h2>
              <h2 className="text-xl font-semibold text-red-800 mb-4">
                {blog.category}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{blog.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Status:</strong> {blog.status}
              </p>
              {/* Publish/Unpublish Buttons */}
              {role.role === 'admin' && blog.status === 'draft' && (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                  onClick={() => handlePublish(blog._id)}
                >
                  Publish
                </button>
              )}
              {role.role === 'admin' && blog.status === 'published' && (
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
                  onClick={() => handleUnpublish(blog._id)}
                >
                  Unpublish
                </button>
              )}
              {/* Delete Button */}
              {role.role === 'admin' && (
                <button
                  className="px-4 ml-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 mt-2"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">
            No blogs available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
