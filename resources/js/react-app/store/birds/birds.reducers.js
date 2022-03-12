import { ADD_BIRD, INCREMENT_BIRD } from './types';

const defaultBirds = [
    {
        name: 'Robin',
        views: 1,
    }
];

const birds = (state = defaultBirds, action) => {
    switch (action.type) {
        case ADD_BIRD:
            return [
                ...state,
                {
                    name: action.bird,
                    views: 1
                }
            ];
        case INCREMENT_BIRD:
            const bird = state.find(b => action.bird === b.name);
            const birds = state.filter(b => action.bird !== b.name);
            // console.log(bird);
            // return state;
            return [
                ...birds,
                {
                    ...bird,
                    views: bird.views + 1
                }
            ];
        default:
            return state;
    }
}

export default birds;