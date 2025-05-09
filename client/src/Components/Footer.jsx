import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="continer px-4 2xl:px-20 mx-auto  flex items-center  justify-between gap-4 py-3 mt-20">
      <img width={160} src={assets.logo} alt="" />
      <p
        className="flex-1 border-l border-gray-40  pl-4 text-smtexgra50
      max-sm:hidden "
      >
        Copyright @Yogesh.dev | All right reserved.
      </p>

      <div className="flex gap-2.5">
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
