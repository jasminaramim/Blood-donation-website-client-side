import { Calendar } from 'react-date-range';
import { FaUserAlt, FaDollarSign, FaTint } from 'react-icons/fa';

const AdminStatics = () => {
  return (
    <div className="px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Admin Dashboard 🏠</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage and track statistics for donors, funds, and blood donation requests.
        </p>
      </div>

      {/* Featured Cards */}
      <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Donors */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-4">
          <div className="absolute -mt-6 -ml-2 bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-lg h-16 w-16 grid place-items-center rounded-full">
            <FaUserAlt className="w-6 h-6" />
          </div>
          <div className="ml-20">
            <p className="text-sm font-medium text-gray-500">Total Donors</p>
            <h4 className="text-2xl font-semibold text-gray-800">10</h4>
          </div>
        </div>

        {/* Total Funding */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-4">
          <div className="absolute -mt-6 -ml-2 bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-lg h-16 w-16 grid place-items-center rounded-full">
            <FaDollarSign className="w-6 h-6" />
          </div>
          <div className="ml-20">
            <p className="text-sm font-medium text-gray-500">Total Funding</p>
            <h4 className="text-2xl font-semibold text-gray-800">$120</h4>
          </div>
        </div>

        {/* Total Blood Donation Requests */}
        <div className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-4">
          <div className="absolute -mt-6 -ml-2 bg-gradient-to-tr from-red-600 to-red-400 text-white shadow-lg h-16 w-16 grid place-items-center rounded-full">
            <FaTint className="w-6 h-6" />
          </div>
          <div className="ml-20">
            <p className="text-sm font-medium text-gray-500">Blood Donation Requests</p>
            <h4 className="text-2xl font-semibold text-gray-800">50</h4>
          </div>
        </div>
      </div>

      {/* Charts and Calendar */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Sales/Statistics Chart */}
        <div className="relative bg-white shadow-md rounded-xl p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800">Statistics Overview</h3>
          {/* Placeholder for a chart */}
          <div className="mt-4 h-64 bg-gray-100 flex items-center justify-center rounded-md">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="relative bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800">Calendar</h3>
          <div className="mt-4">
            <Calendar color="#4cc718" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatics;
