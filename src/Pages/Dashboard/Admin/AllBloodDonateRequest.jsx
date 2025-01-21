import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';

const AllBloodDonateRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Fetch all donation requests with react-query
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['DonationRequests'],
    queryFn: async () => {
      const response = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/donation-requests`, {
        withCredentials: true, // This ensures that cookies are sent along with the request
      });
      return response.data;
    },
  });
  

  // Paginate the donation requests
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAcceptRequest = (requestId) => {
    // Call API to accept request
    console.log(`Accept request with ID: ${requestId}`);
  };

  const handleRejectRequest = (requestId) => {
    // Call API to reject request
    console.log(`Reject request with ID: ${requestId}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>All Blood Donation Requests</title>
      </Helmet>
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight">All Blood Donation Requests</h2>
        <div className="mt-4">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b bg-gray-100 text-gray-800 text-left text-sm uppercase">Donor Name</th>
                  <th className="px-5 py-3 border-b bg-gray-100 text-gray-800 text-left text-sm uppercase">Blood Group</th>
                  <th className="px-5 py-3 border-b bg-gray-100 text-gray-800 text-left text-sm uppercase">Request Date</th>
                  <th className="px-5 py-3 border-b bg-gray-100 text-gray-800 text-left text-sm uppercase">Status</th>
                  <th className="px-5 py-3 border-b bg-gray-100 text-gray-800 text-left text-sm uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-5 py-5 border-b bg-white text-sm">{request.recipientName}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{request.bloodGroup}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{new Date(request.donationDate).toLocaleDateString()}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{request.status || 'Pending'}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="px-4 py-2 bg-gray-200 rounded">
                            Actions <ChevronDownIcon className="w-4 h-4 ml-2" />
                          </Menu.Button>
                        </div>
                        <Transition>
                          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? 'bg-gray-100' : ''}`}
                                  onClick={() => handleAcceptRequest(request._id)}
                                >
                                  Accept
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? 'bg-gray-100' : ''}`}
                                  onClick={() => handleRejectRequest(request._id)}
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
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-200 rounded"
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
