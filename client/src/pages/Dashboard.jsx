import React, { useContext, useEffect, useRef } from "react"; // Added useRef
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Added to check current route
  const hasRedirected = useRef(false); // Added to prevent repeated redirects
  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    if (
      companyData &&
      !hasRedirected.current &&
      location.pathname === "/dashboard"
    ) {
      hasRedirected.current = true; // Mark as redirected
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navbar for recruiter panel */}
      <div className="shadow-sm py-4 bg-base-200">
        <div className="container px-5 mx-auto flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl sm:text-3xl md:text-4xl italic underline cursor-pointer font-extrabold"
          >
            <span className="text-secondary">yo</span>Gesh
          </h1>

          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden text-base-content">
                Welcome, {companyData.name}
              </p>
              <div className="relative group">
                <img
                  className="w-8 h-8 rounded-full border border-base-200"
                  src={companyData.image}
                  alt={`${companyData.name} Profile`}
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-12">
                  <ul className="menu bg-base-100 rounded-md border border-base-200 p-2 text-sm shadow-md">
                    <li>
                      <button
                        onClick={logout}
                        className="py-1 px-2 hover:bg-base-200"
                      >
                        Logout
                      </button>
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
        <div className="min-h-screen border-r border-base-200 w-64 sm:w-72">
          <ul className="flex flex-col items-start pt-5 text-base-content mt-4">
            <NavLink
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 w-full hover:bg-base-200 transition-colors duration-200 ${
                  isActive ? "bg-primary/10 border-r-4 border-primary" : ""
                }`
              }
              to="/dashboard/add-job"
            >
              <img
                className="w-5 h-5"
                src={assets.add_icon}
                alt="Add Job Icon"
              />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 w-full hover:bg-base-200 transition-colors duration-200 ${
                  isActive ? "bg-primary/10 border-r-4 border-primary" : ""
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img
                className="w-5 h-5"
                src={assets.home_icon}
                alt="Manage Jobs Icon"
              />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 w-full hover:bg-base-200 transition-colors duration-200 ${
                  isActive ? "bg-primary/10 border-r-4 border-primary" : ""
                }`
              }
              to="/dashboard/view-applications"
            >
              <img
                className="w-5 h-5"
                src={assets.person_tick_icon}
                alt="View Applications Icon"
              />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div className="flex-1 p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
