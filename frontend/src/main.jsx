import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Admin from "./pages/Admin.jsx";
import Booking from "./pages/Booking.jsx";
import Footer from "./pages/Footer.jsx";
import "./assets/css/index.css";
import "./assets/css/screen.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="booking" element={<Booking />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  </StrictMode>,
);
