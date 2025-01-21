import React, { useState } from 'react';
import useAuth from '../Hoooks/useAuth'; // Hook to fetch user info
import { toast } from 'react-hot-toast'; // Toast for notifications
import useAxiosSecure from '../Hoooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AddBloodForm = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Fetching user info dynamically

  // Districts and Upazilas data
  const districtsAndUpazilas = {
    Dhaka: [
      "Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Demra", "Tongi", "Shibpur", "Siddhirganj", "Narayanganj"
    ],
    Chittagong: [
      "Patiya", "Sitakunda", "Boalkhali", "Rangunia", "Anwara", "Fatikchhari", "Mirsharai", "Lohagara", "Banshkhali", "Sandwip"
    ],
    Rajshahi: [
      "Paba", "Durgapur", "Charghat", "Bagha", "Mohonpur", "Tanore", "Godagari", "Shibganj", "Niamatpur"
    ],
    Khulna: [
      "Batiaghata", "Dacope", "Dumuria", "Koyra", "Terokhada", "Paikgachha", "Kalaroa", "Shyamnagar", "Assasuni"
    ],
    Barishal: [
      "Bakerganj", "Barisal Sadar", "Agailjhara", "Muladi", "Banaripara", "Wazirpur", "Gournadi", "Uzirpur", "Kalapara"
    ],
    Sylhet: [
      "Moulvibazar", "Rajnagar", "Juri", "Kulaura", "Sreemangal", "Fenchuganj", "Balaganj", "Gowainghat", "Companiganj"
    ],
    Rangpur: [
      "Kurigram", "Gaibandha", "Lalmonirhat", "Nilphamari", "Rangpur Sadar", "Kachdana", "Pirganj", "Pirgachha", "Badarganj"
    ],
    Khagrachari: [
      "Dighinala", "Lakshmipur", "Manikchhari", "Mahalchhari", "Madhupur", "Mohalchhari", "Khagrachhari Sadar"
    ],
    Comilla: [
      "Laksam", "Titas", "Muradnagar", "Debidwar", "Monohorgonj", "Kamalnagar", "Comilla Sadar", "Nangalkot"
    ],
    Jessore: [
      "Abhaynagar", "Chaugachha", "Keshabpur", "Jessore Sadar", "Benapole", "Shashibhushon", "Bagherpara", "Jhikargachha"
    ],
    Mymensingh: [
      "Mymensingh Sadar", "Trishal", "Haluaghat", "Fulbaria", "Phulpur", "Gafargaon", "Nandail", "Bhaluka", "Kishoreganj"
    ],
    Noakhali: [
      "Begumganj", "Chatkhil", "Companiganj", "Senbagh", "Haimchar", "Noakhali Sadar", "Chhagalnaiya"
    ],
    Madaripur: [
      "Madaripur Sadar", "Shibchar", "Rajoir", "Kalkini", "Lohajang"
    ],
    Shariatpur: [
      "Shariatpur Sadar", "Naria", "Gosairhat", "Bhedarganj", "Zinzira", "Chandpur"
    ],
    Chuadanga: [
      "Chaudanga", "Maheshpur", "Shyamnagar", "Bhandaria", "Khanjahan Ali", "Bagerhat"
    ],
    Sunamganj: [
      "Jagannathpur", "Chhatak", "Dasmina", "Shalla", "Sadar", "Moulvibazar"
    ],
    Bogura: [
      "Sadar", "Sherpur", "Shibganj", "Gabtali", "Kahaloo", "Khetlal", "Dhunat", "Nandigram"
    ]
    // Add more districts and upazilas as necessary
  };

  const [district, setDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);

  // Handle district selection to update upazilas
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setUpazilas(districtsAndUpazilas[selectedDistrict] || []);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      recipientDistrict: form.district.value,
      recipientUpazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: 'Pending', // Default status
    };

    try {
      // Send donation request to the backend via secure Axios request
      const response = await axiosSecure.post('/donation-requests', donationRequest);

      if (response.status === 200) {
        toast.success('Donation request created successfully!');
        form.reset();
        navigate('/dashboard/My-donation-request');
      } else {
        toast.error('Error creating donation request.');
      }
    } catch (error) {
      console.error('Error submitting the donation request:', error);
      toast.error('Failed to create donation request.');
    }
  };

  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <Helmet>
        <title>Create Donation Requests</title>
      </Helmet>
      <form onSubmit={handleSubmit} className='space-y-6 w-full max-w-3xl p-6 bg-white rounded shadow'>
        <h2 className='text-2xl font-bold text-center mb-4'>Create Donation Request</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Requester Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Requester Name</label>
            <input
              type='text'
              name='requesterName'
              value={user?.displayName || ''}
              readOnly
              className='w-full px-4 py-2 border rounded bg-gray-200 text-gray-800'
            />
          </div>

          {/* Requester Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Requester Email</label>
            <input
              type='email'
              name='requesterEmail'
              value={user?.email || ''}
              readOnly
              className='w-full px-4 py-2 border rounded bg-gray-200 text-gray-800'
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Recipient Name</label>
            <input
              type='text'
              name='recipientName'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
              placeholder='Recipient Name'
            />
          </div>

          {/* District */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Recipient District</label>
            <select
              name='district'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
              onChange={handleDistrictChange}
            >
              <option value=''>Select District</option>
              {Object.keys(districtsAndUpazilas).map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Recipient Upazila</label>
            <select
              name='upazila'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
              disabled={!upazilas.length}
            >
              <option value=''>Select Upazila</option>
              {upazilas.map((upa) => (
                <option key={upa} value={upa}>
                  {upa}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Hospital Name</label>
            <input
              type='text'
              name='hospitalName'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
              placeholder='Hospital Name'
            />
          </div>

          {/* Full Address */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Full Address</label>
            <textarea
              name='fullAddress'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
              placeholder='Full Address'
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Blood Group</label>
            <select
              name='bloodGroup'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
            >
              <option value=''>Select Blood Group</option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='O+'>O+</option>
              <option value='O-'>O-</option>
              <option value='AB+'>AB+</option>
              <option value='AB-'>AB-</option>
            </select>
          </div>

          {/* Donation Date */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Donation Date</label>
            <input
              type='date'
              name='donationDate'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
            />
          </div>

          {/* Donation Time */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Donation Time</label>
            <input
              type='time'
              name='donationTime'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
            />
          </div>

          {/* Request Message */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Request Message</label>
            <textarea
              name='requestMessage'
              required
              className='w-full px-4 py-2 border rounded bg-white text-gray-800'
              placeholder='Additional message (optional)'
            />
          </div>
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Submit Donation Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBloodForm;
