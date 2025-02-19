import { FaUserAlt, FaDollarSign, FaTint } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hoooks/useAxiosSecure';
import useRole from '../../../Hoooks/useRole';
import { Calendar } from 'react-date-range';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import welcome from '../../../assets/images/5481497_2769504-removebg-preview.png'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VolunteerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(true); 

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

  useEffect(() => {
    if (isRoleLoading) {
      setIsModalOpen(false); 
    }
  }, [isRoleLoading]);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Donations Over Time',
        data: [10, 20, 30, 40, 50],
        borderColor: 'rgba(255, 59, 63, 1)',
        backgroundColor: 'rgba(255, 59, 63, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Donation Trends Over the Year',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="bg-red-200 p-4">
      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-8 max-w-sm w-full">
      {/* Cute Welcome Image */}
      <div className="text-center mb-4">
        <img
          src={welcome} // Replace with your image URL
          alt="Welcome"
          className="w-[180px] h-[180px] mx-auto"
        />
      </div>

      <h2 className="text-xl font-bold text-center text-red-500">Welcome to the Dashboard!</h2>
      <p className="mt-4 text-center text-gray-600">
        We are happy to have you here. Manage and track your donation requests and funding efforts.
      </p>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-700">Welcome to the Volunteer Dashboard 🏠</h1>
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

      {/* Overview and Graphical Elements */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Line Chart for Donations */}
        <div className="relative bg-white shadow-md rounded-xl p-6 h-[390px]">
          <h3 className="text-lg font-semibold text-gray-800">Donation Trends</h3>
          <div className="mt-4 w-full h-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Calendar */}
        <div className="relative bg-white w-[350px] shadow-md rounded-xl p-6 h-96">
          <h3 className="text-lg font-semibold text-gray-800">Calendar</h3>
          <div className="mt-4">
            <Calendar className="w-[300px]" color="#FF3B3F" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
