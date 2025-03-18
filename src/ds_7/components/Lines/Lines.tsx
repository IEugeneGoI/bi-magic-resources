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
    const { line_difference, line_difference_zero } = styles;
    const maxBarHeight = height / 3;

    const maxInstanceValue = Math.max(
        ...instances.map((inst) => getTotal(data, inst)),
        1
    );

    const renderLines = instances.slice(0, -1).map((inst, index) => {
        const totalCurrent = getTotal(data, inst);
        const totalNext = getTotal(data, instances[index + 1]);

        const normalizedTotalCurrent =
            maxInstanceValue > 0
                ? (totalCurrent / maxInstanceValue) * maxBarHeight
                : 0;

        const normalizedTotalNext =
            maxInstanceValue > 0
                ? (totalNext / maxInstanceValue) * maxBarHeight
                : 0;

        console.log(
            `tottalcurren: ${normalizedTotalCurrent}, totalNext: ${normalizedTotalNext}, maxBar:${maxBarHeight}`
        );

        const diff = totalNext - totalCurrent;
        const { red, green, grey } = colorsRect;

        const xM =
            index === 0
                ? width + width / 2
                : index * (width + gap) + width + width / 2 + offset * 1.1;
        const yM = normalizedTotalCurrent;
        const yH1 = -maxBarHeight;
        const yH2 =
            maxBarHeight - (normalizedTotalNext - normalizedTotalCurrent);

        console.log(`M:${yM}, H1:${yH1}, H2:${yH2}`);

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
        const yPolygon = maxBarHeight - normalizedTotalNext - offset * 1.2;

        const xRect = (index + 1) * (width + gap) + width / 2 - offset * 1.55;
        const yRect = height - height * 1.14;
        const rectFill = diff > 0 ? green : diff === 0 ? grey : red;

        const xText = (index + 1) * (width + gap) + width / 2 + offset * 1.7;
        const yText = -offset * 1.6;
        const valueText = diff > 0 ? `+${diff}` : diff;
        const lineDifference =
            diff === 0
                ? `${line_difference} ${line_difference_zero}`
                : `${line_difference}`;

        const xArrow = (index + 1) * (width + gap) + width / 2 - offset * 0.6;
        const yArrow = -offset * 2.7;

        return (
            <g key={inst} transform={`translate(0, ${height-normalizedTotalCurrent*4})`}>
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
                    styleClass={lineDifference}
                />
                <Arrow x={xArrow} y={yArrow} diff={diff} />
            </g>
        );
    });

    return <>{renderLines}</>;
};

export default Lines;
