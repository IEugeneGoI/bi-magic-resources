import React from "react";

const TextSegment = ({ x, y, valueText, styleClass }) => {
  return (
    <>
      <text x={x} y={y} className={styleClass}>
        {valueText}
      </text>
    </>
  );
};

export default TextSegment;
