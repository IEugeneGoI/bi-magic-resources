import React from "react";

const RectSegment = ({ x, y, rectFill }) => {
  const RECT_RX = 15;
  const RECT_RY = 15;
  const RECT_WIDTH = 48;
  const RECT_HEIGHT = 24;
  const RECT_OPACITY = 1;

  return (
    <>
      <rect
        x={x}
        y={y}
        rx={RECT_RX}
        ry={RECT_RY}
        width={RECT_WIDTH}
        height={RECT_HEIGHT}
        fill={rectFill}
        opacity={RECT_OPACITY}
      />
    </>
  );
};

export default RectSegment;


