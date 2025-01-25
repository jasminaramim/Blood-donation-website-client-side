import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hoooks/useAxiosSecure";

const BloodDonateRequestsPublic = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch all donation requests
  const { data: donationRequests = [], isLoading, error } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const { data } = await axiosSecure("/donation-requests");
      return data;
    },
  });


  console.log("All Donation Requests:", donationRequests);

  // Filter pending requests
  const pendingRequests = donationRequests.filter(
    (request) => request.status === "Pending"
  );

  // Log pending requests to verify the status
  console.log("Pending Donation Requests:", pendingRequests);

  // Error handling
  if (error) {
    return <div>Error fetching donation requests: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading donation requests...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Pending Donation Requests</h1>
      {pendingRequests.length === 0 ? (
        <p className="text-center">No pending donation requests available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg"
            >
              <h2 className="font-semibold text-lg">{request.recipientName}</h2>
              <p>Blood Group: <strong>{request.bloodGroup}</strong></p>
              <p>Location: {request.location}</p>
              <p>Date: {request.date}</p>
              <p>Time: {request.time}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => navigate(`/donation-request-details/${request.id}`)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodDonateRequestsPublic;
