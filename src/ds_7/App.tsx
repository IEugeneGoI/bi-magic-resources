import React, { useEffect, useState, useMemo } from "react";
import Bar from "./components/Bar/Bar";
import Lines from "./components/Lines/Lines";
import { svgSizes } from "./utils/svgSizes";
import { getInstances, getComponents } from "./utils/getTotal";
import { fetchData, DATA_URLS } from "./api/fetchData";
import "./App.scss";

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { width, height, barWidth, barGap, arrowOffset } = svgSizes;

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData(DATA_URLS[0]);
                setData(data);
                setLoading(false);
                console.log(data);
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
    if (!data || Object.keys(data).length === 0)
        return <p>No data available</p>;

    const instances = getInstances(data);
    const components = getComponents(data, instances);


    return (
        <div className="container">
            <h1>{data.title}</h1>
            <svg viewBox={`0 ${width} ${height}`}>
                <Bar
                    data={data}
                    instances={instances}
                    components={components}
                    width={barWidth}
                    gap={barGap}
                    height={height}
                />
                <Lines
                    data={data}
                    instances={instances}
                    width={width}
                    gap={barGap}
                    height={height}
                    offset={arrowOffset}
                />
            </svg>
        </div>
    );
};

export default App;
