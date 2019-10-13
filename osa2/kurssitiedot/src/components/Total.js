import React from 'react';

const Total = ({total}) => {
    const sum = total.reduce((acc, cur) => acc + cur.exercises, 0);
    return (
        <p>
            <b>Number of exercises: {sum}</b>
        </p>
    )
}

export default Total;