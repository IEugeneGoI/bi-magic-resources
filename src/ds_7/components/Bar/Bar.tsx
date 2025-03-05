import React from "react";

const COLORS = { front: "#ff7f0e", back: "#2ca02c", db: "#1f77b4" };

const Bar = ({ data, instances, components, width, gap, height }) => {
    const renderBar = instances.map((inst, index) => {
        let yOffset = height;

        return (
            <g
                key={inst}
                transform={`translate(${index * (width + gap) + 80}, 0)`}
            >
                {components.map((comp) => {
                    const barHeight = data[inst][comp];
                    yOffset -= barHeight;

                    return (
                        <>
                            <rect
                                key={comp}
                                x={0}
                                y={yOffset}
                                width={width}
                                height={barHeight}
                                fill={COLORS[comp]}
                            />
                            <text
                                x={width / 2}
                                y={yOffset + barHeight / 2}
                                fontSize="14"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontWeight="bold"
                            >
                                {data[inst][comp]}
                            </text>
                        </>
                    );
                })}
            </g>
        );
    });

    return (
        <>
            {renderBar}
            <g>
                <rect
                    x={instances.length * (width + gap) + 80}
                    y={height - data.norm}
                    width={width}
                    height={data.norm}
                    fill="gray"
                />
                <text
                    transform={`translate(${
                        instances.length * (width + gap) + 80
                    }, 0)`}
                    x={width / 2}
                    y={height - data.norm / 2}
                    fontSize="14"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontWeight="bold"
                >
                    {data.norm}
                </text>
            </g>
        </>
    );
};
export default Bar;
