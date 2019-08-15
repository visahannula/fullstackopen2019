import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = props => (
    <button onClick={ props.callback(props.grade) }>
        { props.text }
    </button>
);

const TableColHead = props => 
    <th style={ props.style }>{ props.text }</th>;

const TableRow = props =>
    <tr>{ props.content }</tr>;

const TableData = props =>
    <td style={props.style}>{ props.text }</td>;

const Statistic = props =>
    Object.entries(props.feedback)
        .map(([k, v]) => (
            <TableRow 
                key={k} 
                content={
                    <>
                    <TableData text={v.text} style={{textAlign: 'right'}} />
                    <TableData text={v.value} style={{textAlign: 'left'}} />
                    </>
                }
            />
        )
    );

const Statistics = props => 
    !props.feedback.all.value
    ?
    <p>No feedback given yet.</p>
    :
    <table>
        <thead>
            <TableRow 
                content={
                    <>
                    <TableColHead text="Item" style={{textAlign: 'right'}}/>
                    <TableColHead text="Value" style={{textAlign: 'left'}}/>
                    </>
                }
            />
        </thead>
        <tbody>
            <Statistic feedback={props.feedback}/>
        </tbody>
    </table>;

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
    },
    get all() { 
        return {
            value: (this.good.value + this.neutral.value + this.bad.value),
            text: 'All'
        } 
    },
    get average() {
        const sum = this.good.value + (this.bad.value * -1);
        return {
            value: (this.all.value > 0 ? (sum / this.all.value) : 0).toFixed(1),
            text: 'Average'
        }
    },
    get positive() {
        return {
            value: (this.good.value / this.all.value * 100).toFixed(1) + ' %',
            text: 'Positive'
        }
    }

}

const App = () => {
    const [ feedbackState, setFeedback ] = useState(feedbackStats);

    const increaseFeedback = grade => () => {
        feedbackStats[grade].value +=1;
        setFeedback({...feedbackStats});
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
                <Statistics feedback={ feedbackState }/>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

    