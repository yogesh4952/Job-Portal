import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import JobListing from "../Components/JobListing";
import AppDownload from "../Components/AppDownload";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
