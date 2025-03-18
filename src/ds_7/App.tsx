import React, { useEffect, useState } from "react";
import Bar from "./components/Bar/Bar";
import Lines from "./components/Lines/Lines";
import { svgSizes } from "./utils/svgSizes";
import { getInstances, getComponents } from "./utils/getTotal";
import { fetchData, DATA_URLS } from "./api/fetchData";
import "./index.scss";
import TextSegment from "./components/TextSegment/TextSegment";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { barWidth, barGap, arrowOffset, viewWidth, viewHeight } = svgSizes;

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData(DATA_URLS[2]);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!data) return <p>No data available</p>;
  if (!data || Object.keys(data).length === 0) return <p>No data available</p>;

  const instances = getInstances(data);
  const components = getComponents(data, instances);
  const titleText = `Количество пройденных тестов "${data.title}"`;

  return (
    <div className="container">
      <div className="svg-wrapper">
        <svg
          width={viewWidth}
          height={viewHeight}
          viewBox={`0 60 ${viewWidth} ${viewHeight}`}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <TextSegment
            x={barGap / 1.2}
            y={0}
            valueText={titleText}
            styleClass={`title`}
          />
          <g transform={`translate(0, ${barGap})`}>
            <Bar
              data={data}
              instances={instances}
              components={components}
              width={barWidth}
              gap={barGap}
              height={viewHeight}
            />
            <Lines
              data={data}
              instances={instances}
              width={barWidth}
              gap={barGap}
              height={viewHeight}
              offset={arrowOffset}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default App;
