import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white text-2xl font-bold">
            TravelPlace
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/travelplaces"
              className="text-white hover:text-green-200 transition-colors"
            >
              Explore Places
            </Link>

            {user ? (
              <>
                <Link
                  to="/travelplaces/new"
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Add Place
                </Link>
                <span className="text-white">Welcome, {user.username}!</span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-green-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-green-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
