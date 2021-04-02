import React, { useEffect, useState } from 'react';

import "./CountryLister.css";
import { MapIframe } from './MapIframe'

import RestCountries from '../RestCountries';
import { WeatherMapContainer } from './WeatherInfo';

export const StatusCircle = ({ isRed }) => {
    const green = <span role="img" aria-label="green circle">🟢</span>;
    const red = <span role="img" aria-label="red circle">🔴</span>;

    return isRed ? red : green;
}

// TODO: Add container element which decides which to render (list or single element)

export const ExpandedSingleCountry = ({ country: { name, alpha3Code, nativeName }, listId }) => {
    const [isFullData, setIsFullData] = useState(false);
    const [countryData, setCountryData] = useState(undefined);

    console.log("ExpandedSingleCoutry, data given: ", name, alpha3Code, nativeName, listId);

    useEffect(() => {
        function getGetCountryData() {
            const restCountries = new RestCountries();
            restCountries.alpha3code(alpha3Code, (response) => {
                console.info("Data for single country: ", response);
                if (response) {
                    setIsFullData(true);
                    setCountryData(response);
                    console.log("Got a single Country data: ", response);
                }
            });
        }
        getGetCountryData();
    },
        [alpha3Code]
    );

    console.log("IsFullData: ", isFullData);
    console.log("CountryData: ", countryData);

    let countryElement;

    if (isFullData && countryData) { // THIS IS COUNTRY WE HAVE ALL THE INFO AVAILABLE
        const { region, capital, population, topLevelDomain, languages } = countryData;

        countryElement = (
            <div className="card" id={"country_" + listId}>
                <div className="cardContainer">
                    <div className="cardHeader">
                        <div className="countryCode">{alpha3Code}</div>
                        <div className="cardText">{name}, {nativeName}</div>
                    </div>
                    <div className="countryInformation">
                        <div className="leftSide">
                            <h3>Country information</h3>
                            <ul>
                                <li>World region: {region}</li>
                                <li>Capital: {capital}</li>
                                <li>Population: {new Intl.NumberFormat().format(population)}</li>
                                <li>Top level domain: {topLevelDomain}</li>
                                <li>Spoken languages: {languages.map(lang => lang['name']).join(", ")}</li>
                            </ul>
                            <div className="weatherContainer">
                                <h4>Current weather in <b>{capital}</b></h4>
                                <WeatherMapContainer city={capital}></WeatherMapContainer>
                            </div>
                        </div>

                        <div className="rightSide">
                            <div className="flagAndMap">
                                <img className="flag" src={countryData['flag']} alt="flag" />
                                <MapIframe
                                    latitude={countryData['latlng'][0]}
                                    longitude={countryData['latlng'][1]}
                                    className="mapIframe">
                                </MapIframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else { // NO SPECIFIC INFO AVAILABLE FOR THIS COUNTRY (YET)
        countryElement = (
            <div className="card" id={"country_" + listId
            }>
                <div className="cardContainer">
                    <div className="cardHeader">
                        <div className="countryCode">{alpha3Code}</div>
                        <div className="cardText">{name}, {nativeName}</div>
                    </div>
                </div>
                <div className="waiting">Please wait, getting more information.</div>
            </div >
        );
    }

    return countryElement;
}

export const SingleCountryListItem = ({ country: { name, alpha3Code, nativeName }, listId, clickHandler }) => {
    //console.log(name, listId);

    return (
        <div className="card" id={"country_" + listId}>
            <div className="cardContainer" onClick={() => clickHandler({alpha3Code})}> {/* Fetch unique alpha3Code */ }
                <div className="cardHeader">
                    <div className="countryCode">{alpha3Code}</div>
                    <div className="cardText">{name}, {nativeName}</div>
                </div>
            </div>
        </div>
    );
}



export const CountryLister = ({ list, setValueCallback }) => {
    let isListEmpty = list.length < 1;
    let emptyListMessageEl = (<span>No countries found. Try searching with other words.</span>);

    console.info("List", list);

    let countryListContainer = () => emptyListMessageEl;

    if (list.length === 1) {
        countryListContainer = ([country = list[0]]) =>
            <ExpandedSingleCountry
                country={country}
                key={country['alpha3Code']}
                listId={0}
            />
    } else if (list.length > 1) {
        countryListContainer = list => list.map((value, index) =>
            <SingleCountryListItem
                country={value}
                key={value['alpha3Code']}
                listId={index}
                clickHandler={country => setValueCallback(country)}
            />
        );
    }

    return (
        <>
            { list.length === 1
                ? <div
                    className="clickToFullList"
                    onClick={() => setValueCallback({ isEmpty: true })}
                    >⬅ Back to list
                  </div>
                : <p><StatusCircle isRed={isListEmpty} /> Found {list.length} countries.</p>
            }
            <div id="list-container">{countryListContainer(list)}</div>
        </>
    )
}

export default CountryLister;