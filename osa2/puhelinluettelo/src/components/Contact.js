import React from 'react';
import './Contact.css';

/**
 * Note about the number format (https://www.ietf.org/rfc/rfc3966.txt):
 * <a href="tel:[PHONE-NUMBER]">[PHONE-NUMBER]</a>
 **/
const Contact = ({name, number}) =>
    <li>
        <div className="name">{name}</div>
        <div className="number">
            <a href={`tel:${number}`}>{number}</a>
        </div>
    </li>;

export default Contact;