import React from "react";
import { rectSizes } from "./rectSizes";

const RectSegment = ({ x, y, rectFill }) => {
    const { RECT_RX, RECT_RY, RECT_WIDTH, RECT_HEIGHT, RECT_OPACITY } =
        rectSizes;

    return (
        <>
            <rect
                x={x}
                y={y}
                rx={RECT_RX}
                ry={RECT_RY}
                width={RECT_WIDTH}
                height={RECT_HEIGHT}
                fill={rectFill}
                opacity={RECT_OPACITY}
            />
        </>
    );
};

export default RectSegment;
