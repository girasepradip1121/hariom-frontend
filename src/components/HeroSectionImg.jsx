import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { USER_BASE_URL } from "../config";

const HeroSectionImg = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${USER_BASE_URL}/api/banners`);
        console.log("Banners fetched:", response.data);
        setBanners(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Failed to fetch banner images");
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] bg-red-100 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">No banner images available</div>
      </div>
    );
  }

  // Single image case
  if (banners.length === 1) {
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96 xl:h-[auto] overflow-hidden bg-gray-100">
        <img
          src={`${USER_BASE_URL}${banners[0].imageUrl}`}
          alt="Hero Image"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
            e.target.style.display = "none";
          }}
          onLoad={() => console.log("Image loaded successfully")}
        />
      </div>
    );
  }

  // Multiple images slider
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 xl:h-[950px] overflow-hidden group bg-gray-100">
      {/* Image Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner._id || index} className="min-w-full h-full flex-shrink-0">
            <img
              src={`${USER_BASE_URL}${banner.imageUrl}`}
              alt={`Hero Image ${index + 1}`}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.style.display = "none";
              }}
              onLoad={() => console.log(`Banner ${index + 1} loaded successfully`)}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        style={{ backgroundColor: "#393185" }}
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-75 text-white p-1 md:p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <button
        style={{ backgroundColor: "#393185" }}
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-75 text-white p-1 md:p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSectionImg;
