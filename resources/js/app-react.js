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

import App from './react-app/App';

// import rootReducer from './react-app/reducers/index';
import rootReducer from './react-app/store/rootReducer';
// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer, applyMiddleware(thunk));

// Store data flow
// UI calls action function with data from user, which takes the data and forms an object with action + payload, gives it to the reducer.Reducer takes the data and action, sets the new state after taking the existing state, initial state if first time, and sets a new state, returns the new state, later, as last step, this new returned state object is set as an updated key in the redux root_reducer, which finally gets stored into the store object, as this reducer is the first arg of the store function, as folows-
// Ui -> action_call -> action_object_returned_with_data -> reducer_takes_the_obj_and_sets_new_state -> store_stores_it.

ReactDom.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);