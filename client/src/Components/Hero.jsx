import React from "react";
import SeacrhIcon from "../Icons/SeacrhIcon";
import Briefcase from "../Icons/Briefcase";
import Community from "../Icons/Community";
import Building from "../Icons/Building";
import HeroBottom from "./HeroBottom";

const Hero = () => {
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const locations = ["Kathmandu", "Pokhara", "Lalitpur", "Butwal"];
  const categories = ["IT", "Design", "Marketing", "Finance"];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryOpen(false);
  };

  return (
    <div className="hero max-w-full text-white bg-black opacity-95 top-0 mx-auto flex-col justify-center items-center text-center h-[700px] sm:h-[500px] shadow-lg p-10">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
        Find Your Dream Job Today!
      </h1>
      <p className="opacity-65 font-mono text-xs sm:text-sm mb-4">
        Connecting Talent with Opportunity: Your Gateway to Career Success
      </p>

      <div
        id="search"
        className="sm:flex sm:gap-4 sm:flex-row flex flex-col justify-center items-center  mt-4 relative flex-wrap gap-2"
      >
        {/* Job Title Input */}
        <span>
          <input
            type="text"
            placeholder="Job Title or Company"
            className="bg-white text-black rounded-md sm:p-2 p-1  w-full"
          />
        </span>

        {/* Location Dropdown */}
        <span className="relative inline-block w-48">
          <input
            type="text"
            readOnly
            value={selectedLocation}
            placeholder="Select Location"
            className="bg-white text-black rounded-md sm:p-2 p-1  w-full "
            onClick={() => setLocationOpen(!locationOpen)}
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 cursor-pointer"
            onClick={() => setLocationOpen(!locationOpen)}
          >
            &gt;
          </span>

          {locationOpen && (
            <ul className="absolute z-10 w-full bg-white text-black mt-1 rounded shadow">
              {locations.map((loc, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationSelect(loc)}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </span>

        {/* Category Dropdown */}
        <span className="relative inline-block w-48">
          <input
            type="text"
            readOnly
            value={selectedCategory}
            placeholder="Select Category"
            className="bg-white text-black rounded-md sm:p-2 p-1 w-full"
            onClick={() => setCategoryOpen(!categoryOpen)}
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 cursor-pointer"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            &gt;
          </span>

          {categoryOpen && (
            <ul className="absolute z-10 w-full bg-white text-black mt-1 rounded shadow">
              {categories.map((cat, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </span>

        {/* Search Button */}
        <div className="flex items-center gap-2 bg-[#309689] text-white rounded-md sm:px-4 sm:py-2 cursor-pointer px-2 text-sm py-2 w-full sm:w-48 justify-center">
          <SeacrhIcon />
          <button className="cursor-pointer">Search Job</button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-10 mt-10">
        <div className="flex  justify-between items-center">
          <Briefcase />
          <span className="ml-2">
            <h2 className="font-bold mt-4 text-left">25822</h2>
            <p className="opacity-65 text-sm">Find your dream job</p>
          </span>
        </div>

        <div className="flex  justify-between items-center">
          <Community />
          <span className="ml-2">
            <h1 className="font-bold mt-4 text-left">10,250</h1>
            <p className="opacity-65 text-sm">Candidates</p>
          </span>
        </div>

        <div className="flex  justify-between items-center">
          <Building />
          <span className="ml-2">
            <h1 className="font-bold mt-4 text-left">10,250</h1>
            <p className="opacity-65 text-sm">Companies</p>
          </span>
        </div>
      </div>

      <HeroBottom />
    </div>
  );
};

export default Hero;
