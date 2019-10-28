import React, { useState, useEffect } from 'react'
import axios from 'axios';

import PhonebookAddForm from './PhonebookForm';
import ContactList from './ContactList';
import Search from './Search';

import './App.css';

const API_HOST = process.env.REACT_APP_API_HOSTNAME || "localhost";
const API_PORT = process.env.REACT_APP_API_PORT || 3001;

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
            axios
                .get(`http://${API_HOST}:${API_PORT}/persons`)
                .then(response => setPersons(response.data))
                .catch(error => {
                    console.error("Error getting data. ", error);
            });
        },
        []
    );

    return (
        <div>
            <h1>Phonebook</h1>
            <Search
                persons={persons}
                filter={filter}
                setFilter={setFilter}
                setFilteredPersons={setFilteredPersons}
            />
            <PhonebookAddForm
                persons={persons}
                setPersons={setPersons}
            />
            <ContactList persons={filter === '' ? persons : filteredPersons} />
        </div>
    )
}

export default App