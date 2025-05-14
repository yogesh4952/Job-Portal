import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  // Function to logout for company

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
    toast.success("Logout succesfully");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen">
      {/* Navbar for recruiter panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="Company Logo"
          />

          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData.name}</p>
              <div className="relative group">
                <img
                  className="w-8 border border-gray-100 rounded-full"
                  src={companyData.image}
                  alt="User Profile"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border border-gray-400 text-sm">
                    <li
                      onClick={logout}
                      className="py-1 px-2 cursor-pointer pr-10"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left sidebar with options */}
        <div className=" min-h-screen border-r border-gray-300">
          <ul className="flex flex-col items-start pt-5 text-gray-800 mt-4">
            <NavLink
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 w-full hover:bg-gray-50 transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 border-r-3 border-blue-500 rounded-l-md"
                    : ""
                }`
              }
              to="/dashboard/add-job"
            >
              <img
                className="min-w-4"
                src={assets.add_icon}
                alt="Add Job Icon"
              />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 w-full hover:bg-gray-50 transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 border-r-3 border-blue-500 rounded-l-md"
                    : ""
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img
                className="min-w-4"
                src={assets.home_icon}
                alt="Manage Jobs Icon"
              />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 w-full hover:bg-gray-50 transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 border-r-3 border-blue-500 rounded-l-md"
                    : ""
                }`
              }
              to="/dashboard/view-applications"
            >
              <img
                className="min-w-4"
                src={assets.person_tick_icon}
                alt="View Applications Icon"
              />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
