import React, { useState } from 'react'
import ContactList from './ContactList';


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handlerNameInputOnChange = event => 
        setNewName(event.target.value);
    
    const handlerSubmitButtonOnClick = event => {
        event.preventDefault();
        
        persons.find(person => person.name === newName)
            ? alert(`Name ${newName} already exists in phonebook!`)
            : setPersons([...persons, { name: newName}]);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name:
                    <input 
                        value={newName}
                        onChange={handlerNameInputOnChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={handlerSubmitButtonOnClick}
                    >add</button>
                </div>
            </form>
        <ContactList persons={persons}/>
    </div>
    )

}

export default App