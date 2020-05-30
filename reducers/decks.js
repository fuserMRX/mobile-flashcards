import { RECEIVE_DECKS } from '../actions/decks';
import { SAVE_DECK, DELETE_DECK } from '../actions/decks';


const decks = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case SAVE_DECK:
            return {
                ...state,
                [action.deck]: {
                    title: action.deck,
                    questions: []
                }
            };
        case DELETE_DECK: {
            const newState = { ...state };
            delete newState[action.deck];

            return {
                ...newState
            };
        }
        default:
            return state;
    }
};

export default decks;