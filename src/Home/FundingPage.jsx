import React, { useState, Fragment } from 'react';
import { FaTint } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import  useAuth  from '../Hoooks/useAuth'; // Import the custom hook

const FundingPage = () => {
  const { user, authToken } = useAuth(); // Access user and token from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGiveFundClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDonationAmount(0); // Reset donation amount when closing the modal
    setError(''); // Clear error message
  };

  const handleDonate = async () => {
    if (donationAmount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
  
    setLoading(true);
    try {
      // Create the donation data with just the amount
      const donationData = {
        amount: donationAmount,
        donationDate: new Date().toISOString(),
      };
  
      // Post the donation data to the backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/donations`, donationData, {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Use the token from context for authentication
        },
      });
  
      // Handle the response from the backend
      if (response.data.success) {
        alert('Donation successful!');
        closeModal();
      } else {
        alert('Donation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error making donation:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FaTint className="text-4xl text-red-700" />
          <h3 className="text-xl font-semibold text-red-700">Blood Donation Fund</h3>
        </div>

        {/* Display User Info */}
        <div className="mb-4 text-gray-700">
          <p className="text-sm">Donor: {user?.userName || 'Guest'}</p>
          <p className="text-sm">Email: {user?.userEmail || 'Not logged in'}</p>
        </div>

        <p className="text-gray-700 mb-4">
          Your donation helps provide life-saving blood to those in need. Every drop makes a difference! Join us in making a meaningful impact and support those who require blood donations.
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleGiveFundClick}
            className="px-6 py-2 bg-red-700 text-white rounded-full hover:bg-red-600"
          >
            Give Fund
          </button>
        </div>
      </div>

      {/* Modal for Donation Amount and Donation Button */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-gray-900"
                  >
                    Complete Your Donation
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please enter the amount you would like to donate:
                    </p>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="mt-2 p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                      placeholder="Donation Amount"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={handleDonate}
                      className={`px-6 py-2 bg-green-700 text-white rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Donate'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FundingPage;
