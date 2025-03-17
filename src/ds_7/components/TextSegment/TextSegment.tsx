import React from "react";

const TextSegment = ({ x, y, valueText, styleClass }) => {
    const maxChars = 9;
    const cutText =
        valueText.toLocaleString().length > maxChars
            ? valueText.slice(0, maxChars) + ".."
            : valueText;

    return (
        <>
            <text x={x} y={y} className={styleClass}>
                {cutText}
            </text>
        </>
    );
};

export default TextSegment;
