import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { USER_BASE_URL } from "../config";

const MediaBlock = () => {
  const videoRef = useRef(null);
  const [apiImage, setApiImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch image from API
  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.log("No auth token found");
        setLoading(false);
        return;
      }

      const response = await fetch(`${USER_BASE_URL}/api/single-image`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setApiImage(data.data[0]); // Get the first image
        }
      } else if (response.status === 404) {
        console.log("No image found from API");
      } else {
        console.error("Failed to fetch image from API");
      }
    } catch (err) {
      console.error("Error fetching image:", err);
      setError("Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto flex flex-col md:flex-row justify-center items-center md:items-end gap-4 lg:gap-12 xl:gap-16 2xl:gap-20 px-2 md:px-4 lg:px-10 xl:px-8  py-20">
      {/* Logo */}
      <div className="w-32 md:w-48 flex-shrink-0">
        <Link to="/">
          <img
            src="/images/logo-new2.png"
            alt="Hari Om Chemicals Logo"
            className="w-full h-auto object-contain"
          />
        </Link>
      </div>

      {/* Static Image */}
      <div className="w-[250px] md:w-[320px] h-[390px] rounded-xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : apiImage ? (
          <img
            src={`${USER_BASE_URL}/${apiImage.imagePath}`}
            alt="Product from API"
            className="w-full h-full object-cover scale-120"
            onError={(e) => {
              // Fallback to default image if API image fails to load
              e.target.src = "/images/FloorCleaner.png";
            }}
          />
        ) : (
          <img
            src="/images/FloorCleaner.png"
            alt="Cleaner Product"
            className="w-full h-full object-cover scale-120"
          />
        )}
      </div>

      {/* Video Block */}
      <div className="relative w-[250px] md:w-[380px] h-[550px] rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          controls={false}
        >
          <source src="/FloorCleaning.mp4" type="video/mp4" />
          Your browser does not support the video.
        </video>
      </div>
    </section>
  );
};

export default MediaBlock;
