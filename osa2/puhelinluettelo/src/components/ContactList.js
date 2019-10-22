import React from 'react';
import Contact from './Contact';

const ContactList = ({persons}) =>
    <>
    <h2>Contact Numbers</h2>
    <ul>
        { 
            persons.map(person => 
                <Contact key={person.name} name={person.name}/>
            )
        }
    </ul>
    </>;

export default ContactList;