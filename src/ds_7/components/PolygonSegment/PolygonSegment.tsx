import React from "react";
import PathSegment from "../PathSegment/PathSegment";

const PolygonSegment = ({ x, y }) => {
  const dPolygonSegment = `M${x + 3.02},${y + 2.36} L${x + 3.97},${y + 2.36} L${
    x + 6.18
  },${y + 0.14} 
  C${x + 6.37},${y - 0.05} ${x + 6.67},${y - 0.05} ${x + 6.86},${y + 0.14} 
  C${x + 7.04},${y + 0.32} ${x + 7.04},${y + 0.62} ${x + 6.86},${y + 0.81} 
  L${x + 3.83},${y + 3.85} C${x + 3.65},${y + 4.04} ${x + 3.34},${y + 4.04} ${
    x + 3.16
  },${y + 3.85} 
  L${x + 0.13},${y + 0.81} C${x - 0.05},${y + 0.62} ${x - 0.05},${y + 0.32} ${
    x + 0.13
  },${y + 0.14} 
  C${x + 0.32},${y - 0.05} ${x + 0.62},${y - 0.05} ${x + 0.81},${y + 0.14} L${
    x + 3.02
  },${y + 2.36}Z`;

  const filldPolygonSegment = `rgb(137, 130, 144)`;

  return (
    <>
      <PathSegment d={dPolygonSegment} fill={filldPolygonSegment} />;
    </>
  );
};

export default PolygonSegment;
