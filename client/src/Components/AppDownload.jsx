import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative card bg-gradient-to-r from-primary/10 to-secondary/10 p-12 sm:p-24 lg:p-32 rounded-lg overflow-hidden shadow-md">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 max-w-md text-base-content">
          Download Our Mobile App for a Better Experience
        </h1>
        <div className="flex gap-4">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the Play Store"
          >
            <img
              className="h-12"
              src={assets.play_store}
              alt="Download on the Play Store"
            />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
          >
            <img
              className="h-12"
              src={assets.app_store}
              alt="Download on the App Store"
            />
          </a>
        </div>
        <img
          className="absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden"
          src={assets.app_main_img}
          alt="Mobile app preview"
        />
      </div>
    </div>
  );
};

export default AppDownload;
