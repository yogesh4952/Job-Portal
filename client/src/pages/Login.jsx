import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import googleAuth from "../axios";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [isSignup, setIsSignup] = useState(false);

  // Check token on mount
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(
            "http://localhost:5000/auth/verify",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          console.log(response);
          setUser(response.data.user);
          setError(null);
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token"); // Clear invalid token
          setError(
            error.response?.data?.message ||
              "Session expired. Please log in again."
          );
        } finally {
          setLoading(false);
        }
      }
    };
    verifyUser();
  }, []);

  const responseGoogle = async (authResult) => {
    setLoading(true);
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        const { token } = result.data;
        localStorage.setItem("token", token);
        setUser({ email, name, image });
        setError(null);
      } else {
        throw new Error("No authorization code received");
      }
    } catch (error) {
      console.error("Error while requesting Google code:", error);
      setError(
        error.response?.data?.message ||
          "Failed to log in with Google. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google OAuth error:", error);
      setError("Google authentication failed.");
    },
    flow: "auth-code",
    scope: "email profile",
    redirect_uri: "http://localhost:5173",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        ...form,
        ...(isSignup && { name: form.name }),
      });
      const { email, name, image } = response.data.user;
      const { token } = response.data;
      localStorage.setItem("token", token);
      setUser({ email, name, image });
      setError(null);
    } catch (error) {
      console.error("Error in form submission:", error);
      setError(
        error.response?.data?.message ||
          "Failed to process request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
    setForm({ email: "", password: "", name: "" });
  };
  console.log(user);
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {isSignup ? "Sign Up" : "Log In"}
      </h1>
      {user ? (
        <div className="text-center">
          <p className="text-lg">Welcome, {user.name}!</p>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          {user.image && (
            <img
              src={user.image || "/default-profile.png"}
              alt="Profile"
              className="w-16 h-16 rounded-full mt-2 mx-auto"
              onError={(e) => (e.target.src = "/default-profile.png")}
            />
          )}
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <form onSubmit={handleFormSubmit} className="mb-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            {isSignup && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 bg-blue-600 text-white rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>
          <button
            onClick={googleLogin}
            disabled={loading}
            className={`w-full px-4 py-2 bg-slate-700 text-white rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Log in with Google"}
          </button>
          <p className="mt-4 text-center">
            {isSignup ? "Already have an account?" : "No account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 underline"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
