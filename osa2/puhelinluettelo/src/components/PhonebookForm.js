import React, { useState } from 'react';
import './PhonebookForm.css';

const PhonebookAddForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handlerNameInputOnChange = event => 
        setNewName(event.target.value);

    const handlerNumberInputOnChange = event => 
        setNewNumber(event.target.value);

    const handlerSubmitButtonOnClick = event => {
        event.preventDefault();

        if (newName.trim() === '' || newNumber.trim() === '') {
            alert("You must set value for name and number");
            return
        }
    
        persons.find(person => person.name === newName)
            ? alert(`Name ${newName} already exists in phonebook!`)
            : setPersons([
                    ...persons, 
                    { name: newName, number: newNumber },
                ]);
    }

    return (
        <form>
            <div>
                Name:
                <input 
                    value={newName}
                    onChange={handlerNameInputOnChange}
                />
            </div>
            <div>
                Number:
                <input 
                    type="tel"
                    value={newNumber}
                    onChange={handlerNumberInputOnChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                    onClick={handlerSubmitButtonOnClick}
                >add</button>
            </div>
        </form>
    );
}

export default PhonebookAddForm;