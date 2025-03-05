import React from "react";
import { getTotal } from "./../../utils/getTotal";

const Lines = ({ data, instances, width, gap, height, offset }) => {
    const renderLines = instances.slice(0, -1).map((inst, index) => {
        const totalCurrent = getTotal(data, inst);
        const totalNext = getTotal(data, instances[index + 1]);
        const diff = totalNext - totalCurrent;

        return (
            <g key={inst}>
                <line
                    x1={index * (width + gap) + 80 + width / 2}
                    y1={height - totalCurrent - offset}
                    x2={(index + 1) * (width + gap) + 80 + width / 2}
                    y2={height - totalNext - offset}
                    stroke="yellow"
                    strokeWidth={4}
                />
                <polygon
                    points={`${
                        (index + 1) * (width + gap) + 80 + width / 2 - 8
                    },${height - totalNext - offset - 8} 
                ${(index + 1) * (width + gap) + 80 + width / 2 + 8},${
                        height - totalNext - offset
                    } 
                ${(index + 1) * (width + gap) + 80 + width / 2 - 8},${
                        height - totalNext - offset + 8
                    }`}
                    fill="yellow"
                />
                <rect
                    x={(index + 0.5) * (width + gap) + 65}
                    y={height - Math.max(totalCurrent, totalNext) - 35}
                    width={40}
                    height={20}
                    fill="white"
                    opacity={0.7}
                />
                <text
                    x={(index + 0.5) * (width + gap) + 85}
                    y={height - Math.max(totalCurrent, totalNext) - 20}
                    fontSize="14"
                    textAnchor="middle"
                    fill="red"
                    fontWeight="bold"
                >
                    {diff > 0 ? `+${diff}` : diff}
                </text>
            </g>
        );
    });

    return <>{renderLines}</>;
};

export default Lines;
