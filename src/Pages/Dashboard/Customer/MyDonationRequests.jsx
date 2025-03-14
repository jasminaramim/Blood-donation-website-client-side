import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import useAuth from '../../../Hoooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyDonationRequests = () => {
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); 

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetching donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['requests', user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // Return empty array if no email is available
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/donation-requests/email/${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email, // Ensure query only runs when user.email is available
  });
  
  useEffect(() => {
    let newFilteredRequests = [];
    if (statusFilter === 'all') {
      newFilteredRequests = requests;
    } else {
      newFilteredRequests = requests.filter(request => request.status === statusFilter);
    }

    setFilteredRequests(newFilteredRequests);
  }, [requests, statusFilter]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Calculate the requests to display based on pagination
  const indexOfLastRequest = currentPage * pageSize;
  const indexOfFirstRequest = indexOfLastRequest - pageSize;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredRequests.length / pageSize);

  const deleteDonationRequest = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this donation request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        // Send the DELETE request to the server
        await axiosSecure.delete(`/donation-requests/${id}`);

        // Show success message
        toast.success('Donation request deleted successfully!');

        // Update the state to remove the deleted request
        setFilteredRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      } catch (err) {
        // Show error message if the delete operation fails
        toast.error('Failed to delete the donation request!');
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>My Donation Requests</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>
      
      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Recipient Name</th>
            <th className="border px-4 py-2">Blood Group</th>
            <th className="border px-4 py-2">Hospital</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => (
              <tr key={request._id}>
                <td className="border px-4 py-2">{request.recipientName}</td>
                <td className="border px-4 py-2">{request.bloodGroup}</td>
                <td className="border px-4 py-2">{request.hospitalName}</td>
                <td className="border px-4 py-2">{request.status}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => deleteDonationRequest(request._id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center">
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Section */}
      {filteredRequests.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          {/* Pagination Buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
