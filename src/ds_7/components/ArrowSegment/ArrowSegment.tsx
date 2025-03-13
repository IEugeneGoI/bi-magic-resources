import React from "react";
import PathSegment from "../PathSegment/PathSegment";
import "./style.scss";

const ArrowSegment = ({ xM, yM, yH1, yH2, xWidth }) => {
  const fillArrowSegment = `none`;
  return (
    <>
      <PathSegment
        d={`M ${xM},${yM} v ${yH1} h ${xWidth} v ${yH2}`}
        fill={fillArrowSegment}
      />
    </>
  );
};
export default ArrowSegment;
