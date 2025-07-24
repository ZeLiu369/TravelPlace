import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">Discover Amazing Places</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Share your travel experiences, discover hidden gems, and connect
            with fellow travelers. Create memories that last a lifetime.
          </p>

          <div className="space-x-4">
            <Link
              to="/travelplaces"
              className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Explore Places
            </Link>

            {user ? (
              <Link
                to="/travelplaces/new"
                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                Share Your Place
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                Join Community
              </Link>
            )}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-white">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🗺️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p>Find amazing travel destinations shared by our community</p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📸</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Share</h3>
            <p>
              Upload photos and share your favorite travel spots with others
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Review</h3>
            <p>
              Read and write reviews to help fellow travelers plan their trips
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
