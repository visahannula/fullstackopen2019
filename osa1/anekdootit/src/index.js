import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const getRandArrayIndex = arr => Math.floor(Math.random() * (arr.length));

const getLargestArrayValueIndex = arr => {
    let largestPos = 0;
    arr.forEach((v, i) => { if (v > arr[largestPos]) largestPos = i; });
    return largestPos;
}

const Button = props => <button onClick={props.cb}>{props.text}</button>;
const Anecdote = props => <p className={'anecdote'}>"{props.text}"</p>;
const VoteCount = props => {
    let text = `${props.count} votes`;
    if (props.count === 0) text = "no votes";
    if (props.count === 1) text = "1 vote";
    return <p>This anecdote has {text}.</p>
};

const App = props => {
    const { anecdotes } = props; 
    const [selected, setSelected] = useState(getRandArrayIndex(anecdotes));
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
    const [mostVoted, setMostVoted] = useState(undefined);

    const setRandAnecdote = () => {
        let rand = getRandArrayIndex(anecdotes);
        while (selected === rand) { // do not select the same
            rand = getRandArrayIndex(anecdotes);
        }        
        setSelected(rand);
    }

    const setSubmitVoteUpdateMostVoted = () => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);

        const newMostVoted = getLargestArrayValueIndex(newVotes);
        // avoid state/UI update if new has even score
        if (!mostVoted || newVotes[newMostVoted] > votes[mostVoted]) {
            setMostVoted(getLargestArrayValueIndex(newVotes));
        }
    }
    
    return (
        <div>
            <section>
                <h1>Anecdotes of the day</h1>
                <div>
                    <Anecdote text={anecdotes[selected]}/>
                    <VoteCount count={votes[selected]}/>
                </div>
                <div>
                    <Button cb={setRandAnecdote} text={'Next anecdote'}/>
                    <Button cb={setSubmitVoteUpdateMostVoted} text={'Vote this anecdote'}/>
                </div>
            </section>
            <section>
                <h1>Anecdote with most votes</h1>
                <div>{
                    mostVoted === undefined 
                    ? <p>No votes have been given yet.</p>
                    : <>
                        <Anecdote text={anecdotes[mostVoted]}/>
                        <VoteCount count={votes[mostVoted]}/>
                    </>}
                </div>
            </section>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App anecdotes={anecdotes} />,
    document.getElementById('root'));
