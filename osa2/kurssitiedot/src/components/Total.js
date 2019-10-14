import React from 'react';

const Total = ({parts}) =>
    <p>
        <b>Number of exercises:&nbsp;
            { parts.reduce((acc, cur) => acc + cur.exercises, 0) }
        </b>
    </p>;

export default Total;