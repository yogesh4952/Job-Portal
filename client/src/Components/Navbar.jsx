import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();

  console.log(user);
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div
      className="shadow py-4
    "
    >
      <div className=" container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt="Error"
        />

        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/applications">Applied Job</Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi {user.fullName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Recuriter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className=" bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
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
