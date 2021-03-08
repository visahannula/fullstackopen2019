import React, { useState, useEffect } from 'react';
import './App.css';

import SearchInput from './SearchInput';
import CountryLister from './CountryLister';

import RestCountries from '../RestCountries';


const restCountries = new RestCountries();
restCountries.filters = ["name", "alpha3Code", "nativeName"];

/**
 * Form the list of values based on a filter value.
 * 
 * @param {String} searchInputValue Input field value to use for filtering
 * @param {Array} countryListValues Array of all the countries
 * @returns {Array} Array of values
 */
/*const currDispList = (searchInputValue, countryListValues) => {
  if (searchInputValue.isEmpty) {
    //console.log(countryListValues);
    return countryListValues;
  } else {
    return countryListValues.filter((item) => {
      console.log("Found ? : ", item.name.indexOf(searchInputValue));
      return item.name.indexOf(searchInputValue) > -1;
    }
    )
  }
}
*/

function App() {
  const [searchInputValue, setSearchInputValue] = useState(
    { inputValue: "", isEmpty: true }
  );
  // All countries
  const [countryListValues, setCountryListValues] = useState(
    { countries: [] }
  );
  // Currently displayed countries
  const [currListValues, setCurrListValues] = useState(countryListValues);

  // initial get for the list of countries
  useEffect(() => {
    console.log("Getting data");

    restCountries.all(response => {
      console.log("Effect got: " + response[0]);
      
      if (response) {
        setCountryListValues({ countries: response });
        setCurrListValues({ countries: response });
      }
    });
  },
    []
  );

  // sideeffect for search input field
  useEffect(() => {
    console.log("Effect hook: ", searchInputValue);

    let inValue = { countries: [] };

    if (searchInputValue.isEmpty) {
      inValue = countryListValues;
    } else {
      inValue.countries =
        countryListValues
          .countries
          .filter(country => 
            /* Search input from two country item props */
            ["name", "nativeName", "alpha3Code"].reduce((prev, curr, index, arr) =>
              country[arr[index]]
              .toLowerCase()
              .indexOf(
                searchInputValue
                  .inputValue
                  .toLowerCase()
              ) > -1 || prev
            , false)
          );
    }

    setCurrListValues(inValue);
  },
    [setCurrListValues, searchInputValue, countryListValues]
  );

  return (
    <div className="App">
      <div id="searchContainer">
        <p>Search for countries by writing below</p>
        <SearchInput
          setValueCallback={setSearchInputValue}
        />
      </div>
      <div id="countryListContainer">
        {<CountryLister list={currListValues.countries} />}
      </div>
      <div id="singleCountryContainer">
        { /* Single country information */}
      </div>
      <div>The data for this service is provided by <a href="https://restcountries.eu/" target="_blank" rel="noopener noreferrer">https://restcountries.eu/</a> Thank you!</div>
    </div>
  );
}

export default App;
