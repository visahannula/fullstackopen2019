import React from 'react';
import Part from './Part';

const Content = ({parts}) =>
    parts.map(
        ({name, id, exercises}) =>
            <Part key={id} name={name} exercises={exercises} />
    );

export default Content;
