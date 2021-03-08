import React from 'react';
import "./CountryLister.css";

const StatusCircle = ({isRed}) => {
    const green = <span role="img" aria-label="green circle">🟢</span>;
    const red = <span role="img" aria-label="red circle">🔴</span>;

    return isRed ? red : green;
}

const SingleCountryListItem = ({ country: { name, alpha3Code, nativeName }}, { id }) =>
    <li id={ "country_" + id }>
        <p><span className="countryCode">{alpha3Code}</span>{name}, {nativeName}</p>
    </li>;


const CountryLister = ({ list }) => {
    let countryComponentList = <></>;
    let isListEmpty = true;

    console.log("Listing: ", list);

    if (list.length < 1 || !Array.isArray(list)) {
        console.log("List", list);
        console.log("Typeof: ", Array.isArray(list));

        isListEmpty = true;
        countryComponentList = <li>Found countries will be listed here.</li>;
    } else {
        isListEmpty = false;
        countryComponentList = list.map((value, index) =>
            <SingleCountryListItem country={ value } key={ index } id={ index } />
        );
    }

    return (
        <>
            <p><StatusCircle isRed={ isListEmpty }></StatusCircle> Found {list.length} countries.</p>
            <ul>
                { countryComponentList }
            </ul>
        </>
    )
}

export default CountryLister;