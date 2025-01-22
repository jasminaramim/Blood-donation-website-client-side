import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import coverImg from '../../../assets/images/27577819_ravi24_may_8.jpg';
import useAuth from '../../../Hoooks/useAuth';
import useRole from '../../../Hoooks/useRole';
import useStatus from '../../../Hoooks/useStatus'; // Assuming useStatus hook is available
import LoadingSpinner from '../../../Shared/LoadingSpinner';
import { FaTint } from 'react-icons/fa'; // Import the blood drop icon from React Icons

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [status, isStatusLoading] = useStatus(); // Fetch status here
  const [isEditable, setIsEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: user?.displayName,
    email: user?.email,
    address: user?.address || '',
    bloodGroup: user?.bloodGroup || '',
  });

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    // Save the updated data to the database
    console.log('Saving updated data:', updatedData);
    setIsEditable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  if (loading || isRoleLoading || isStatusLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen bg-red-50">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          {/* Display the Role */}
          <p className="p-2 px-4 text-xs text-white bg-red-500 rounded-full">
            {role?.role} {/* Assuming 'role' is an object with a 'role' property */}
          </p>

          {/* Display the Status */}
          <p className="p-2 px-4 text-xs text-white bg-blue-500 rounded-full mt-2">
            {status?.status || 'Loading...'} {/* Adjust to ensure a string is rendered */}
          </p>

          <div className="mt-2 flex items-center justify-center">
            <FaTint className="text-red-500 mr-2" size={20} />
            <p className="text-xl font-medium text-gray-800">
              Blood Group: {updatedData.bloodGroup || 'N/A'}
            </p>
          </div>

          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <button
                onClick={handleEditClick}
                className="bg-red-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-red-700 block mb-1"
              >
                Edit Profile
              </button>

              <form className="w-full space-y-4 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedData.name}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={updatedData.email}
                    disabled
                    className="p-2 border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                {/* <div className="flex flex-col">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={updatedData.address}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div> */}
                {/* <div className="flex flex-col">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <input
                    type="text"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={updatedData.bloodGroup}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div> */}

                {isEditable && (
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="bg-red-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-red-700"
                  >
                    Save Changes
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
