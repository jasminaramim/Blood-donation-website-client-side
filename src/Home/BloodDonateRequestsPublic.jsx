import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hoooks/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
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

            {pendingRequests.length === 0 ? (
                <p className="text-center">No pending donation requests available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingRequests.map((request) => (
                        <div
                            key={request.id}
                            className=" border rounded-lg shadow-md bg-red-300/60 hover:shadow-lg group"

                            data-aos="flip-left"
                        >
                            <div className="absolute  bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>

                            {/* <div className="p-6  rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"> */}
                                {/* Animated Bottom Border on Hover */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>

                                <h2 className="font-semibold p-4 text-gray-800 text-2xl text-center border-b mb-4">{request.recipientName}</h2>

                               
                                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                                 
                                    <div className="bg-red-400/30 text-white p-4  shadow-sm">
                                        <p className="text-lg font-bold">
                                            Blood Group: <span className="text-xl">{request.bloodGroup}</span>
                                        </p>
                                        <p className="text-sm opacity-90">📍 {request.fullAddress}</p>
                                    </div>

                                    <div className="bg-red-300 text-red-900 p-4  shadow-sm">
                                        <p className="text-lg font-bold">📅 Date: {request.donationDate}</p>
                                        <p className="text-sm opacity-90">⏰ Time: {request.donationTime}</p>
                                    </div>

                                </div>
                                <div className="mt-4 p-4">
                                    <Link
                                        className="px-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition duration-300"
                                        to={`/donation-request-details/${request._id}`}
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>



                        // </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BloodDonateRequestsPublic;
