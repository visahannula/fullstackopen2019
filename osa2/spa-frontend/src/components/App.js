import React from 'react';
import Note from './Note';

const App = ({ notes }) => {
    const noteHTML = () => notes.map(note =>
        <Note
            key={note.id}
            note={note.content}
        />);

    console.log(noteHTML);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {noteHTML()}
            </ul>
        </div>
    )
}

export default App;