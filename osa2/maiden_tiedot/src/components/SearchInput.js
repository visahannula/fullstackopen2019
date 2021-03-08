import React, { useState, useEffect } from 'react';


const SearchInput = ({ setValueCallback }) => {
    const [inputValue, setInputValue] = useState("");
    
    useEffect(() => {
        console.log("Effect hook");
        setValueCallback(
            {
                inputValue: inputValue,
                isEmpty: !!!inputValue
            }
        );
    },
        [setValueCallback, inputValue]
    );

    return (
        <input
            onChange={ ({target: {value}}) => setInputValue(value) }
            value={ inputValue }
            placeholder="Enter country name"
        />
    )
}

export default SearchInput;