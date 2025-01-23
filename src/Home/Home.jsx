import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PublishedBlogs from "./PublishedBlogs";
import bgimg from "../assets/images/25989592_7127260.jpg";
import Typewriter from "typewriter-effect";
const REGISTRATION_URL = "/signup";
const SEARCH_URL = "/search";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BloodDonate | Donate your blood</title>
      </Helmet>

      {/* Banner Section */}
      <section
  className="relative text-white text-center py-12 px-4"
  style={{
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-60"></div>

  {/* Banner Content */}
  <div className="relative lg:mt-28 container mx-auto flex flex-col items-center justify-center space-y-6">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-300">
      <Typewriter
        options={{
          strings: [
            "Join as a Donor and Save Lives",
            "Together, We Can Make a Difference",
            "Become a Blood Donor Today",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </h1>
    <p className="text-lg sm:text-xl lg:text-2xl max-w-lg mx-auto text-white opacity-90">
      Together, we can make a difference. Become a blood donor today and help save lives in your community.
    </p>
    <div className="flex flex-wrap justify-center space-x-4">
      <Link to={REGISTRATION_URL}>
        <button
          aria-label="Join as a donor"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-700 border text-white text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Join as a Donor
        </button>
      </Link>
      <Link to={SEARCH_URL}>
        <button
          aria-label="Search for donors"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-600 hover:bg-yellow-700 border text-white text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Search Donors
        </button>
      </Link>
    </div>
  </div>
</section>



      {/* Published Blogs Section */}
      <section>
        <PublishedBlogs />
      </section>

      {/* Featured Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Why Donate Blood?</h2>
          <p className="text-lg sm:text-xl mt-4">
            Every donation counts. Your blood could save a life in need. Here's
            why donating blood is important:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Save Lives",
              text: "Your donation can help save someone’s life in critical need of blood.",
            },
            {
              title: "Help Your Community",
              text: "Contribute to your community and ensure that blood is always available in hospitals.",
            },
            {
              title: "Easy and Safe",
              text: "Donating blood is a simple and safe process that only takes a few minutes.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-12 px-6 bg-blue-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Contact Us</h2>
          <p className="text-lg sm:text-xl mt-4">
            Have any questions or need assistance? Reach out to us!
          </p>
        </div>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form>
            {[
              {
                id: "name",
                label: "Your Name",
                type: "text",
                placeholder: "Enter your name",
              },
              {
                id: "email",
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
              },
              {
                id: "message",
                label: "Message",
                type: "textarea",
                placeholder: "Your message",
                rows: 4,
              },
            ].map((field) => (
              <div className="mb-4" key={field.id}>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder={field.placeholder}
                    rows={field.rows}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder={field.placeholder}
                    required
                  />
                )}
              </div>
            ))}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-lg font-semibold">
            Or call us at: <span className="text-blue-600">1-800-123-4567</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
