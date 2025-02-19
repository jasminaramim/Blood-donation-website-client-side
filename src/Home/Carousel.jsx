import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ReactTyped } from 'react-typed';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import images
import bgimg1 from '../assets/images/girl-posing-with-surprise-gift-white-wall.jpg'; 
import bgimg2 from '../assets/images/small-heart-shaped-gift-box-hands.jpg';
import bgimg3 from '../assets/images/13722635_5297015.jpg'; 

// Slide component
const Slide = ({ image, text }) => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <div className="text-center text-2xl sm:text-3xl font-semibold max-w-4xl">{text}</div>

        {/* Buttons section */}
        <div className="flex mt-48 flex-wrap justify-center space-x-4 lg:mt-6">
          <Link to="/signUp">
            <button
              aria-label="Join as a donor"
              className="px-3 sm:px-8 py-2 sm:py-4 bg-red-500 hover:bg-red-700 border text-white text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Join as a Donor
            </button>
          </Link>
          <Link to="/search">
            <button
              aria-label="Search for donors"
              className="px-3 sm:px-8 py-2 sm:py-4 bg-yellow-600 hover:bg-yellow-700 border text-white text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Search Donors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Carousel() {
  const [typedKey, setTypedKey] = useState(0);

  const handleTypedComplete = () => {
    setTypedKey(prevKey => prevKey + 1);
  };

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text={(
              <ReactTyped
                key={typedKey}
                strings={["Join as a Donor and Save Lives",
                  "Together, We Can Make a Difference"]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={1500}
                onComplete={handleTypedComplete}
                showCursor={true}
              />
            )}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text={(
              <ReactTyped
                key={typedKey}
                strings={["Join as a Donor and Save Lives",
                  "Together, We Can Make a Difference",
                  "Become a Blood Donor Today"]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={1500}
                onComplete={handleTypedComplete}
                showCursor={true}
              />
            )}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text={(
              <ReactTyped
                key={typedKey}
                strings={["Join as a Donor and Save Lives",
                  "Together, We Can Make a Difference",
                  "Become a Blood Donor Today!"]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={1500}
                onComplete={handleTypedComplete}
                showCursor={true}
              />
            )}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
