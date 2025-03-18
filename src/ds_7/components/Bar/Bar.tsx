import React from "react";
import TextSegment from "../TextSegment/TextSegment";
import PathSegment from "../PathSegment/PathSegment";
import barStyles from "./BarStyles.module.scss";
import { colorsComponents } from "./../../utils/colors";

const Bar = ({ data, instances, components, width, gap, height, barRefs  }) => {
  const { text, text_value, text_legend, text_normal } = barStyles;
  const radius = 10;
  const maxBarHeight = height / 3;

  const maxValue = Math.max(
    ...instances.flatMap((inst) => components.map((comp) => data[inst][comp]))
  );

  const normalizedData = instances.reduce((acc, inst) => {
    acc[inst] = components.reduce((innerAcc, comp) => {
      innerAcc[comp] =
        maxValue > 0 ? (data[inst][comp] / maxValue) * maxBarHeight : 0;
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
          <PathSegment d={path} fill={colorsComponents[comp]} />
          <TextSegment
            x={width / 2}
            y={yOffset + barHeight / 2}
            valueText={data[inst][comp]}
            styleClass={`${text} ${text_value}`}
          />
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
      normValue.length === 2 ? 24 : normValue.length === 3 ? 48 : width;

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

          <rect
            x={(width - rectWidth) / 2}
            y={height - normalizedNorm + (normalizedNorm - 24) / 2}
            width={rectWidth}
            height="24"
            rx="5"
            ry="5"
            fill="white"
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
