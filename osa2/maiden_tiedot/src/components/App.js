import React, { useState, useEffect } from 'react';
import './App.css';

import SearchInput from './SearchInput';
import CountryLister from './CountryLister';

import RestCountries from '../RestCountries';


const restCountries = new RestCountries();

function App() {
  // All countries
  const [countryListValues, setCountryListValues] = useState(
    { countries: [] }
  );
  // Currently displayed countries
  const [currListValues, setCurrListValues] = useState([]);
  const [isCountryListFetched, setIsCountryListFetched] = useState(false);

  // initial get for the list of all countries
  useEffect(() => {
    console.log("Getting data");

    restCountries.filters = ["name", "alpha3Code", "nativeName"];
    restCountries.all(response => {
      if (response) {
        setCountryListValues({ countries: response });
        setCurrListValues(response);
        setIsCountryListFetched(true);
      } else {
        console.log("Cannot get countries.");
      }
    });
  },
    []
  );

  const inputValueHandler = (input) => {
    console.log("In inputvalue handler. ", input);

    if (!input || (input.hasOwnProperty('isEmpty') && input.isEmpty)) {
      setCurrListValues(countryListValues.countries); // show everything if nothing set
    } else if (input.hasOwnProperty('inputValue')) {
      setCurrListValues(
        filterFunc(countryListValues.countries, ["name", "nativeName", "alpha3Code"], input.inputValue)
      );
    } else if (input.hasOwnProperty('alpha3Code')) {
      setCurrListValues(
        filterFunc(countryListValues.countries, ["alpha3Code"], input['alpha3Code'])
      );
    }
  }

  /**
   * Search input value from each country properties.
   */
  const filterFunc = (countryObjArray, countryPropKeyArray, valueToSearch) =>
    countryObjArray.filter(arrItem =>
      countryPropKeyArray.some(currKey =>
        arrItem[currKey]
          .toLowerCase()
          .indexOf(valueToSearch.toLowerCase()) > -1)
    );

  return (
    <div className="App">
      <div id="searchContainer">
        <p>Search for countries by writing below</p>
        <SearchInput
          isInputEnabled={isCountryListFetched} setValueCallback={inputValueHandler}
        />
      </div>
      <div id="countryListContainer">
        {<CountryLister list={currListValues} setValueCallback={inputValueHandler} />}
      </div>
      <div id="footer">The data for this service is provided by <a href="https://restcountries.eu/" target="_blank" rel="noopener noreferrer">https://restcountries.eu/</a> Thank you!</div>
    </div>
  );
}

export default App;
