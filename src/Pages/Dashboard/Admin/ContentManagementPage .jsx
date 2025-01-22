import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineAppstoreAdd } from 'react-icons/ai'; // Content management icon
import BlogPage from './BlogPage';

const ContentManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening and closing the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="content-management-page">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <AiOutlineAppstoreAdd className="text-red-500 mr-2" size={24} /> {/* Icon */}
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow transition duration-200"
        >
          Add Blog
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 md:w-1/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Do you want to add a blog?</h2>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md transition duration-200"
              >
                No
              </button>
              <Link
                to="/dashboard/add-blog"
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md transition duration-200"
                onClick={closeModal}
              >
                Yes
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="p-4">
        <BlogPage />
      </div>
    </div>
  );
};

export default ContentManagementPage;
