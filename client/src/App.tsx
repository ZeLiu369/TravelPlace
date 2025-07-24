import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Test from "./Test";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TravelPlaces from "./pages/TravelPlaces";
import TravelPlaceDetail from "./pages/TravelPlaceDetail";
import CreateTravelPlace from "./pages/CreateTravelPlace";
import EditTravelPlace from "./pages/EditTravelPlace";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Test />
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/travelplaces" element={<TravelPlaces />} />
                <Route
                  path="/travelplaces/new"
                  element={<CreateTravelPlace />}
                />
                <Route
                  path="/travelplaces/:id"
                  element={<TravelPlaceDetail />}
                />
                <Route
                  path="/travelplaces/:id/edit"
                  element={<EditTravelPlace />}
                />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
