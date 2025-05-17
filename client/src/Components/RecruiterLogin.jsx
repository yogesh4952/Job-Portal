import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isTextDataSubmited) {
      return setIsTextDataSubmited(true);
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/company/login", {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          toast.success("Login Successfully");
          navigate("/dashboard");
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored", // Updated to match theme dynamically
          });
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);

        const { data } = await axios.post(
          backendUrl + "/api/company/register",
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          toast.success("Sign Up Successfully");
          navigate("/dashboard");
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-base-100/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative card bg-base-100 p-6 sm:p-10 rounded-xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-center text-2xl font-medium text-base-content mb-2">
          Recruiter {state}
        </h1>
        <p className="text-sm text-base-content/80 text-center mb-6">
          Welcome back! Please sign in to continue
        </p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <div className="flex items-center gap-4 my-6">
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="w-16 rounded-full border border-base-200"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Company Logo"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                hidden
                id="image"
              />
            </label>
            <p className="text-base-content/80">
              Upload Company <br /> Logo
            </p>
          </div>
        ) : (
          <>
            {state !== "Login" && (
              <div className="input input-bordered flex items-center gap-2 rounded-full mt-5">
                <img
                  src={assets.person_icon}
                  alt="Company Name"
                  className="w-5 h-5"
                />
                <input
                  className="grow outline-none text-sm text-base-content"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="input input-bordered flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="Email" className="w-5 h-5" />
              <input
                className="grow outline-none text-sm text-base-content"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Id"
                required
              />
            </div>

            <div className="input input-bordered flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="Password" className="w-5 h-5" />
              <input
                className="grow outline-none text-sm text-base-content"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-primary mt-4 cursor-pointer hover:underline">
            Forgot Password
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full rounded-full mt-4"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center text-sm text-base-content/80">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-primary hover:underline"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm text-base-content/80">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-primary hover:underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-4 right-4 cursor-pointer w-5 h-5"
          alt="Close"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
