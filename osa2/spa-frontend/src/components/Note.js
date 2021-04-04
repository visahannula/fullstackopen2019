import React from 'react';

const Note = ({ content, important, toggleImportant }) => {
    return (
        <li>{content}
            <button onClick={toggleImportant}>
                {important ? "Set as non important" : "Set as important"}
            </button>
        </li>
    );
}

export default Note;