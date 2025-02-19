// import React, { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import coverImg from "../../../assets/images/27577819_ravi24_may_8.jpg";
// import useAuth from "../../../Hoooks/useAuth";
// import useRole from "../../../Hoooks/useRole";
// import useStatus from "../../../Hoooks/useStatus";
// import LoadingSpinner from "../../../Shared/LoadingSpinner";
// import { FaTint, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

// const Profile = () => {
//   const { user, loading } = useAuth();
//   const [role, isRoleLoading] = useRole();
//   const [status, isStatusLoading] = useStatus();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // User data with fallback values
//   const [updatedData, setUpdatedData] = useState({
//     name: user?.displayName || "N/A",
//     email: user?.email || "N/A",
//     phone: user?.phoneNumber || "N/A",
//     address: user?.address || "Not Provided",
//     bloodGroup: user?.bloodGroup || "Unknown",
//     image: user?.photoURL || "https://via.placeholder.com/100",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   const handleSaveClick = () => {
//     console.log("Saving updated data:", updatedData);
//     setIsModalOpen(false);
//   };

//   if (loading || isRoleLoading || isStatusLoading) return <LoadingSpinner />;

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-cover bg-center relative "
//       style={{ backgroundImage: `url(${coverImg})` }}
//     >
//       <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay */}
//       <Helmet>
//         <title>Profile</title>
//       </Helmet>
//       <div className="bg-gray-300/80 bg-opacity-90 shadow-lg border rounded-2xl w-full lg:max-w-xl relative z-10">
//         <img src={coverImg} alt="Cover" className="w-full p-4 rounded-lg h-40 object-cover" />
//         <div className="flex flex-col items-center -mt-16">
//           <img src={updatedData.image} alt="Profile" className="h-24 w-24 rounded-full border-4 border-white shadow-md" />
//           <p className="mt-2 text-xl font-semibold text-gray-800">{updatedData.name}</p>
//           <p className="text-gray-600">{role?.role || "User"}</p>
//           <p className="text-xs px-3 py-1 mt-1 text-white bg-green-500 rounded-full">{status?.status || "Loading..."}</p>
//         </div>

//         <div className="flex py-4">
//           <div className="bg-red-300 w-2/4 p-2">
//             <div className="flex items-center space-x-2 text-gray-700">
//               <FaEnvelope className="text-red-500" /> <p>{updatedData.email}</p>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-700 mt-2">
//               <FaPhoneAlt className="text-red-500" /> <p>{updatedData.phone}</p>
//             </div>
//           </div>
//           <div className="bg-red-400 w-2/4 p-2">
//             <div className="flex items-center space-x-2 text-gray-700 mt-2">
//               <FaMapMarkerAlt className="text-red-500" /> <p>{updatedData.address}</p>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-700 mt-2">
//               <FaTint className="text-red-500" /> <p>Blood Group: {updatedData.bloodGroup}</p>
//             </div>
//           </div>
//         </div>

//         {/* Edit Button */}
//         <div className="p-4 flex justify-center">
//           <button onClick={() => setIsModalOpen(true)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//             <div className="flex flex-col">
//               <label className="text-gray-600">Name</label>
//               <input type="text" name="name" value={updatedData.name} onChange={handleChange} className="p-2 border rounded-md" />
//             </div>
//             <div className="flex flex-col mt-3">
//               <label className="text-gray-600">Phone</label>
//               <input type="text" name="phone" value={updatedData.phone} onChange={handleChange} className="p-2 border rounded-md" />
//             </div>
//             <div className="flex flex-col mt-3">
//               <label className="text-gray-600">Address</label>
//               <input type="text" name="address" value={updatedData.address} onChange={handleChange} className="p-2 border rounded-md" />
//             </div>
//             <div className="mt-4 flex justify-between">
//               <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
//               <button onClick={handleSaveClick} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">Save Changes</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;




import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/images/27577819_ravi24_may_8.jpg";
import useAuth from "../../../Hoooks/useAuth";
import useRole from "../../../Hoooks/useRole";
import useStatus from "../../../Hoooks/useStatus";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaTint, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [status, isStatusLoading] = useStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // User data with fallback values
  const [updatedData, setUpdatedData] = useState({
    name: user?.displayName || "N/A",
    email: user?.email || "N/A",
    phone: user?.phoneNumber || "N/A",
    address: user?.address || "Not Provided",
    bloodGroup: user?.bloodGroup || "Unknown",
    image: user?.photoURL || "https://via.placeholder.com/100",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSaveClick = () => {
    console.log("Saving updated data:", updatedData);
    setIsModalOpen(false);
  };

  if (loading || isRoleLoading || isStatusLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center relative px-4 sm:px-6" style={{ backgroundImage: `url(${coverImg})` }}>
      {/* <div className=" inset-0 bg-black opacity-20"></div> Dark overlay */}
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="bg-gray-300 shadow-lg border rounded-2xl w-full max-w-lg sm:max-w-xl  p-4">
        <img src={coverImg} alt="Cover" className="w-full rounded-lg h-40 object-cover" />

        {/* Profile Details */}
        <div className="flex flex-col items-center -mt-16">
          <img src={updatedData.image} alt="Profile" className="h-24 w-24 rounded-full border-4 border-white shadow-md" />
          <p className="mt-2 text-xl font-semibold text-gray-800">{updatedData.name}</p>
          <p className="text-gray-600">{role?.role || "User"}</p>
          <p className="text-xs px-3 py-1 mt-1 text-white bg-green-500 rounded-full">{status?.status || "Loading..."}</p>
        </div>

        {/* User Information */}
        <div className="flex flex-wrap justify-between py-4 gap-2">
          <div className="bg-red-300 w-full sm:w-[48%] p-2 rounded-md">
            <div className="flex items-center space-x-2 text-gray-700">
              <FaEnvelope className="text-red-500" /> <p>{updatedData.email}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 mt-2">
              <FaPhoneAlt className="text-red-500" /> <p>{updatedData.phone}</p>
            </div>
          </div>
          <div className="bg-red-400 w-full sm:w-[48%] p-2 rounded-md">
            <div className="flex items-center space-x-2 text-gray-700 mt-2">
              <FaMapMarkerAlt className="text-red-500" /> <p>{updatedData.address}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 mt-2">
              <FaTint className="text-red-500" /> <p>Blood Group: {updatedData.bloodGroup}</p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="p-4 flex justify-center">
          <button onClick={() => setIsModalOpen(true)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm sm:max-w-md shadow-lg max-h-screen overflow-auto">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="flex flex-col">
              <label className="text-gray-600">Name</label>
              <input type="text" name="name" value={updatedData.name} onChange={handleChange} className="p-2 border rounded-md w-full" />
            </div>
            <div className="flex flex-col mt-3">
              <label className="text-gray-600">Phone</label>
              <input type="text" name="phone" value={updatedData.phone} onChange={handleChange} className="p-2 border rounded-md w-full" />
            </div>
            <div className="flex flex-col mt-3">
              <label className="text-gray-600">Address</label>
              <input type="text" name="address" value={updatedData.address} onChange={handleChange} className="p-2 border rounded-md w-full" />
            </div>
            <div className="mt-4 flex justify-between">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
              <button onClick={handleSaveClick} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
