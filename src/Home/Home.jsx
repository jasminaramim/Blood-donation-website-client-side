import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PublishedBlogs from "./PublishedBlogs";
import bgimg from "../assets/images/25989592_7127260.jpg";
import Typewriter from "typewriter-effect";
import img1 from '../assets/images/bloodAvt.jpg'
import img2 from '../assets/images/19538555_6129019.jpg'
import img3 from '../assets/images/girl-posing-with-surprise-gift-white-wall.jpg'
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
const REGISTRATION_URL = "/signup";
const SEARCH_URL = "/search";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      once: false,    // Makes the animation repeat each time the element is in view
    });
    console.log('AOS initialized');
  }, []);
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
        <h2 className="text-3xl text-red-500 sm:text-4xl font-bold">
          <span className="border-b-2 text-red-700 border-red-800">Why</span> Donate Blood?
        </h2>
        <p className="text-lg text-red-400 sm:text-xl mt-4">
          Every donation counts. Your blood could save a life in need. Here's why donating blood is important:
        </p>
      </div>

      {/* Card container */}
      <div className="flex flex-col items-center justify-center space-y-24">
        {[
          {
            title: "Save Lives",
            text: "Your donation can help save someone’s life in critical need of blood.",
            img: `${img1}`,
          },
          {
            title: "Help Your Community",
            text: "Contribute to your community and ensure that blood is always available in hospitals for those in need. Your donation helps maintain a reliable supply of blood for emergencies, surgeries, and medical treatments. By donating, you're supporting patients facing life-threatening conditions and making a significant impact in your local healthcare system.",
            img: `${img2}`,
          },
          {
            title: "Easy and Safe",
            text: "Donating blood is a simple and safe process that only takes a few minutes. Each donation undergoes thorough screening to ensure safety for both the donor and the recipient. The process is well-regulated and conducted by trained professionals, making it completely safe. Plus, as a donor, you'll enjoy a quick health check-up.",
            img: `${img3}`,
          },
        ].map((item, index) => (
          <div
          key={index}
          className="relative mt-12 bg-red-100 max-w-4xl p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          data-aos="zoom-in-down"  
        >
            {/* Border Animation on Hover */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>

            {/* Image */}
            {item.img && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <img
                  className="rounded-lg w-[200px] h-[200px] object-cover border-4 border-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-red-600"
                  src={item.img}
                  alt={item.title}
                />
              </div>
            )}

            {/* Card Content */}
            <div className="mt-32 flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-gray-700">{item.text}</p>
            </div>
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
