import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Insta from "./Insta";
import X from "./X";
import Facebook from "./Facebook";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20 bg-base-200">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl sm:text-3xl md:text-4xl italic underline cursor-pointer font-extrabold text-base-content"
      >
        <span className="text-secondary">yo</span>Gesh
      </h1>
      <p className="flex-1 border-l border-base-300 pl-4 text-sm text-base-content/70 max-sm:hidden">
        Copyright © Yogesh.dev | All rights reserved.
      </p>
      <div className="flex gap-2.5 text-base-content">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook page"
        >
          <Facebook className="w-9 h-9" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Twitter page"
        >
          <X className="w-9 h-9" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Instagram page"
        >
          <Insta className="w-9 h-9" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
