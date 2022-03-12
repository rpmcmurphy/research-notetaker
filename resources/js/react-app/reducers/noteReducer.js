import { ADD_NOTE } from '../common/action-types';

const initialState = {
    notes: [],
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTE:
            return { ...state, notes: [...state.notes, action.payload] };
        default:
            return state;
    }

    return state;
};

export default noteReducer;