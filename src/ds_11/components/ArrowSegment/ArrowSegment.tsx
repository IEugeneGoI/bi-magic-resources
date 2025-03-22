import React from "react";
import PathSegment from "../PathSegment/PathSegment";
import "./style.scss";

const ArrowSegment = ({ xM, yM, yH1, yH2, xWidth }) => {

  return (
    <>
      <PathSegment
        d={`M ${xM},${yM} v ${yH1} h ${xWidth} v ${yH2}`}
        fill={`none`}
      />
    </>
  );
};
export default ArrowSegment;
