import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => (
    <div>
        <p>Greetings {props.name}</p>
    </div>
)

const Footer = (props) => (
    <div id="{props.id || 'footer'">
        <p>This is from the footer, you know that {props.name}.</p>
    </div>
)

const App = () => {
    console.log("Testiviesti");
    const now = Date.now();
    const a = 10;
    const b = 20;
    const uname = "Pat Manninen";

    return (
        <>
            <p>Yellow World</p>
            <Hello name={uname} />
            <p>This was brought to you: {now}</p>
            <p>{a} + {b} = {a + b}</p>
            <Footer name={uname} />
        </>
        
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
