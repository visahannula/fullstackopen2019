import React, { useState } from 'react';
import Note from './Note';

const App = props => {
    const defaultNoteInputValue = "Default note";
    const [showAll, setShowAll] = useState(true);
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState(defaultNoteInputValue);
    const [inputStarted, setInputStarted] = useState(false);

    const handlerNoteOnSubmit = event => {
        event.preventDefault();

        const note = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        };

        console.log(`New note submitted: ${event.target[0].value}. Setting: `, note);

        if (newNote === "") {
            console.log("Empty note content, not setting.");
            return
        }

        setNotes([...notes, note]);
        setInputStarted(false);
        setNewNote(defaultNoteInputValue);
    }

    const handlerNewNote = event => {
        console.log("Input received: ", event.target.value);
        setNewNote(event.target.value);
    }

    const handlerNoteInputOnFocus = event => {
        if (!inputStarted) {
            setNewNote("");
            setInputStarted(true);
        }
    }

    const handlerNoteInputOnBlur = event => {
        if (newNote ===  "" || newNote === defaultNoteInputValue) {
            setNewNote(defaultNoteInputValue);
            setInputStarted(false);
        }
    }

    const notesToShow = notes.filter(note => showAll || note.important);

    const noteHTML = () => notesToShow.map(note =>
        <Note
            key={note.id}
            note={note.content}
        />);

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    Show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {noteHTML()}
            </ul>
            <form onSubmit={handlerNoteOnSubmit} name="newNoteForm">
                <input
                    onFocus={handlerNoteInputOnFocus}
                    onBlur={handlerNoteInputOnBlur}
                    onChange={handlerNewNote}
                    name="noteSubmitTextField" 
                    value={newNote}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default App;