import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../Hoooks/useAuth";
// import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const DonationRequestsDetails = () => {
  const { id } = useParams();
  const [donationRequest, setDonationRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  
  const { user } = useAuth();  
  const [donorName, setDonorName] = useState(user?.name || ""); 
  const [donorEmail, setDonorEmail] = useState(user?.email || ""); 

  useEffect(() => {
    const fetchDonationRequestDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
        );
        setDonationRequest(response.data);
      } catch (error) {
        console.error("Error fetching donation request:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonationRequestDetails();
  }, [id]);

  const handleDonate = async () => {
    try {
      // Change the status to "InProgress"
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
        {
          status: "InProgress",
          donorName,
          donorEmail,
        }
      );
      // Close the modal after donation is confirmed
      setModalOpen(false);
    } catch (error) {
      console.error("Error confirming donation:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!donationRequest) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Donation request not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full overflow-hidden">
        <div className="text-center p-6">
          <h1 className="text-3xl font-semibold text-red-600">
            Donation Request Details
          </h1>

          {/* Requester Information */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-gray-700">
              Requester Information
            </h2>
            <p className="text-gray-600 mt-2">
              <strong>Name:</strong> {donationRequest.requesterName}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {donationRequest.requesterEmail}
            </p>
          </div>

          {/* Recipient Information */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-gray-700">
              Recipient Information
            </h2>
            <p className="text-gray-600 mt-2">
              <strong>Name:</strong> {donationRequest.recipientName}
            </p>
            <p className="text-gray-600">
              <strong>District:</strong> {donationRequest.recipientDistrict}
            </p>
            <p className="text-gray-600">
              <strong>Upazila:</strong> {donationRequest.recipientUpazila}
            </p>
            <p className="text-gray-600">
              <strong>Hospital Name:</strong> {donationRequest.hospitalName}
            </p>
            <p className="text-gray-600">
              <strong>Full Address:</strong> {donationRequest.fullAddress}
            </p>
          </div>

          {/* Donation Details */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-gray-700">
              Donation Details
            </h2>
            <p className="text-gray-600 mt-2">
              <strong>Blood Group:</strong> {donationRequest.bloodGroup}
            </p>
            <p className="text-gray-600">
              <strong>Donation Date:</strong> {donationRequest.donationDate}
            </p>
            <p className="text-gray-600">
              <strong>Donation Time:</strong> {donationRequest.donationTime}
            </p>
            <p className="text-gray-600">
              <strong>Request Message:</strong> {donationRequest.requestMessage}
            </p>
          </div>

          {/* Status */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-gray-700">Status</h2>
            <p className="text-gray-600 mt-2">
              <strong>Status:</strong> {donationRequest.status}
            </p>
          </div>

          {/* Donate Button */}
          <div className="mt-6">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Donate
            </button>
          </div>
        </div>
      </div>

      {/* Modal for donation confirmation */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-center mb-4">Confirm Donation</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Donor Name</label>
                <input
                  type="text"
                  value={donationRequest.requesterName} 
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Donor Email</label>
                <input
                  type="email"
                  value={donationRequest.requesterEmail} 
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDonate}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestsDetails;
