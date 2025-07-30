import React, { useState, useEffect } from "react";
import { USER_BASE_URL } from "../../config";

const SingleImage = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Check if user is admin
  const isAdmin = () => {
    return localStorage.getItem("isAdmin");
  };

  // Fetch existing image on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found");
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
        setImages(data.data || []);
      } else if (response.status === 404) {
        // No images found, this is normal for first time
        setImages([]);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch images");
      }
    } catch (err) {
      setError("Error fetching images: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image file");
      return;
    }

    // Check if an image already exists
    if (images && images.length > 0) {
      setError(
        "An image already exists. Please delete the existing image before uploading a new one."
      );
      return;
    }

    setUploadLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();
      const adminStatus = isAdmin();

      if (!token) {
        setError("Authentication token not found. Please login again.");
        setUploadLoading(false);
        return;
      }

      if (!adminStatus) {
        setError("Admin access required. Please login as admin.");
        setUploadLoading(false);
        return;
      }

      console.log("Token found:", token ? "Yes" : "No");
      console.log("Admin status:", adminStatus);
      console.log("Uploading to:", `${USER_BASE_URL}/api/single-image/upload`);

      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(`${USER_BASE_URL}/api/single-image/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Success response:", data);
        setSuccess("Image uploaded successfully!");
        setSelectedFile(null);
        // Reset file input
        document.getElementById("fileInput").value = "";
        // Refresh the image display
        fetchImages();
      } else {
        const errorData = await response.json();
        console.error("Upload error:", errorData);
        setError(errorData.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Upload exception:", err);
      setError("Error uploading image: " + err.message);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!imageId) return;

    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found");
        return;
      }

      const response = await fetch(`${USER_BASE_URL}/api/single-image/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess("Image deleted successfully!");
        // Refresh the images after deletion
        fetchImages();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete image");
      }
    } catch (err) {
      setError("Error deleting image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Single Image Management</h1>

        {/* Upload Section */}
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload Image</h2>

          <div className="mb-4">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {selectedFile && (
            <div className="mb-4 p-3 bg-blue-50 rounded border">
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploadLoading || (images && images.length > 0)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadLoading
              ? "Uploading..."
              : images && images.length > 0
              ? "Image Already Exists"
              : "Upload Image"}
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Image Display Table */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Current Image</h2>

          {loading ? (
            <div className="text-center py-8">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {images && images.length > 0 ? (
                    images.map((image) => (
                      <tr key={image.singleImageId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`${USER_BASE_URL}/${image.imagePath}`}
                            alt="Single Image"
                            className="h-20 w-20 object-cover rounded-md border"
                            onError={(e) => {
                              e.target.src = "/placeholder-image.png";
                            }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">
                            {new Date(image.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(image.singleImageId)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No image uploaded yet. Upload an image above to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
