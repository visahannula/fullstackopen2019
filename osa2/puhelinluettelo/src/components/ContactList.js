import React from 'react';
import Contact from './Contact';
import './ContactList.css';

const EmptyList = () =>
    <>
        <li><b>No contacts found.</b></li>
    </>;

const ContactList = ({ persons }) =>
    <>
        <h2>Contact Numbers</h2>
        <ul>
            {
                persons.length < 1
                ?
                <EmptyList />
                :
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