import React from "react";
import SpotifyIcon from "../Icons/SpotifyIcon";

const HeroBottom = () => {
  return (
    <div className="hero overflow-x-scroll h-[100px] w-full sm:mt-8 text-white  opacity-95 top-0 mx-auto flex gap-10 justify-center items-center text-center md:h-[200px] bg-gray-950">
      <div className="flex  justify-center items-center md:gap-4 mt-4 relative flex-wrap text-sm sm:text-md">
        <SpotifyIcon />
        <p className="pl-2">Slack</p>
      </div>

      <div className="flex  justify-center items-center md:gap-4 mt-4 relative flex-wrap text-sm sm:text-md">
        <SpotifyIcon />
        <p className="pl-2">Slack</p>
      </div>

      <div className="flex  justify-center items-center md:gap-4 mt-4 relative flex-wrap text-sm sm:text-md">
        <SpotifyIcon />
        <p className="pl-2">Slack</p>
      </div>

      <div className="flex  justify-center items-center md:gap-4 mt-4 relative flex-wrap text-sm sm:text-md">
        <SpotifyIcon />
        <p className="pl-2">Slack</p>
      </div>
    </div>
  );
};

export default HeroBottom;
