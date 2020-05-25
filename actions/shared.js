import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/decks';
import { DECKS_STORAGE_KEY } from '../utils/api';

/**
* Return initial load data for decks
* @returns {Object} object with dispatch functions for store
*/
export const handleInitialData = () => {
    return async (dispatch) => {
        const decks = await getDecks(DECKS_STORAGE_KEY);
        dispatch(receiveDecks(decks));
        return Promise.resolve();
    };
};