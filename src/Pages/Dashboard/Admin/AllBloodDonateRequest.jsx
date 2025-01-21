import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaDonate } from 'react-icons/fa'; // You can use an icon from react-icons

const AllBloodDonateRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all donation requests with react-query
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

  const handleAcceptRequest = useCallback(async (requestId) => {
    try {
      // Check if status is already 'Accepted', avoid unnecessary update
      const requestToUpdate = requests.find(req => req._id === requestId);
      if (requestToUpdate?.status === 'Accepted') return;
  
      // Optimistic update: Immediately update the request status in the UI
      queryClient.setQueryData(['DonationRequests'], (oldData) => {
        return oldData.map((request) =>
          request._id === requestId ? { ...request, status: 'Accepted' } : request
        );
      });
  
      // Perform the actual update on the server
      await axiosSecure.put(
        `${import.meta.env.VITE_API_URL}/donation-requests/${requestId}`,
        { status: 'Accepted' }
      );
  
      toast.success(`Request with ID: ${requestId} accepted`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to accept request', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
      queryClient.invalidateQueries(['DonationRequests']);
    }
  }, [axiosSecure, queryClient, requests]);  
  

  // Handle Reject request with optimistic update
  const handleRejectRequest = useCallback(async (requestId) => {
    try {
      queryClient.setQueryData(['DonationRequests'], (oldData) => {
        return oldData.map((request) =>
          request._id === requestId ? { ...request, status: 'Rejected' } : request
        );
      });

      await axiosSecure.put(
        `${import.meta.env.VITE_API_URL}/donation-requests/${requestId}`,
        { status: 'Rejected' }
      );
      
      toast.success(`Request with ID: ${requestId} rejected`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
      queryClient.invalidateQueries(['DonationRequests']);
    }
  }, [axiosSecure, queryClient]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>All Blood Donation Requests</title>
      </Helmet>
      <div className="py-8">
        <div className="flex items-center mb-6">
          <FaDonate className="text-red-600 mr-3" size={30} />
          <h2 className="text-3xl font-semibold leading-tight text-gray-800">All Blood Donation Requests</h2>
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
                  <td className="px-6 py-4 text-sm text-gray-800">{new Date(request.donationDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{request.status || 'Pending'}</td>
                  <td className="px-6 py-4 text-sm">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none">
                          Actions <ChevronDownIcon className="w-5 h-5 ml-2" />
                        </Menu.Button>
                      </div>
                      <Transition>
                        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`block px-4 py-2 text-sm w-full text-left ${active ? 'bg-gray-100' : ''}`}
                                onClick={() => handleAcceptRequest(request._id)}
                                disabled={request.status === 'Accepted'}
                              >
                                {request.status === 'Accepted' ? 'Accepted' : 'Accept'}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`block px-4 py-2 text-sm w-full text-left ${active ? 'bg-gray-100' : ''}`}
                                onClick={() => handleRejectRequest(request._id)}
                                disabled={request.status === 'Accepted'}
                              >
                                Reject
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
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
    </div>
  );
};

export default AllBloodDonateRequest;
