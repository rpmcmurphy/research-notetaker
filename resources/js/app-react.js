// Base imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import jQuery from 'jquery';
import '@popperjs/core';

// React imports
import React from 'react';
import ReactDom from 'react-dom';

// Store imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { BrowserRouter as Router } from 'react-router-dom';

// import rootReducer from './react-app/reducers/index';
import App from './react-app/App';

// const store = createStore(rootReducer, applyMiddleware(thunk));

import rootReducer from './react-app/store/rootReducer';
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);