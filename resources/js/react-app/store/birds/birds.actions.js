import { ADD_BIRD, INCREMENT_BIRD } from './types';

export function addBird(bird) {
    return {
        type: ADD_BIRD,
        bird,
    }
}

export function incrementBird(bird) {
    return {
        type: INCREMENT_BIRD,
        bird
    }
}