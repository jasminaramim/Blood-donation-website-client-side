import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { FaDonate } from 'react-icons/fa'; // Icon for the page
import useAxiosSecure from '../Hoooks/useAxiosSecure';
import { FaSearch } from 'react-icons/fa';

const districtsAndUpazilas = {
    Dhaka: [
      "Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Demra", "Tongi", "Shibpur", "Siddhirganj", "Narayanganj"
    ],
    Chittagong: [
      "Patiya", "Sitakunda", "Boalkhali", "Rangunia", "Anwara", "Fatikchhari", "Mirsharai", "Lohagara", "Banshkhali", "Sandwip"
    ],
    Rajshahi: [
      "Paba", "Durgapur", "Charghat", "Bagha", "Mohonpur", "Tanore", "Godagari", "Shibganj", "Niamatpur"
    ],
    Khulna: [
      "Batiaghata", "Dacope", "Dumuria", "Koyra", "Terokhada", "Paikgachha", "Kalaroa", "Shyamnagar", "Assasuni"
    ],
    Barishal: [
      "Bakerganj", "Barisal Sadar", "Agailjhara", "Muladi", "Banaripara", "Wazirpur", "Gournadi", "Uzirpur", "Kalapara"
    ],
    Sylhet: [
      "Moulvibazar", "Rajnagar", "Juri", "Kulaura", "Sreemangal", "Fenchuganj", "Balaganj", "Gowainghat", "Companiganj"
    ],
    Rangpur: [
      "Kurigram", "Gaibandha", "Lalmonirhat", "Nilphamari", "Rangpur Sadar", "Kachdana", "Pirganj", "Pirgachha", "Badarganj"
    ],
    Khagrachari: [
      "Dighinala", "Lakshmipur", "Manikchhari", "Mahalchhari", "Madhupur", "Mohalchhari", "Khagrachhari Sadar"
    ],
    Comilla: [
      "Laksam", "Titas", "Muradnagar", "Debidwar", "Monohorgonj", "Kamalnagar", "Comilla Sadar", "Nangalkot"
    ],
    Jessore: [
      "Abhaynagar", "Chaugachha", "Keshabpur", "Jessore Sadar", "Benapole", "Shashibhushon", "Bagherpara", "Jhikargachha"
    ],
    Mymensingh: [
      "Mymensingh Sadar", "Trishal", "Haluaghat", "Fulbaria", "Phulpur", "Gafargaon", "Nandail", "Bhaluka", "Kishoreganj"
    ],
    Noakhali: [
      "Begumganj", "Chatkhil", "Companiganj", "Senbagh", "Haimchar", "Noakhali Sadar", "Chhagalnaiya"
    ],
    Madaripur: [
      "Madaripur Sadar", "Shibchar", "Rajoir", "Kalkini", "Lohajang"
    ],
    Shariatpur: [
      "Shariatpur Sadar", "Naria", "Gosairhat", "Bhedarganj", "Zinzira", "Chandpur"
    ],
    Chuadanga: [
      "Chaudanga", "Maheshpur", "Shyamnagar", "Bhandaria", "Khanjahan Ali", "Bagerhat"
    ],
    Sunamganj: [
      "Jagannathpur", "Chhatak", "Dasmina", "Shalla", "Sadar", "Moulvibazar"
    ],
    Bogura: [
      "Sadar", "Sherpur", "Shibganj", "Gabtali", "Kahaloo", "Khetlal", "Dhunat", "Nandigram"
    ]
};

const Search = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [searchClicked, setSearchClicked] = useState(false); // Track if the search button is clicked

  // Fetch all donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['DonationRequests'],
    queryFn: async () => {
      const response = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/donation-requests`, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const handleSearch = () => {
    setSearchClicked(true); // Set to true to trigger data filtering
    queryClient.invalidateQueries(['DonationRequests']); // Refetch with new filters
  };

  // Filter data based on search criteria
  const filteredRequests = requests.filter((request) => {
    const matchesBloodGroup = bloodGroup ? request.bloodGroup === bloodGroup : true;
    const matchesDistrict = district ? request.recipientDistrict === district : true;
    const matchesUpazila = upazila ? request.recipientUpazila === upazila : true;

    return matchesBloodGroup && matchesDistrict && matchesUpazila;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Search Blood Donation </title>
      </Helmet>
      <div className="py-8">
        <div className="flex items-center mb-6 justify-center">
          <FaSearch className="text-red-600 mr-3" size={30} />
          <h2 className="text-3xl font-semibold leading-tight text-gray-800">Search for Blood Donation Requests</h2>
        </div>

        {/* Card container */}
        <div className="flex justify-center mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
            {/* Card Header */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Search Donors</h2>
            </div>

            {/* Search Form */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                {/* Blood Group Dropdown */}
                <div className="w-full">
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-600 mb-2">Blood Group</label>
                  <select
                    id="bloodGroup"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                {/* District Dropdown */}
                <div className="w-full">
                  <label htmlFor="district" className="block text-sm font-medium text-gray-600 mb-2">District</label>
                  <select
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select District</option>
                    {Object.keys(districtsAndUpazilas).map((districtName) => (
                      <option key={districtName} value={districtName}>{districtName}</option>
                    ))}
                  </select>
                </div>

                {/* Upazila Dropdown */}
                <div className="w-full">
                  <label htmlFor="upazila" className="block text-sm font-medium text-gray-600 mb-2">Upazila</label>
                  <select
                    id="upazila"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={!district}
                  >
                    <option value="">Select Upazila</option>
                    {district && districtsAndUpazilas[district]?.map((upazilaName) => (
                      <option key={upazilaName} value={upazilaName}>{upazilaName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        
        {searchClicked && filteredRequests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
            {/* Display filtered requests in cards */}
            {paginatedRequests.map((request) => (
              <div key={request._id} className="bg-white shadow-lg rounded-lg items-center overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{request.recipientName}</h3>
                  <p className="text-gray-600">Blood Group: {request.bloodGroup}</p>
                  <p className="text-gray-600">District: {request.recipientDistrict}</p>
                  <p className="text-gray-600">Upazila: {request.recipientUpazila}</p>
                  <p className="text-gray-600">Hospital: {request.hospitalName}</p>
                  <p className="text-gray-600">Address: {request.fullAddress}</p>
                  <p className="text-gray-600">Donation Date: {new Date(request.donationDate).toLocaleDateString()}</p>
                  <p className="text-gray-600">Donation Time: {request.donationTime}</p>
                  <p className="text-gray-600">Message: {request.requestMessage}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show message if no results found */}
        {searchClicked && filteredRequests.length === 0 && (
          <div className="mt-4 text-center text-gray-500">No donation requests found matching the criteria.</div>
        )}

        {/* Pagination controls */}
        {searchClicked && totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
