import React from "react";
import ArrowSegment from "../ArrowSegment/ArrowSegment";
import PolygonSegment from "../PolygonSegment/PolygonSegment";
import RectSegment from "../RectSegment/RectSegment";
import TextSegment from "../TextSegment/TextSegment";
import Arrow from "../Arrow/Arrow";
import { getTotal } from "./../../utils/getTotal";
import { colorsRect } from "./../../utils/colors";
import { rectSizes } from "../../utils/svgSizes";
import styles from "./LinesSyles.module.scss";

const Lines = ({
  data,
  instances,
  width,
  gap,
  height,
  offset,
  instanceHeights,
}) => {
  const { line_difference, line_difference_zero } = styles;
  const {
    rectLines: { RECT_RX, RECT_RY, RECT_WIDTH, RECT_HEIGHT },
  } = rectSizes;

  const renderLines = instances.slice(0, -1).map((inst, index) => {
    const totalCurrent = getTotal(data, inst);
    const totalNext = getTotal(data, instances[index + 1]);
    const nextInst = instances[index + 1];

    const diff = totalNext - totalCurrent;
    const { red, green, grey } = colorsRect;

    const xM =
      index === 0
        ? width + width / 2
        : index * (width + gap) + width + width / 2 + offset * 1.1;
    const yM = height - instanceHeights[inst];
    const yH1 = instanceHeights[inst] - height;
    const yH2 = height - instanceHeights[nextInst];

    const xWidth =
      index === 0
        ? width / 2 + gap + (width * 38.75) / 100
        : width / 2 + gap + (width * 38.75) / 100 - offset * 0.1;

    const xPolygon =
      index === 0
        ? width * 2 + gap + (width * 38.75) / 100 - offset / 2.6
        : (index + 1) * (width + gap) +
          width +
          (width * 38.75) / 100 +
          offset / 1.65;
    const yPolygon = height - instanceHeights[nextInst] * 1.02;

    const xRect = (index + 1) * (width + gap) + width / 2 - offset * 1.55;
    const yRect = yM + yH1 - RECT_HEIGHT / 2;
    const rectFill = diff > 0 ? green : diff === 0 ? grey : red;

    const xText = (index + 1) * (width + gap) + width / 2 + offset * 1.7;
    const yText = yRect + offset * 1.85;
    const valueText = diff > 0 ? `+${diff}` : diff;
    const lineDifference =
      diff === 0
        ? `${line_difference} ${line_difference_zero}`
        : `${line_difference}`;

    const xArrow = (index + 1) * (width + gap) + width / 2 - offset * 0.6;
    const yArrow = yRect + offset * 0.75;

    return (
      <g key={inst}>
        <ArrowSegment xM={xM} yM={yM} yH1={yH1} yH2={yH2} xWidth={xWidth} />
        <PolygonSegment x={xPolygon} y={yPolygon} />
        <RectSegment
          x={xRect}
          y={yRect}
          rx={RECT_RX}
          ry={RECT_RY}
          width={RECT_WIDTH}
          height={RECT_HEIGHT}
          rectFill={rectFill}
        />
        <TextSegment
          x={xText}
          y={yText}
          valueText={valueText}
          styleClass={lineDifference}
        />
        <Arrow x={xArrow} y={yArrow} diff={diff} />
      </g>
    );
  });

  return <>{renderLines}</>;
};

export default Lines;
