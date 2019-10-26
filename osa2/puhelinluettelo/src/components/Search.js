import React from 'react';

import './Search.css';

const Search = ({
    persons,
    filter,
    setFilter,
    setFilteredPersons }) => {
    const handlerSearchInputChange = event => {
        const filterValue = event.target.value.toLowerCase();
        setFilter(filterValue);

        const findWordLC = (word, searchFor) =>
            word.toLowerCase()
                .indexOf(searchFor) > -1;

        setFilteredPersons(() =>
            filterValue === ''
                ?
                persons
                :
                persons.filter(curr =>
                    findWordLC(curr.name, filterValue)
                    ||
                    findWordLC(curr.number, filterValue)
                )
        );
    }

    return (
        <><h2>Search contacts</h2>
            <div id="searchInputContainer">
                <label htmlFor="searchInput">Name or number</label>
                <input
                    id="searchInput"
                    name="searchInput"
                    type="text"
                    value={filter}
                    onChange={handlerSearchInputChange}
                    autoFocus
                />
            </div>
        </>
    )
};

export default Search;