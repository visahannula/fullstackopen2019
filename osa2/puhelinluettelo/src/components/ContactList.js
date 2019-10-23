import React from 'react';
import Contact from './Contact';
import './ContactList.css';

const ContactList = ({persons}) =>
    <>
    <h2>Contact Numbers</h2>
    <ul>
        {
            persons.map(person => 
                <Contact 
                    key={person.name} 
                    name={person.name}
                    number={person.number}
                />
            )
        }
    </ul>
    </>;

export default ContactList;