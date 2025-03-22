import React from "react";
import TextSegment from "../TextSegment/TextSegment";
import PathSegment from "../PathSegment/PathSegment";
import RectSegment from "../RectSegment/RectSegment";
import barStyles from "./BarStyles.module.scss";
import { colorsComponents, colorsRect } from "./../../utils/colors";
import { rectSizes } from "../../utils/svgSizes";

const Bar = ({ data, instances, components, width, gap, height, barRefs }) => {
  const { text, text_value, text_legend, text_normal } = barStyles;
  const {
    rectNorm: { RECT_RX, RECT_RY, RECT_WIDTH, RECT_HEIGHT },
  } = rectSizes;
  const radius = 10;
  const maxBarHeight = height / 3;
  const minBarHeight = 24;

  const maxValue = Math.max(
    ...instances.flatMap((inst) => components.map((comp) => data[inst][comp]))
  );

  const normalizedData = instances.reduce((acc, inst) => {
    acc[inst] = components.reduce((innerAcc, comp) => {
      let calculatedHeight =
        maxValue > 0 ? (data[inst][comp] / maxValue) * maxBarHeight : 0;
      innerAcc[comp] =
        data[inst][comp] === 0 ? 0 : Math.max(calculatedHeight, minBarHeight);
      return innerAcc;
    }, {});
    return acc;
  }, {});

  const renderBar = instances.map((inst, index) => {
    let yOffset = height;

    const renderComponents = components.map((comp, compIndex) => {
      const barHeight = normalizedData[inst][comp];
      yOffset -= barHeight;

      const isFirst = compIndex === 0;
      const isLast = compIndex === components.length - 1;

      const pathDownAngles = `
                M 0 ${yOffset}
                L ${width} ${yOffset}
                L ${width} ${yOffset + barHeight - radius}
                Q ${width} ${yOffset + barHeight} ${width - radius} ${
        yOffset + barHeight
      }
                L ${radius} ${yOffset + barHeight}
                Q 0 ${yOffset + barHeight} 0 ${yOffset + barHeight - radius}
                L 0 ${yOffset}
                Z`;

      const pathUpAngles = `
                M ${radius} ${yOffset}
                Q 0 ${yOffset} 0 ${yOffset + radius}
                L 0 ${yOffset + barHeight}
                L ${width} ${yOffset + barHeight}
                L ${width} ${yOffset + radius}
                Q ${width} ${yOffset} ${width - radius} ${yOffset}
                L ${radius} ${yOffset}
                Z`;

      const pathRect = `
                M 0 ${yOffset}
                L ${width} ${yOffset}
                L ${width} ${yOffset + barHeight}
                L 0 ${yOffset + barHeight}
                Z`;

      const path = isLast ? pathUpAngles : isFirst ? pathDownAngles : pathRect;

      return (
        <g key={comp}>
          {barHeight > 0 && (
            <PathSegment d={path} fill={colorsComponents[comp]} />
          )}
          {barHeight > 0 && (
            <TextSegment
              x={width / 2}
              y={yOffset + barHeight / 2}
              valueText={data[inst][comp]}
              styleClass={`${text} ${text_value}`}
            />
          )}
        </g>
      );
    });

    return (
      <g
        key={inst}
        transform={`translate(${index * (width + gap) + width}, 0)`}
        ref={(el) => (barRefs.current[inst] = el)}
      >
        {renderComponents}
        <TextSegment
          x={width / 2}
          y={height + gap / 4}
          valueText={inst}
          styleClass={`${text} ${text_legend}`}
        />
      </g>
    );
  });

  const renderBarNormal = ({ radius }) => {
    const normalizedNorm =
      maxValue > 0 ? (data.norm / maxValue) * maxBarHeight : 0;

    const dPathSegment = `M ${radius} ${height - normalizedNorm} 
            L ${width - radius} ${height - normalizedNorm} 
            Q ${width} ${height - normalizedNorm} ${width} ${
      height - normalizedNorm + radius
    } 
            L ${width} ${height - radius} 
            Q ${width} ${height} ${width - radius} ${height} 
            L ${radius} ${height} 
            Q 0 ${height} 0 ${height - radius} 
            L 0 ${height - normalizedNorm + radius} 
            Q 0 ${height - normalizedNorm} ${radius} ${height - normalizedNorm} 
            Z`;

    const normLegendText = `Норматив`.toLocaleLowerCase();

    const normValue = data.norm.toString();
    const rectWidth =
      normValue.length === 2
        ? RECT_WIDTH / 2
        : normValue.length === 3
        ? RECT_WIDTH
        : width;

    return (
      <>
        <defs>
          <pattern
            id="stripePattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <rect width="10" height="20" fill="white" />
            <rect x="10" width="10" height="20" fill={colorsComponents.front} />
          </pattern>
        </defs>
        <g
          transform={`translate(${
            instances.length * (width + gap) + width
          }, 0)`}
        >
          <PathSegment d={dPathSegment} fill={`url(#stripePattern)`} />
          <RectSegment
            x={(width - rectWidth) / 2}
            y={height - normalizedNorm + (normalizedNorm - RECT_HEIGHT) / 2}
            width={rectWidth}
            height={RECT_HEIGHT}
            rx={RECT_RX}
            ry={RECT_RY}
            rectFill={colorsRect.white}
          />
          <TextSegment
            x={width / 2}
            y={height - normalizedNorm / 2}
            valueText={data.norm}
            styleClass={`${text} ${text_normal}`}
          />
          <TextSegment
            x={width / 2}
            y={height + gap / 4.05}
            valueText={normLegendText}
            styleClass={`${text} ${text_legend}`}
          />
        </g>
      </>
    );
  };

  return (
    <>
      {renderBar}
      {renderBarNormal({ radius })}
    </>
  );
};
export default Bar;
