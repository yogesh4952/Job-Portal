import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "light"; // Fallback to light if undefined
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Store the new theme
  };

  const { openSignIn, signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const handleLogin = () => {
    if (!isLoaded) return;
    if (!user) {
      localStorage.clear();
      openSignIn();
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      // Optional: Set default theme if none is stored
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <div className="shadow-sm py-4 bg-base-200">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl md:text-4xl italic underline cursor-pointer font-extrabold"
        >
          <span className="text-secondary">yo</span>Gesh
        </h1>

        <div className="flex items-center gap-4">
          {isLoaded && user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/applications"
                className="text-base-content hover:text-primary"
              >
                Applied Job
              </Link>
              <p className="text-base-content/50">|</p>
              <p className="max-sm:hidden text-base-content">
                Hi {user.fullName}
              </p>
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-4 max-sm:text-xs">
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="text-base-content/80 hover:text-primary"
              >
                Recruiter Login
              </button>
              <button
                onClick={handleLogin}
                className="btn btn-primary px-6 sm:px-9"
              >
                Login
              </button>
            </div>
          )}
          <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16ZM12 6C12.55 6 13 5.55 13 5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5C11 5.55 11.45 6 12 6ZM12 20C12.55 20 13 19.55 13 19C13 18.45 12.55 18 12 18C11.45 18 11 18.45 11 19C11 19.55 11.45 20 12 20ZM5 13C4.45 13 4 12.55 4 12C4 11.45 4.45 11 5 11C5.55 11 6 11.45 6 12C6 12.55 5.55 13 5 13ZM19 13C18.45 13 18 12.55 18 12C18 11.45 18.45 11 19 11C19.55 11 20 11.45 20 12C20 12.55 19.55 13 19 13ZM7.76 7.76C7.35 8.17 6.69 8.17 6.28 7.76C5.87 7.35 5.87 6.69 6.28 6.28C6.69 5.87 7.35 5.87 7.76 6.28C8.17 6.69 8.17 7.35 7.76 7.76ZM16.24 7.76C16.65 8.17 17.31 8.17 17.72 7.76C18.13 7.35 18.13 6.69 17.72 6.28C17.31 5.87 16.65 5.87 16.24 6.28C15.83 6.69 15.83 7.35 16.24 7.76ZM7.76 17.72C8.17 18.13 8.17 18.79 7.76 19.2C7.35 19.61 6.69 19.61 6.28 19.2C5.87 18.79 5.87 18.13 6.28 17.72C6.69 17.31 7.35 17.31 7.76 17.72ZM16.24 17.72C16.65 18.13 17.31 18.13 17.72 17.72C18.13 17.31 18.13 16.65 17.72 16.24C17.31 15.83 16.65 15.83 16.24 16.24C15.83 16.65 15.83 17.31 16.24 17.72Z" />
            </svg>
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
