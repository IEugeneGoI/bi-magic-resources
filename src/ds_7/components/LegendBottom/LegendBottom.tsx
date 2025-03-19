import React from "react";
import RectSegment from "../RectSegment/RectSegment";
import TextSegment from "../TextSegment/TextSegment";
import { rectSizes } from "../../utils/svgSizes";
import { colorsComponents } from "../../utils/colors";
import styles from "../Bar/BarStyles.module.scss";

const legendNames = [
  { front: `Клиентская часть` },
  { back: `Серверная часть` },
  { db: `База данных` },
];

const LegendBottom = ({ width, height, gap }) => {
  const {
    rectLegend: { RECT_RX, RECT_RY, RECT_WIDTH, RECT_HEIGHT },
  } = rectSizes;
  const { text, text_legend } = styles;

  const renderLegendBottom = legendNames.map((legend, index) => {
    const key = Object.keys(legend)[0];
    const name = legend[key];

    const yRect = height * 1.53;
    const xRect =
      index === 0
        ? index * (width + gap) + width * 1.5
        : index * (width + gap) + width * 1.5 + gap * 0.3;
    const xText =
      index === 0
        ? index * (width + gap) + width * 2.3
        : index * (width + gap) + width * 2.53;
    const yText = height * 1.57;

    return (
      <g key={key}>
        <RectSegment
          x={xRect}
          y={yRect}
          rx={RECT_RX}
          ry={RECT_RY}
          width={RECT_WIDTH}
          height={RECT_HEIGHT}
          rectFill={colorsComponents[key]}
        />
        <TextSegment
          x={xText}
          y={yText}
          valueText={name}
          styleClass={`${text} ${text_legend}`}
        />
      </g>
    );
  });

  return <>{renderLegendBottom}</>;
};

export default LegendBottom;
