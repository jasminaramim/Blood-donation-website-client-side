import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-12 px-6 mt-14 bg-red-50">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-red-700 border-b-4 border-red-500 inline-block pb-2">
          About Blood Donation
        </h2>
        <p className="mt-6 text-lg text-gray-700">
          Blood donation is a selfless act that saves millions of lives every year. By donating blood, you can help patients suffering from severe injuries, surgeries, anemia, cancer, and other medical conditions.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {[
          {
            title: "Saves Lives",
            text: "A single donation can save up to three lives, making an enormous impact on those in need.",
          },
          {
            title: "Helps Hospitals & Patients",
            text: "Blood donations ensure hospitals have a steady supply for emergency surgeries, accidents, and critical illnesses.",
          },
          {
            title: "Boosts Your Health",
            text: "Donating blood can improve heart health, balance iron levels, and stimulate new blood cell production.",
          },
          {
            title: "A Simple, Safe Process",
            text: "The donation process is quick, safe, and conducted by trained professionals, ensuring donor and recipient safety.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 200}
          >
            <h3 className="text-xl border-b p-4 font-semibold text-red-700">{item.title}</h3>
            <p className="mt-3 p-4 bg-red-300 text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center" data-aos="fade-up">
        <h3 className="text-2xl font-bold text-red-600">Be a Hero. Save a Life.</h3>
        <p className="text-lg text-gray-700 mt-4">
          Join us in making a difference. Find a donation center near you and help save lives today.
        </p>
        <Link to="/signUp">
          <button
            aria-label="Join as a donor"
            className="px-2 sm:px-4 py-2 sm:py-2 mt-4 bg-red-500 hover:bg-red-700 border text-white text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            Join as a Donor
          </button>
        </Link>
      </div>
    </section>
  );
};

export default About;
