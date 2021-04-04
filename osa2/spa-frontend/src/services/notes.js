import axios from 'axios';

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME || 'localhost';
const PORT = process.env.REACT_APP_API_PORT || 3001;

const baseURL = `http://${HOSTNAME}:${PORT}/notes`;

const getAll = () =>
    axios
        .get(baseURL)
        .then(response => response.data);

const putNote = (note) =>
    axios
        .put(`${baseURL}/${note.id}`, note)
        .then(response => response.data);


const postNote = (note) =>
    axios
        .post(`${baseURL}`, note)
        .then(response => response.data);


export { getAll, postNote, putNote };
