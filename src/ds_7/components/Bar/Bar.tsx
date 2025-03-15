import React from "react";
import TextSegment from "../TextSegment/TextSegment";
import PathSegment from "../PathSegment/PathSegment";
import "./style.module.scss";
import { colorsComponents } from "./../../utils/colors";

const Bar = ({ data, instances, components, width, gap, height }) => {
    const renderBar = instances.map((inst, index) => {
        let yOffset = height;

        return (
            <g
                key={inst}
                transform={`translate(${index * (width + gap) + 80}, 0)`}
            >
                {components.map((comp, compIndex) => {
                    const barHeight = data[inst][comp];
                    yOffset -= barHeight;

                    const isFirst = compIndex === 0;
                    const isLast = compIndex === components.length - 1;
                    const radius = 10;

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
            Z
          `;

                    const pathUpAngles = `
            M ${radius} ${yOffset}
            Q 0 ${yOffset} 0 ${yOffset + radius}
            L 0 ${yOffset + barHeight}
            L ${width} ${yOffset + barHeight}
            L ${width} ${yOffset + radius}
            Q ${width} ${yOffset} ${width - radius} ${yOffset}
            L ${radius} ${yOffset}
            Z
          `;

                    const pathRect = `
            M 0 ${yOffset}
            L ${width} ${yOffset}
            L ${width} ${yOffset + barHeight}
            L 0 ${yOffset + barHeight}
            Z
          `;

                    const path = isLast
                        ? pathUpAngles
                        : isFirst
                        ? pathDownAngles
                        : pathRect;

                    return (
                        <g key={comp}>
                            <PathSegment d={path} fill={colorsComponents[comp]} />
                            <TextSegment
                                x={width / 2}
                                y={yOffset + barHeight / 2}
                                valueText={data[inst][comp]}
                            />
                        </g>
                    );
                })}
            </g>
        );
    });

    const renderBarNormal = () => {
        const dPathSegment = `M 10 ${height - data.norm} 
            L ${width - 10} ${height - data.norm} 
            Q ${width} ${height - data.norm} ${width} ${
            height - data.norm + 10
        } 
            L ${width} ${height - 10} 
            Q ${width} ${height} ${width - 10} ${height} 
            L 10 ${height} 
            Q 0 ${height} 0 ${height - 10} 
            L 0 ${height - data.norm + 10} 
            Q 0 ${height - data.norm} 10 ${height - data.norm} 
            Z`;

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
                        <rect
                            x="10"
                            width="10"
                            height="20"
                            fill={colorsComponents.front}
                        />
                    </pattern>
                </defs>
                <g
                    transform={`translate(${
                        instances.length * (width + gap) + 80
                    }, 0)`}
                >
                    <PathSegment
                        d={dPathSegment}
                        fill={`url(#stripePattern)`}
                    />
                    <TextSegment
                        x={width / 2}
                        y={height - data.norm / 2}
                        valueText={data.norm}
                    />
                </g>
            </>
        );
    };

    return (
        <>
            {renderBar}
            {renderBarNormal()}
        </>
    );
};
export default Bar;
