import { FaUserAlt, FaDollarSign, FaTint } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import useRole from '../../../Hoooks/useRole'; 
import { Calendar } from 'react-date-range';

const VolunteerDashboard = () => {
  const axiosSecure = useAxiosSecure();


  const [role, isRoleLoading] = useRole();  


  const { data: requests = [] } = useQuery({
    queryKey: ['DonationRequests'],
    queryFn: async () => {
      const response = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/donation-requests`, {
        withCredentials: true,
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });


  const totalDonationRequests = requests.length;

 
  if (isRoleLoading) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="px-6 py-8 bg-red-100">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-700">Welcome to the VolunteerDashboard 🏠</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage and track statistics for donors, funds, and blood donation requests.
        </p>
      </div>

      {/* Featured Cards */}
      <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Donors */}
        <div className="relative flex flex-col bg-red-500 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
          <div className="absolute -mt-8 -ml-2 bg-gradient-to-tr from-red-600 to-red-400 text-white shadow-lg h-16 w-16 grid place-items-center rounded-full">
            <FaUserAlt className="w-6 h-6" />
          </div>
          <div className="ml-20">
            <p className="text-sm font-medium text-gray-200">Total Donors</p>
            <h4 className="text-3xl font-semibold">{role?.role?.length}</h4>
          </div>
        </div>

        {/* Total Funding */}
        <div className="relative flex flex-col bg-red-500 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
          <div className="absolute -mt-8 -ml-2 bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-lg h-16 w-16 grid place-items-center rounded-full">
            <FaDollarSign className="w-6 h-6" />
          </div>
          <div className="ml-20">
            <p className="text-sm font-medium text-gray-200">Total Funding</p>
            <h4 className="text-3xl font-semibold">$120</h4>
          </div>
        </div>

        {/* Total Blood Donation Requests */}
        <div className="relative flex flex-col bg-red-500 text-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
          <div className="absolute -mt-8 -ml-2 bg-gradient-to-tr from-red-800 to-red-600 text-white shadow-lg h-16 w-16 grid place-items-center rounded-full">
            <FaTint className="w-6 h-6" />
          </div>
          <div className="ml-20">
            <p className="text-sm font-medium text-gray-200">Blood Donation Requests</p>
            <h4 className="text-3xl font-semibold">{totalDonationRequests}</h4>
          </div>
        </div>
      </div>

      {/* Charts and Calendar */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Sales/Statistics Chart */}
        {/* Placeholder for a chart */}
        {/* <div className="relative bg-white shadow-md rounded-xl p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800">Statistics Overview</h3>
          <div className="mt-4 h-64 bg-gray-100 flex items-center justify-center rounded-md">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div> */}

        {/* Calendar */}
        <div className="relative bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800">Calendar</h3>
          <div className="mt-4">
            <Calendar color="#FF3B3F" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
