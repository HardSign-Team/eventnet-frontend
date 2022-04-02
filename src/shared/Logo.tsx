import React from "react";
import logo from "../assets/logo.svg";

type LogoSetting = {
  className: string;
  width: number;
  height: number;
};
const Logo = ({ className, width, height }: LogoSetting) => {
  return (
    <img
      src={logo}
      className={className}
      alt="Logo"
      width={width}
      height={height}
    />
  );
};

export default Logo;
