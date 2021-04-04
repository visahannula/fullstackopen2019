import React, { useState } from 'react';
import './SearchInput.css';


export const SearchInput = ({ setValueCallback, isInputEnabled }) => {
    const [visibleInputValue, setVisibleInputValue] = useState("");
    const [timeoutID, settimeoutID] = useState(0);

    const checkSetInputValue = ({ target: { value } }) => {
        const valueTrim = value.trim();
        if (valueTrim !== "") console.log("Input value is empty. Stored: ", visibleInputValue);
        if (value !== visibleInputValue) {
            console.log("Input value changed. ", value);
            setVisibleInputValue(value);
            clearTimeout(timeoutID); // debouncing
            settimeoutID(
                setTimeout(
                    updateInputState,
                    500,
                    value
                )
            );
        }
    }

    const updateInputState = (inValue, callback) => {
        setValueCallback(
            {
                inputValue: inValue,
                isEmpty: !!!inValue
            }
        );
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