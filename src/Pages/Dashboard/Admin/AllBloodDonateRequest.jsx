import React, { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { FaDonate } from 'react-icons/fa';
import useRole from '../../../Hoooks/useRole'; // Assuming this is implemented for role management

const AllBloodDonateRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null); // Store the request for modal
  const itemsPerPage = 5;

  // Get user role
  const [role, isRoleLoading] = useRole();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['DonationRequests'],
    queryFn: async () => {
      const response = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/donation-requests`, {
        withCredentials: true,
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  // Paginate the donation requests
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle status update
  const handleStatusUpdate = useCallback(
    async (requestId, newStatus) => {
      // Restrict volunteers to update only "Pending" and "In Progress"
      if (
        role === 'volunteer' &&
        !['Pending', 'In Progress'].includes(newStatus)
      ) {
        toast.error('You are not allowed to update to this status.', {
          position: 'top-right',
          autoClose: 5000,
        });
        return;
      }

      try {
        queryClient.setQueryData(['DonationRequests'], (oldData) =>
          oldData.map((request) =>
            request._id === requestId ? { ...request, status: newStatus } : request
          )
        );

        await axiosSecure.put(
          `${import.meta.env.VITE_API_URL}/donation-requests/${requestId}`,
          { status: newStatus }
        );

        toast.success(`Request status updated to ${newStatus}`, {
          position: 'top-right',
          autoClose: 5000,
        });
      } catch (error) {
        console.error(`Error updating status to ${newStatus}:`, error);
        toast.error(`Failed to update status to ${newStatus}`, {
          position: 'top-right',
          autoClose: 5000,
        });
        queryClient.invalidateQueries(['DonationRequests']);
      }
    },
    [axiosSecure, queryClient, role]
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading || isRoleLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>All Blood Donation Requests</title>
      </Helmet>
      <div className="py-8">
        <div className="flex items-center mb-6">
          <FaDonate className="text-red-600 mr-3" size={30} />
          <h2 className="text-3xl font-semibold leading-tight text-gray-800">
            All Blood Donation Requests
          </h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Donor Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Blood Group</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Request Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRequests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{request.recipientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{request.bloodGroup}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(request.donationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{request.status || 'Pending'}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none"
                      onClick={() => setSelectedRequest(request)}
                    >
                      Actions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goToPrevPage}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-96 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Request Status</h3>
            <div className="space-y-4">
              {['Pending', 'In Progress'].map((status) => (
                <button
                  key={status}
                  className={`flex items-center justify-between px-4 py-3 text-sm w-full text-left transition duration-150 ease-in-out rounded-md ${
                    selectedRequest.status === status
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-red-50 text-gray-800 hover:bg-red-100'
                  }`}
                  onClick={() => {
                    handleStatusUpdate(selectedRequest._id, status);
                    setSelectedRequest(null);
                  }}
                  disabled={selectedRequest.status === status}
                >
                  <span className="font-medium">{status}</span>
                  {selectedRequest.status === status && (
                    <span className="text-green-500 font-bold text-xs">(Current)</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedRequest(null)}
              className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonateRequest;
