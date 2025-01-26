import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hoooks/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

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

    // Log all donation requests to check if the data is correctly fetched
    console.log("All Donation Requests:", donationRequests);

    // Filter pending requests
    const pendingRequests = donationRequests.filter(
        (request) => request.status === "Pending"
    );

    // Log pending requests to verify the status
    console.log("Pending Donation Requests:", pendingRequests);

    // Initialize AOS when the component mounts
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

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
                            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg group"
                            data-aos="flip-left"
                        >
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>
                            <h2 className="font-semibold text-lg">{request.recipientName}</h2>
                            <p>Blood Group: <strong>{request.bloodGroup}</strong></p>
                            <p>Location: {request.fullAddress}</p>
                            <p>Date: {request.donationDate}</p>
                            <p>Time: {request.donationTime}</p>
                            <Link
                                className="mt-4   text-red-600 rounded-md hover:bg-red-400 hover:text-red-700"
                                to={`/donation-request-details/${request._id}`}
                            >
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BloodDonateRequestsPublic;
