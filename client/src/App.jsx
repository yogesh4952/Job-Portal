import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </>
  );
};

export default App;
