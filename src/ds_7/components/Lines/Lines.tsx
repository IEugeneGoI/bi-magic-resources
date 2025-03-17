import React from "react";
import ArrowSegment from "../ArrowSegment/ArrowSegment";
import PolygonSegment from "../PolygonSegment/PolygonSegment";
import RectSegment from "../RectSegment/RectSegment";
import TextSegment from "../TextSegment/TextSegment";
import Arrow from "../Arrow/Arrow";
import { getTotal } from "./../../utils/getTotal";
import { colorsRect } from "./../../utils/colors";
import styles from "./LinesSyles.module.scss";

const Lines = ({ data, instances, width, gap, height, offset }) => {
    const { line_diffrence } = styles;

    const renderLines = instances.slice(0, -1).map((inst, index) => {
        const totalCurrent = getTotal(data, inst);
        const totalNext = getTotal(data, instances[index + 1]);
        const diff = totalNext - totalCurrent;
        const { red, green } = colorsRect;

        const xM =
            index === 0
                ? width + width / 2
                : index * (width + gap) + width + width / 2 + offset * 1.1;
        const yM = height - totalCurrent - offset;
        const yH1 = totalCurrent - height;
        const yH2 = height - totalNext;
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
        const yPolygon = height - totalNext - offset * 1.33;

        const xRect = (index + 1) * (width + gap) + width / 2 - offset * 1.55;
        const yRect = height - 241;
        const rectFill = diff > 0 ? green : red;

        const xText = (index + 1) * (width + gap) + width / 2 + offset * 1.7;
        const yText = height - 224;
        const valueText = diff > 0 ? `+${diff}` : `-${Math.abs(diff)}`;

        const xArrow = (index + 1) * (width + gap) + width / 2 - offset * 0.6;
        const yArrow = height - 235;

        return (
            <g key={inst}>
                <ArrowSegment
                    xM={xM}
                    yM={yM}
                    yH1={yH1}
                    yH2={yH2}
                    xWidth={xWidth}
                />
                <PolygonSegment x={xPolygon} y={yPolygon} />
                <RectSegment x={xRect} y={yRect} rectFill={rectFill} />
                <TextSegment
                    x={xText}
                    y={yText}
                    valueText={valueText}
                    styleClass={line_diffrence}
                />
                <Arrow x={xArrow} y={yArrow} diff={diff} />
            </g>
        );
    });

    return <>{renderLines}</>;
};

export default Lines;
