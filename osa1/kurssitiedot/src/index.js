import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = props => (
    <h1>{props.course.name}</h1>
)

const Part = props => (
    <p>{props.part.name}, {props.part.exercises}</p>
)

const Content = props => {
    const parts = props.parts.map(p =>
        <Part part={p} key={p.name} />
    );

    return (
        <>{parts}</>
    )
}

const Total = props => {
    let sum = props.total.reduce((acc, cur) => acc + cur.exercises, 0);

    return (
        <p>
            Number of exercises: {sum}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            }, {
                name: 'Using props to pass data',
                exercises: 7
            }, {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total total={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));