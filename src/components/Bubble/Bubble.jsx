/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const Bubble = ({ className, overlapGroupClassName, itemInfo }) => {
  return (
    <div className={`bubble ${className}`}>
      <div className={`overlap-group ${overlapGroupClassName}`}>
        <div className="text-wrapper">{itemInfo[0]}</div>
        <div className="div">{itemInfo[1]}</div>
        <div className="text-wrapper-2">Price</div>
      </div>
    </div>
  );
};
