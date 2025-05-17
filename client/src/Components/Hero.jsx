import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-primary to-secondary py-16 text-center mx-2 rounded-xl text-base-content">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>

        <div className="flex items-center justify-between rounded text-base-content max-w-xl pl-4 mx-4 sm:mx-auto bg-base-200">
          <div className="flex items-center flex-1 mr-4">
            <img className="h-5" src={assets.search_icon} alt="Search Here" />
            <input
              type="text"
              placeholder="Search for jobs"
              className=" outline-none w-full max-sm:text-xs ml-2 bg-base-100"
              ref={titleRef}
            />
          </div>

          <div className="flex items-center flex-1 mr-4">
            <img className="h-5" src={assets.location_icon} alt="Search Here" />
            <input
              type="text"
              placeholder="Location"
              className=" outline-none w-full max-sm:text-xs ml-2 bg-base-100"
              ref={locationRef}
            />
          </div>

          <button onClick={onSearch} className="btn btn-primary btn-sm">
            Search
          </button>
        </div>
      </div>

      <div className="border border-base-300 shadow-md mx-2 mt-5 p-6 rounded-md flex bg-base-100 text-base-content">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap items-center">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="Microsoft" />
          <img className="h-6" src={assets.walmart_logo} alt="Walmart" />
          <img className="h-6" src={assets.accenture_logo} alt="Accenture" />
          <img className="h-6" src={assets.samsung_logo} alt="Samsung" />
          <img className="h-6" src={assets.amazon_logo} alt="Amazon" />
          <img className="h-6" src={assets.adobe_logo} alt="Adobe" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
