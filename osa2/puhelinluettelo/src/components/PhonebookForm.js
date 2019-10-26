import React, { useState } from 'react';
import './PhonebookForm.css';

const PhonebookAddForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handlerNameInputOnChange = event =>
        setNewName(event.target.value);

    const handlerNumberInputOnChange = event =>
        setNewNumber(event.target.value);

    const handlerSubmitButtonOnClick = event => {
        event.preventDefault();

        const name = newName.trim();
        const number = newNumber.trim();

        if (name === '' || number === '') {
            alert("You must set value for name and number");
            return
        }

        if (persons.find(person => person.name === name)) {
            alert(`Name ${name} already exists in phonebook!`);
            return;
        }

        setPersons([
            ...persons,
            { name: name, number: number },
        ]);
        
        alert(`Added ${name} with number ${number} to phonebook.`);

        setNewName('');
        setNewNumber('');
    }

    return (
        <div className="formContainer">
            <h2>Add numbers</h2>
            <form>
                <div id="nameField">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        id="name"
                        value={newName}
                        onChange={handlerNameInputOnChange}
                    />
                </div>
                <div id="numberField">
                    <label htmlFor="number">Number</label>
                    <input
                        name="number"
                        id="number"
                        type="tel"
                        value={newNumber}
                        onChange={handlerNumberInputOnChange}
                    />
                </div>
                <div id="submitButton">
                    <button
                        type="submit"
                        onClick={handlerSubmitButtonOnClick}
                    >Add contact</button>
                </div>
            </form>
        </div>

    );
}

export default PhonebookAddForm;