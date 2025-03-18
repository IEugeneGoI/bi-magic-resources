import React from "react";

const RectSegment = ({ x, y, rx, ry, width, height, rectFill }) => {
  return (
    <>
      <rect
        x={x}
        y={y}
        rx={rx}
        ry={ry}
        width={width}
        height={height}
        fill={rectFill}
      />
    </>
  );
};

export default RectSegment;
