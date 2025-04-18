import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import googleAuth from "../axios";

const Login = () => {
  const [error, setError] = useState(null);

  const responseGoogle = async (authResult) => {
    try {
      console.log("Auth result:", authResult);
      if (authResult["code"]) {
        console.log("Sending code to backend:", authResult["code"]);
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        console.log("User data:", { email, name, image });
        setError(null);
      } else {
        throw new Error("No authorization code received");
      }
    } catch (error) {
      console.error("Error while requesting Google code:", error);
      setError("Failed to log in with Google. Please try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google OAuth error:", error);
      setError("Google authentication failed.");
    },
    flow: "auth-code",
    scope: "email profile", // Explicitly request email and profile scopes
  });

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1>Google Login</h1>
      <button
        onClick={googleLogin}
        className="px-4 py-2 bg-slate-700 text-white rounded-sm"
      >
        Log in with Google
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
