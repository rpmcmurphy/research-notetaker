import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import jQuery from 'jquery';
import '@popperjs/core';

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './react-app/App';

ReactDom.render(
    <Router>
        <App /> 
    </Router>,
    document.getElementById('root')
);