import React, { useState } from 'react';
import './SearchInput.css';


export const SearchInput = ({ setValueCallback, isInputEnabled }) => {
    const [visibleInputValue, setVisibleInputValue] = useState("");
    const [internalInputValue, setInternalInputValue] = useState("");

    const checkSetInputValue = ({ target: { value } }) => {
        const valueTrim = value.trim();

        if (valueTrim !== "") console.log("Input value is empty. Stored: ", internalInputValue);

        if (value !== internalInputValue) {
            console.log("Input value changed. ", value);
            setInternalInputValue(value);
            setVisibleInputValue(value);
            setValueCallback(
                {
                    inputValue: valueTrim,
                    isEmpty: !!!valueTrim
                }
            );
        }
    }

    return (
        <input
            disabled={!isInputEnabled}
            onChange={checkSetInputValue}
            value={visibleInputValue}
            placeholder={isInputEnabled ? "Enter country name" : "Country list not available."}
            type="search"
        />
    )
}

export default SearchInput;