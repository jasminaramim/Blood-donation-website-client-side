import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../Hoooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload } from '../Api/utils'

const Registration = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const confirmPassword = form.confirm_password.value
    const image = form.image.files[0]
    const bloodGroup = form.bloodGroup.value
    const district = form.district.value
    const upazila = form.upazila.value

    // Password match validation
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    // 1. Send image data to imageBB
    const photoURL = await imageUpload(image)

    try {
      // 2. User Registration
      const result = await createUser(email, password)

      // 3. Save username, profile photo, and additional information
      await updateUserProfile(name, photoURL)

      // 4. Save user info (including blood group, district, and upazila)
      const user = { name, email, bloodGroup, district, upazila, role: 'donor' }
      // You can save this data to your database here

      console.log(result)

      // Redirect to home page after successful registration
      navigate('/')

      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      // User Registration using Google
      const data = await signInWithGoogle()
      await saveUser(data?.user) // Save the Google user data to your database
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to PlantNet</p>
        </div>
        <form onSubmit={handleSubmit} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Avatar Image:
              </label>
              <input required type="file" id="image" name="image" accept="image/*" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block mb-2 text-sm">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                id="bloodGroup"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
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
              <label htmlFor="district" className="block mb-2 text-sm">
                District
              </label>
              <select
                name="district"
                id="district"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                {/* Add more districts as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="upazila" className="block mb-2 text-sm">
                Upazila
              </label>
              <select
                name="upazila"
                id="upazila"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              >
                <option value="Upazila 1">Upazila 1</option>
                <option value="Upazila 2">Upazila 2</option>
                {/* Add more upazilas as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">Signup with social accounts</p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Registration
