import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BloodDonate | Donate your blood</title>
      </Helmet>

      {/* Banner Section */}
      <section className="bg-blue-600 text-white text-center py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Join as a Donor and Save Lives</h1>
        <p className="mb-8 text-lg sm:text-xl">Together, we can make a difference. Become a blood donor today.</p>
        <div className="space-x-4 flex justify-center">
          <Link to="/registration">
            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md">
              Join as a Donor
            </button>
          </Link>
          <Link to="/search">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Search Donors
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Why Donate Blood?</h2>
          <p className="text-lg sm:text-xl mt-4">Every donation counts. Your blood could save a life in need. Here's why donating blood is important:</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Save Lives</h3>
            <p className="mt-4 text-gray-700">Your donation can help save someone’s life in critical need of blood.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Help Your Community</h3>
            <p className="mt-4 text-gray-700">Contribute to your community and ensure that blood is always available in hospitals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Easy and Safe</h3>
            <p className="mt-4 text-gray-700">Donating blood is a simple and safe process that only takes a few minutes.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-12 px-6 bg-blue-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Contact Us</h2>
          <p className="text-lg sm:text-xl mt-4">Have any questions or need assistance? Reach out to us!</p>
        </div>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Your message"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Send Message
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-lg font-semibold">Or call us at: <span className="text-blue-600">1-800-123-4567</span></p>
        </div>
      </section>
    </div>
  )
}

export default Home
