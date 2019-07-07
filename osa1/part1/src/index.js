import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Greetings {name}</p>
            <p>I heard your age is {age}, so you must be born in {bornYear()}.</p>
        </div>
    )
}

const Footer = (props) => (
    <div id="{props.id || 'footer'">
        <p>This is from the footer, you know that {props.name}.</p>
    </div>
)

const Display = ({ counter}) => <div>{ counter }</div>;
const Button = ({ text, func }) => <button onClick={func}>{ text }</button>;

const App = () => {
    const [ counter, setCounter ] = useState(0);

    console.log("Testiviesti");
    const now = Date.now();
    const a = 10;
    const b = 20;
    const uname = "Pat Manninen";
    const age = a + b;

    const setValue = (value=0) => () => setCounter(value);

    return (
        <>
            <p>Yellow World!</p>
            <Display counter={ counter } />
            <Hello name={uname} age={age} />
            <p>This was brought to you on UNIX TIME: {now}</p>
            <p>{a} + {b} = {a + b}</p>
            <Button func={setValue(counter + 1)} text="Plus" />
            <Button func={setValue(counter - 1)} text="Minus" />
            <Button func={setValue()} text="Zero" />
            <Footer name={uname} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
