import React from "react";
import { colorsRect } from "./../../utils/colors";

const TextSegment = ({ x, y, valueText }) => {
    const { white } = colorsRect;
    const TEXT_FONT_SIZE = 14;
    const TEXT_ANCHOR = `middle`;
    const TEXT_FILL = white;
    const TEXT_FONT_WEIGHT = 700;

    const maxChars = 3;
    const cutText =
        valueText.toLocaleString().length > maxChars
            ? valueText.slice(0, maxChars) + ".."
            : valueText;

    return (
        <>
            <text
                x={x}
                y={y}
                fontSize={TEXT_FONT_SIZE}
                textAnchor={TEXT_ANCHOR}
                fill={TEXT_FILL}
                fontWeight={TEXT_FONT_WEIGHT}
            >
                {cutText}
            </text>
        </>
    );
};

export default TextSegment;
