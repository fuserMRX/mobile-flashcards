import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/decks';
// import { showLoading, hideLoading } from 'react-redux-loading';
import { DECKS_STORAGE_KEY } from '../utils/api';

/**
* Return initial load data for decks
* @returns {Object} object with dispatch functions for store
*/
export const handleInitialData = () => {
    return async (dispatch) => {
        // TODO progress bar initialization
        // dispatch(showLoading());
        const decks = await getDecks(DECKS_STORAGE_KEY);
        dispatch(receiveDecks(decks));
        // dispatch(hideLoading());
    };
};