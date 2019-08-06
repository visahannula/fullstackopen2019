import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = props => (
    <button onClick={props.callback(props.grade)}>{props.text}</button>
);

const TableHeader = props => (
    <><th>{props.text}</th></>
);

const TableRow = props => (
    <><tr>{props.content}</tr></>
);

const TableData = props => (
    <><td>{props.text}</td></>
);

const tableBodyRows = feedback => {
    const rows = [];

    for (const key in feedback) {
        rows.push(
            <TableRow content={
                <>
                    <TableData text={feedback[key].text} />
                    <TableData text={feedback[key].value} />
                </>
            } />
        );
    }

    return rows;
}

const Statistics = props => (
    <table>
        <thead>
            <TableRow content={<> <TableHeader text="Item" /> <TableHeader text="Value" /> </>} />
        </thead>
        <tbody>
            <TableRow content={ tableBodyRows(props.feedback) } />
        </tbody>
    </table>
)

const App = () => {
    const feedbackStats = {
        good: {
            value: 0,
            text: "Good"
        },
        neutral: {
            value: 0,
            text: "Neutral"
        },
        bad: {
            value: 0,
            text: "Bad"
        }
    }

    const [ feedbackState, setFeedback ] = useState(feedbackStats);

    const increaseFeedback = grade => () => {
        let temp = {...feedbackState};
        temp[grade].value += 1;

        setFeedback(temp);
        
        console.log("feed", feedbackState);
    } 

    return (
    <div>
    <h1>Give us some feedback</h1>
        <p>Use buttons below to give feedback</p>
        <div>
            <Button callback={increaseFeedback} text="Good" grade="good" />
            <Button callback={increaseFeedback} text="Neutral" grade="neutral" />
            <Button callback={increaseFeedback} text="Bad" grade="bad" />
        </div>
        <div>
            <h2>Statistics so far</h2>
            <Statistics feedback={feedbackState}/>
        </div>
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

    