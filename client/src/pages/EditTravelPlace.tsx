import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchTravelPlace,
  updateTravelPlace,
} from "../store/slices/travelPlaceSlice";

const EditTravelPlace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
  });
  const [images, setImages] = useState<FileList | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentTravelPlace: travelPlace,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.travelPlaces);
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchTravelPlace(id) as any);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (travelPlace) {
      setFormData({
        title: travelPlace.title,
        location: travelPlace.location,
        price: travelPlace.price.toString(),
        description: travelPlace.description,
      });
    }
  }, [travelPlace]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !token || !id) {
      alert("Authorization error");
      return;
    }

    if (travelPlace && user.id !== travelPlace.author._id) {
      alert("You are not authorized to edit this travel place");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("travelplace[title]", formData.title);
    formDataToSend.append("travelplace[location]", formData.location);
    formDataToSend.append("travelplace[price]", formData.price);
    formDataToSend.append("travelplace[description]", formData.description);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formDataToSend.append("image", images[i]);
      }
    }

    try {
      const result = await dispatch(
        updateTravelPlace({ id, travelPlaceData: formDataToSend, token }) as any
      );
      if (result.type === "travelPlaces/update/fulfilled") {
        navigate(`/travelplaces/${id}`);
      }
    } catch (error) {
      console.error("Error updating travel place:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Login Required
        </h2>
        <p className="text-gray-500 mb-8">
          You must be logged in to edit a travel place.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!travelPlace) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600">
          Travel place not found
        </h2>
      </div>
    );
  }

  if (user.id !== travelPlace.author._id) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Unauthorized
        </h2>
        <p className="text-gray-500">
          You are not authorized to edit this travel place.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Edit Travel Place
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price per night ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="images"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Add New Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can select multiple images to add
            </p>
          </div>

          {travelPlace.images && travelPlace.images.length > 0 && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {travelPlace.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`${travelPlace.title} - ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Travel Place"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/travelplaces/${id}`)}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTravelPlace;
