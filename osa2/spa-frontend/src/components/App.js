import React, { useState, useEffect } from 'react';
import { getAll, postNote, putNote } from '../services/notes';
import Note from './Note';

const postNewNoteToServer = (note, callback) => {
    console.info("Posting to server: ", note);
    postNote(note)
        .then(
            response => {
                console.log("Got response from server: ", response);
                callback(response);
            }
        ).catch(error => {
            console.error("Error when posting data. ", error);
            return false;
        });
}

const App = props => {
    const defaultNoteInputValue = "Write a note";
    const [showAll, setShowAll] = useState(true);
    const [notes, setNotes] = useState([]);
    const [newNoteDefInput, setNewNoteDefInput] = useState("");

    const getFromServerHook = () => {
        console.log("Effect start");
        getAll()
            .then(notes =>
                setNotes(notes)
            ).catch(error => {
                console.error("Error when getting data. ", error);
            });
    };

    useEffect(getFromServerHook, []);

    console.log('Rendering ', notes.length, ' notes.');

    const addNewNote = (note) => {
        setNotes([...notes, note]);
        setNewNoteDefInput(defaultNoteInputValue);
    }

    const handlerNoteOnSubmit = event => {
        event.preventDefault();

        if (newNoteDefInput === "") {
            console.warn("Empty note content, not setting.");
            return;
        }

        const note = {
            content: newNoteDefInput,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        };

        console.log(`New note submitted: ${event.target[0].value}. Will POST to server: `, note);
        postNewNoteToServer(note, addNewNote);
    }

    const handlerNewNote = event => {
        console.log("Input received: ", event.target.value);
        setNewNoteDefInput(event.target.value);
    }

    const handleNoteImportanceToggle = (id) => {
        let noteToChange = notes.find(note => note.id === id);

        if (!id || !noteToChange) {
            console.error("Cannot find note to change with ID: ", id);
            return;
        }

        noteToChange = { ...noteToChange, important: !noteToChange.important };

        console.info(`Will change note ${id} with: `, noteToChange);

        putNote(noteToChange)
            .then(response => {
                console.log("Changed importance", response);
                setNotes(notes.map(note => note.id === response.id ? response : note));
            })
            .catch(error => {
                console.log("Failed to change importance. ", error);
            })
    }

    const notesToShow = notes.filter(note => showAll || note.important);

    const noteHTML = () => notesToShow.map(note => {
        //console.log("Now creating note: ", note);
        return (
            <Note
                key={note.id}
                content={note.content}
                important={note.important}
                toggleImportant={() => handleNoteImportanceToggle(note.id)}
            />)
    });

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button
                    onClick={() => setShowAll(!showAll)}
                >
                    Show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {noteHTML()}
            </ul>
            <form onSubmit={handlerNoteOnSubmit} name="newNoteForm">
                <input
                    onChange={handlerNewNote}
                    name="noteSubmitTextField"
                    value={newNoteDefInput}
                    placeholder={defaultNoteInputValue}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default App;