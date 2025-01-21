import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../Hoooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload } from '../Api/utils'

const Registration = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()

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

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const image = form.image.files[0];
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    // Password match validation
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    // 1. Send image data to imageBB
    const photoURL = await imageUpload(image);

    try {
      // 2. User Registration
      const result = await createUser(email, password);

      // 3. Save username, profile photo, and additional information
      await updateUserProfile(name, photoURL);

      // 4. Save user info (including blood group, district, and upazila)
      const user = { name, email, bloodGroup, district, upazila, role: 'donor' };
      // You can save this data to your database here

      console.log(result);

      // Redirect to home page after successful registration
      navigate('/');

      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      // User Registration using Google
      const data = await signInWithGoogle();
      await saveUser(data?.user); // Save the Google user data to your database
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-red-600">Donation Blood</h1>
          <p className="text-sm text-gray-400">Welcome to the Blood Donation Platform</p>
        </div>
        <form onSubmit={handleSubmit} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm text-gray-700">
                Select Avatar Image:
              </label>
              <input required type="file" id="image" name="image" accept="image/*" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block mb-2 text-sm text-gray-700">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                id="bloodGroup"
                className="w-full px-3 py-2 border rounded-md border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900"
                required
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label htmlFor="district" className="block mb-2 text-sm text-gray-700">
                District
              </label>
              <select
                name="district"
                id="district"
                className="w-full px-3 py-2 border rounded-md border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900"
                onChange={handleDistrictChange}
                required
              >
                <option value="">Select District</option>
                {Object.keys(districtsAndUpazilas).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="upazila" className="block mb-2 text-sm text-gray-700">
                Upazila
              </label>
              <select
                name="upazila"
                id="upazila"
                className="w-full px-3 py-2 border rounded-md border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900"
                required
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upazila) => (
                  <option key={upazila} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900"
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none"
              disabled={loading}
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-600 hover:underline"
              >
                Login here
              </Link>
            </p>
            <div className="flex items-center justify-between">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-500"></div>
              <p className="px-4 text-sm text-gray-400">or</p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-500"></div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 bg-white rounded-lg border py-2 px-4 w-full hover:bg-gray-100"
              >
                <FcGoogle />
                Sign Up with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
