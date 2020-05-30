import { saveDeckTitle, removeDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const SAVE_DECK = 'SAVE_DECK';
export const DELETE_DECK = 'DELETE_DECK';

export const receiveDecks = (decks) => {
    return {
        type: RECEIVE_DECKS,
        decks
    };
};

export const saveDeck = (deck) => {
    return {
        type: SAVE_DECK,
        deck
    };
};

export const deleteDeck = (deck) => {
    return {
        type: DELETE_DECK,
        deck
    };
};


export const handleSaveDeck = (deck) => {
    return async (dispatch) => {
        try {
            const saveResult = await saveDeckTitle(deck);
            if (saveResult === 'success') {
                dispatch(saveDeck(deck));
            }
            return saveResult;
        } catch (e) {
            console.error(e);
        }
    };
};

export const handleDeleteDeck = (deck) => {
    return async (dispatch) => {
        try {
            const saveResult = await removeDeck(deck);
            if (saveResult === 'success') {
                dispatch(deleteDeck(deck));
            }
            return saveResult;
        } catch (e) {
            console.error(e);
        }
    };
};