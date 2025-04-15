import React, { useState } from "react";
import { Link } from "react-router-dom";
import JobIcon from "../Icons/JobIcon";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const element = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
    { to: "/jobs", text: "Jobs" },
  ];
  return (
    <nav className="grid grid-cols-3 bg-black  text-white px-2 py-2 md:px-4 md:py-4  bottom-0 static  ">
      <div className="flex items-center gap-2">
        <JobIcon />
        <p className="text-sm md:text-lg font-bold">Job Portal</p>
      </div>

      <ul
        className={`sm:flex hidden gap-2 text-sm md:text-lg md:gap-4 justify-center items-center`}
      >
        {element.map((item, index) => {
          return (
            <Link key={index} to={item.to}>
              {item.text}
            </Link>
          );
        })}
      </ul>

      <div className="sm:hidden flex justify-end items-center gap-1 md:gap-4">
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "X" : "☰"}
        </button>
      </div>

      {/* isOpen ko Navbar */}
      {isOpen && (
        <div className="absolute top-16  right-0 w-[20%] bg-[#121212] text-white opacity-95 p-4 z-10">
          <ul className="flex flex-col gap-2 text-sm md:text-lg md:gap-4 justify-center items-center ">
            {element.map((item, index) => {
              return (
                <>
                  <Link
                    className="hover:scale-105 border-b-white border-b-2 w-full text-center transition-colors font-bold duration-300 ease-in-out"
                    key={index}
                    to={item.to}
                  >
                    {item.text}
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      )}
      <div className="flex justify-end items-center gap-1 md:gap-4">
        <button className=" bg-[#309689] p-2 md:px-4 md:py-2 rounded-sm text-sm md:text-lg md:rounded-lg ">
          Login
        </button>
        <button className="p-2 md:px-4 md:py-2 rounded-sm text-sm md:text-lg md:rounded-lg  ">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
