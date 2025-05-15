import { assets } from "../assets/assets";
import {
  useClerk,
  useUser,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn, signOut } = useClerk();
  const { user, isLoaded } = useUser(); // `isLoaded` prevents flash of undefined
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const handleLogin = () => {
    if (!isLoaded) return; // wait for Clerk to fully load
    if (!user) {
      localStorage.clear();
      openSignIn(); // only open sign-in modal if not logged in
    } else {
      navigate("/"); // or redirect if already logged in
    }
  };

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt="Error"
        />

        {isLoaded && user ? (
          <div className="flex items-center gap-3">
            <Link to="/applications">Applied Job</Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi {user.fullName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Recruiter Login
            </button>
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
