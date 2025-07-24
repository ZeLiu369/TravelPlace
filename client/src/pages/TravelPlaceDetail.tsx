import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchTravelPlace,
  deleteTravelPlace,
} from "../store/slices/travelPlaceSlice";

const TravelPlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentTravelPlace: travelPlace,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.travelPlaces);
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchTravelPlace(id) as any);
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this travel place?")) {
      if (id && token) {
        await dispatch(deleteTravelPlace({ id, token }) as any);
        navigate("/travelplaces");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (!travelPlace) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600">
          Travel place not found
        </h2>
        <Link
          to="/travelplaces"
          className="text-green-600 hover:text-green-800 mt-4 inline-block"
        >
          ← Back to all places
        </Link>
      </div>
    );
  }

  const isOwner =
    user && travelPlace.author && user.id === travelPlace.author._id;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/travelplaces"
          className="text-green-600 hover:text-green-800 flex items-center"
        >
          ← Back to all places
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {travelPlace.images && travelPlace.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
            {travelPlace.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${travelPlace.title} - ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {travelPlace.title}
              </h1>
              <p className="text-gray-600 text-lg">{travelPlace.location}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-600">
                ${travelPlace.price}
              </span>
              <p className="text-gray-500">per night</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {travelPlace.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <p className="text-sm text-gray-500">
              Shared by{" "}
              <span className="font-medium">
                {travelPlace.author?.username || "Unknown"}
              </span>
            </p>
          </div>

          {isOwner && (
            <div className="flex space-x-4">
              <Link
                to={`/travelplaces/${travelPlace._id}/edit`}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Place
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Place
              </button>
            </div>
          )}

          {travelPlace.reviews && travelPlace.reviews.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
              <div className="space-y-4">
                {travelPlace.reviews.map((review: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">
                        {review.author?.username || "Anonymous"}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPlaceDetail;
