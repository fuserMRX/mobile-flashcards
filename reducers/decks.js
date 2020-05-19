import { RECEIVE_DECKS } from '../actions/decks';
import { SAVE_DECK } from '../actions/decks';


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
        default:
            return state;
    }
};

export default decks;