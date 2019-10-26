import React, { useState } from 'react'

import PhonebookAddForm from './PhonebookForm';
import ContactList from './ContactList';
import Search from './Search';

import './App.css';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '+358 040 123' },
        { name: 'Michael Knight', number: '+555 555' },
        { name: 'Arnold Stallone', number: '+555 2310' }
    ]);

    const [filteredPersons, setFilteredPersons] = useState(persons);
    const [filter, setFilter] = useState('');

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