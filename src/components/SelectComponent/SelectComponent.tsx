import React from "react";
import { DATA_URLS } from "../../api/fetchData";
import "./index.scss";

const SelectComponent = ({ selectedOption, handlerChange }) => {
    const renderOptions = DATA_URLS.map((url, index) => (
        <option value={url}>{`URL${index + 1}`}</option>
    ));

    return (
        <>
            <select
                name="urlList"
                value={selectedOption}
                onChange={handlerChange}
            >
                {renderOptions}
            </select>
        </>
    );
};

export default SelectComponent;
