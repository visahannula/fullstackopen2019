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
    <div id={props.id || 'footer'}>
        <p>This is from the footer, you know that {props.name}.</p>
    </div>
)

const Display = ({ counter }) => <div>Counter: { counter }</div>;
const Button = ({ text, func }) => <button onClick={func}>{ text }</button>;

class ButtonWithState extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { clicks: 0 };
        this.handleClick = () => {
            this.setState({ clicks: this.state.clicks + 1 });
        }
    }

    render() {
        return (
            <button onClick={ this.handleClick }>{ `${this.props.text}: ${this.state.clicks}` }</button>
        )
    }
}

const ButtonWithStateHooks = props => {
    const [clicks, handleClick] = useState(0);
    
    props.func("Hi, it's ButtonWithStateHooks. Clicks: " + clicks);
    
    return (
        <button onClick={ () => handleClick(clicks + 1) }>{ `${props.text}: ${clicks}` }</button>
    )
} 

const App = () => {
    const [ counter, setCounter ] = useState(0);

    console.log("Testiviesti" + counter);
    const now = Date.now();
    const a = 10;
    const b = 20;
    const uname = "Pat Manninen";
    const age = a + b;

    const setValue = (value=0) => () => setCounter(value);

    const printToConsole = text => console.log(text);

    return (
        <>
            <p>Yellow World!</p>
            <Display counter={ counter } />
            <Hello name={uname} age={age} />

            <p>{a} + {b} = {a + b}</p>

            <Button func={ setValue(counter + 1) } text="Plus" />
            <Button func={ setValue(counter - 1) } text="Minus" />
            <Button func={ setValue() } text="Zero" />

            <p>Clicktests</p>
            <ButtonWithState text={"Left"} />
            <ButtonWithState text={"Right"} />
            <ButtonWithStateHooks text={"Alt"} func={ printToConsole } />

            <p>This was brought to you on UNIX time: <code>{now}</code></p>
            <Footer name={uname} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
