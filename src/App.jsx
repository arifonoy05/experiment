import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import RestaurantList from "./pages/restaurant/RestaurantList";
import RestaurantForm from "./pages/restaurant/RestaurantForm"
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <div className="app relative">
      <Modal />

      <nav className="flex justify-center align-middle gap-20 py-2 bg-blue-600 text-white">
        <Link to="/">Home</Link>
        <Link to="/restaurant">Restaurant</Link>
        <Link to="/restaurant/add">Add Restaurant</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<RestaurantList />} />
        <Route path="/restaurant/add" element={<RestaurantForm />} />
      </Routes>
    </div>
  );
}

export default App;
