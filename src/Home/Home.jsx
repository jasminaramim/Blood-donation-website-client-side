import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PublishedBlogs from "./PublishedBlogs";
import bgimg from "../assets/images/25989592_7127260.jpg";
import Typewriter from "typewriter-effect";
import img1 from '../assets/images/bloodAvt.jpg'
import bloodrequests from '../assets/images/world-blood-donor-day-creative-collage.jpg'
import img2 from '../assets/images/19538555_6129019.jpg'
import img3 from '../assets/images/girl-posing-with-surprise-gift-white-wall.jpg'
import AOS from "aos";
import "aos/dist/aos.css";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from "react";
import BloodDonateRequestsPublic from "./BloodDonateRequestsPublic";
import FundingPage from "./FundingPage";
import Carousel from "./Carousel";
import ContactForm from "../Pages/ContactForm";
import About from "./About";
const REGISTRATION_URL = "/signup";
const SEARCH_URL = "/search";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    console.log('AOS initialized');
  }, []);
  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>BloodDonate | Donate your blood</title>
      </Helmet>

      {/* Banner Section */}
      <section className="container">
        <div className="w-full">
          <Carousel />
        </div>
      </section>

      {/* Published Blogs Section */}
      <section>
        <PublishedBlogs />
      </section>

      {/* Featured Section */}
      <section
        className="py-12 px-6 relative"
        style={{
          backgroundImage: `url(${img1})`, // Replace img1 with the actual image source URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl text-red-500 sm:text-4xl font-bold">
            <span className="border-b-2 text-red-700 border-red-800">Why</span> Donate Blood?
          </h2>
          <p className="text-lg text-red-400 sm:text-xl mt-4">
            Every donation counts. Your blood could save a life in need. Here's why donating blood is important:
          </p>
        </div>

        {/* Card container */}
        <div className="flex flex-col items-center justify-center space-y-24 relative z-10">
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
              className="relative mt-12 bg-red-100 max-w-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              data-aos="zoom-in-down"
            >
              {/* Border Animation on Hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>

              {/* Image */}
              {item.img && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <img
                    className="w-[200px] h-[200px] object-cover border-4 border-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-red-600"
                    src={item.img}
                    alt={item.title}
                  />
                </div>
              )}

              {/* Card Content */}
              <div className="mt-32 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-xl border-b-2 mt-4 px-8 text-center justify-center items-center text-black border-red-300 font-bold">{item.title}</h3>
                <p className="mt-4 bg-red-300 p-4 text-gray-700">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

<section className="mt-16">
<h1 className="text-4xl font-bold text-center mb-6">Pending <span className="text-red-500">Donation</span> Requests</h1>
</section>
      <section
        className="py-12  px-6 flex justify-center bg-gray-300 relative"
        style={{
          backgroundImage: `url(${bloodrequests})`, // Replace with the actual image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        
        {/* Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

        {/* Content - Ensuring it stays above the overlay */}
        <div className="relative z-10 w-full">
          <BloodDonateRequestsPublic />
        </div>
      </section>


      {/* <section>
        <FundingPage />
      </section> */}
      <section>
        <div className="py-12 px-6 bg-gray-300">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-red-500 sm:text-4xl font-bold">
              What People Are Saying
            </h2>
            <p className="text-lg text-red-400 sm:text-xl mt-4">
              Hear from our generous donors and supporters!
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {/* Review Card 1 */}
            <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="flex items-center p-4">
                <img
                  className="w-16 h-16 object-cover rounded-full border-2 border-red-500"
                  src="https://randomuser.me/api/portraits/women/50.jpg"
                  alt="Reviewer"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Jane Doe</p>
                  <p className="text-sm text-gray-500">Donor</p>
                </div>
              </div>
              <div className="px-4 py-2">
                <div className="flex items-center text-yellow-400">
                  {/* Rating */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15l-3.09 1.63 1.18-3.63L4 8.78l3.78-.29L10 5l1.22 3.49L15 8.78l-3.09 3.23 1.18 3.63L10 15z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mt-2 text-gray-700 text-sm">
                  "Donating blood was such an easy process, and I felt so good knowing I helped save a life. I encourage everyone to donate!"
                </p>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="flex items-center p-4">
                <img
                  className="w-16 h-16 object-cover rounded-full border-2 border-red-500"
                  src="https://randomuser.me/api/portraits/men/57.jpg"
                  alt="Reviewer"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">John Smith</p>
                  <p className="text-sm text-gray-500">Donor</p>
                </div>
              </div>
              <div className="px-4 py-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15l-3.09 1.63 1.18-3.63L4 8.78l3.78-.29L10 5l1.22 3.49L15 8.78l-3.09 3.23 1.18 3.63L10 15z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mt-2 text-gray-700 text-sm">
                  "The staff made me feel comfortable, and I was in and out in no time. Blood donation is important, and I’ll keep coming back."
                </p>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="flex items-center p-4">
                <img
                  className="w-16 h-16 object-cover rounded-full border-2 border-red-500"
                  src="https://randomuser.me/api/portraits/women/58.jpg"
                  alt="Reviewer"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Alice Williams</p>
                  <p className="text-sm text-gray-500">Donor</p>
                </div>
              </div>
              <div className="px-4 py-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15l-3.09 1.63 1.18-3.63L4 8.78l3.78-.29L10 5l1.22 3.49L15 8.78l-3.09 3.23 1.18 3.63L10 15z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mt-2 text-gray-700 text-sm">
                  "I’ve donated multiple times, and it’s always been a positive experience. It’s great knowing I can help others in need."
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section>
        <About/>
      </section>
      <section className="bg-gray-300  p-10">
        <ContactForm />
      </section>
      {/* Contact Us Section */}
  
    </div>
  );
};

export default Home;
