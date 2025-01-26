import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import useAuth from '../../../Hoooks/useAuth';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { useNavigate } from 'react-router-dom'; 

const DonorDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [recentRequests, setRecentRequests] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const navigate = useNavigate(); 

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['donationRequests', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/donation-requests/email/${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email, 
  });

  // Only update recentRequests when requests change
  useEffect(() => {
    if (requests.length > 0) {
      setRecentRequests(requests.slice(0, 3)); 
    }
  }, [requests]); // Dependency array ensures this runs only when `requests` changes

  if (isLoading) return <LoadingSpinner />;

  const handleViewAllRequests = () => {
    navigate('/dashboard/My-donation-request');
  };

  const handleEditRequest = (requestId) => {
    navigate(`/dashboard/My-donation-request`);
  };

  const handleDeleteRequest = (request) => {
    setRequestToDelete(request);
    setShowDeleteModal(true);
  };



  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Donor Dashboard</title>
      </Helmet>

      {/* Welcome Message Section */}
      <div className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-extrabold mb-2">
          Welcome, <span className="text-yellow-300">{user?.displayName || 'Donor'}</span>!
        </h1>
        <p className="text-xl font-medium">
          Thank you for being a part of this life-saving cause. Your generosity makes a difference!
        </p>
      </div>

      {/* Recent Requests Section */}
      {recentRequests.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Donation Requests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">Recipient: {request.recipientName}</h3>
                <p className="text-gray-500 mb-2">Blood Group: {request.bloodGroup}</p>
                <p className="text-gray-500 mb-2">Hospital: {request.hospitalName}</p>
                <p
                  className={`text-sm font-bold py-1 px-2 rounded-full ${
                    request.status === 'Pending'
                      ? 'bg-yellow-400 text-white'
                      : request.status === 'InProgress'
                      ? 'bg-blue-500 text-white'
                      : request.status === 'Done'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {request.status}
                </p>

                {/* Edit and Delete buttons */}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEditRequest(request._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                 
                </div>
              </div>
            ))}
          </div>

          {/* "View My All Requests" Button */}
          <div className="mt-6">
            <button
              onClick={handleViewAllRequests}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              View My All Requests
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">You have no donation requests yet.</p>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this request?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
