import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) =>
    <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total total={course.parts}/>
    </>;

export default Course;