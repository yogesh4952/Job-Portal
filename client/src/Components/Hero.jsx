import React, { useState } from "react";
import SeacrhIcon from "../Icons/SeacrhIcon";
import Briefcase from "../Icons/Briefcase";
import Community from "../Icons/Community";
import Building from "../Icons/Building";
import HeroBottom from "./HeroBottom";

// Reusable DropdownInput Component
const DropdownInput = ({
  value,
  placeholder,
  options,
  open,
  setOpen,
  onSelect,
}) => (
  <span className="relative inline-block w-48">
    <input
      type="text"
      readOnly
      value={value}
      placeholder={placeholder}
      className="bg-white text-black rounded-md sm:p-2 p-1 w-full cursor-pointer"
      onClick={() => setOpen(!open)}
    />
    <span
      className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      &gt;
    </span>

    {open && (
      <ul className="absolute z-10 w-full bg-white text-black mt-1 rounded shadow">
        {options.map((option, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              onSelect(option);
              setOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    )}
  </span>
);

const Hero = () => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const locations = ["Kathmandu", "Pokhara", "Lalitpur", "Butwal"];
  const categories = ["IT", "Design", "Marketing", "Finance"];

  return (
    <div className="hero bg-black text-white opacity-95 shadow-lg p-10 h-[700px] sm:h-[600px] flex flex-col justify-center items-center text-center">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
        Find Your Dream Job Today!
      </h1>
      <p className="opacity-65 font-mono text-xs sm:text-sm mb-4">
        Connecting Talent with Opportunity: Your Gateway to Career Success
      </p>

      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row sm:gap-4 gap-5 mt-4 flex-wrap justify-center items-center relative">
        {/* Job Title Input */}
        <input
          type="text"
          placeholder="Job Title or Company"
          className="bg-white text-black rounded-md sm:p-2 p-1 "
        />

        {/* Location Dropdown */}
        <DropdownInput
          value={selectedLocation}
          placeholder="Select Location"
          options={locations}
          open={locationOpen}
          setOpen={setLocationOpen}
          onSelect={setSelectedLocation}
        />

        {/* Category Dropdown */}
        <DropdownInput
          value={selectedCategory}
          placeholder="Select Category"
          options={categories}
          open={categoryOpen}
          setOpen={setCategoryOpen}
          onSelect={setSelectedCategory}
        />

        {/* Search Button */}
        <div className="flex items-center gap-2 bg-[#309689] text-white rounded-md px-4 py-2 cursor-pointer w-full sm:w-48 justify-center text-sm">
          <SeacrhIcon />
          <button>Search Job</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center items-center gap-10 mt-10 flex-wrap text-left">
        <Stat
          icon={<Briefcase />}
          number="25,822"
          label="Find your dream job"
        />
        <Stat icon={<Community />} number="10,250" label="Candidates" />
        <Stat icon={<Building />} number="10,250" label="Companies" />
      </div>

      <HeroBottom />
    </div>
  );
};

// Reusable Stat Component
const Stat = ({ icon, number, label }) => (
  <div className="flex items-center">
    {icon}
    <span className="ml-2">
      <h2 className="font-bold mt-4">{number}</h2>
      <p className="opacity-65 text-sm">{label}</p>
    </span>
  </div>
);

export default Hero;
