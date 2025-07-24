import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchTravelPlaces } from "../store/slices/travelPlaceSlice";

const TravelPlaces: React.FC = () => {
  const dispatch = useDispatch();
  const { travelPlaces, isLoading, error } = useSelector(
    (state: RootState) => state.travelPlaces
  );

  useEffect(() => {
    dispatch(fetchTravelPlaces() as any);
  }, [dispatch]);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Travel Places</h1>
        <Link
          to="/travelplaces/new"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Add New Place
        </Link>
      </div>

      {travelPlaces.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            No travel places yet
          </h2>
          <p className="text-gray-500 mb-8">
            Be the first to share an amazing destination!
          </p>
          <Link
            to="/travelplaces/new"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Add First Place
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelPlaces.map((place) => (
            <div
              key={place._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {place.images && place.images[0] && (
                <img
                  src={place.images[0].url}
                  alt={place.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {place.title}
                </h3>
                <p className="text-gray-600 mb-2">{place.location}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {place.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">
                    ${place.price}/night
                  </span>
                  <Link
                    to={`/travelplaces/${place._id}`}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">
                    by {place.author?.username || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelPlaces;
