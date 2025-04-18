import React from "react";
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="614432948443-jq41o1f0ngj0tm7kprq8sd828k7d9h5a.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
