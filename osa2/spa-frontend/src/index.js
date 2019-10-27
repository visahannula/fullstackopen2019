import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './index.css';

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME || 'localhost';
const PORT = process.env.REACT_APP_API_PORT || 3001;

ReactDOM.render(<App />, document.getElementById('root'));
