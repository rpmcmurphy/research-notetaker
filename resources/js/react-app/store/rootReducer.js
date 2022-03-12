import { combineReducers } from 'redux';
import birdReducer from './birds/birds.reducers';

const rootReducer = combineReducers({
    birds: birdReducer
});

export default rootReducer;