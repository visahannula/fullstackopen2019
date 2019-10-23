import React, { useState } from 'react'

import PhonebookAddForm from './PhonebookForm';
import ContactList from './ContactList';


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '+358 040 123' },
        { name: 'Michael Knight', number: '+555 555'},
        { name: 'Arnold Stallone', number: '+555 2310'}
    ]);

    const [filteredPersons, setFilteredPersons] = useState(persons);
    const [filter, setFilter] = useState('');

    const handlerSearchInputChange = event => {
        const filterValue = event.target.value.trim().toLowerCase();
        setFilter(filterValue);
        setFilteredPersons( () =>
            filterValue === ''
            ?
            persons
            :
            persons.filter(curr =>
                (curr
                    .name
                    .toLowerCase()
                    .indexOf(filterValue) > -1)
                ||
                (curr
                    .number
                    .toLowerCase()
                    .indexOf(filterValue) > -1)
                ?
                    true
                :
                    false
            )
        )
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <div>
                <input 
                    type="text"
                    value={filter}
                    onChange={handlerSearchInputChange}
                />
            </div>
            <PhonebookAddForm 
                persons={persons}
                setPersons={setPersons}
            />
            <ContactList persons={filteredPersons} />
        </div>
    )
}

export default App