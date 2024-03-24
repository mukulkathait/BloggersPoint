import React from "react";
import logo from "../assets/logo.png";

function Logo({ width = "100px", height = "100px" }) {
  return (
    <div>
      <img src={logo} height={height} width={width} alt="Logo" />
    </div>
  );
}

export default Logo;
