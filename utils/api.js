import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'MobileFlashCards:decks';

export const getDecks = async (itemId) => {
    try {
        const decks = await AsyncStorage.getItem(itemId);
        return JSON.parse(decks);
    } catch (e) {
        console.error(e);
    }
};

// TODO should be finished
//take in a single id argument and return
//the deck associated with that id.
export const getDeck = (id) => {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data !== null && data[id]) {
                return data[id];
            } else {
                return 'No Decks are found with such ID';
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

//take in a single title argument and add it to the decks.
export const saveDeckTitle = async (title) => {
    try {
        let result = null;
        let updatedDecksObj = null;
        const newDeckObj = {
            [title]: {
                title,
                questions: []
            }
        };
        // await AsyncStorage.clear();
        const decks = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));
        if (decks) {
            updatedDecksObj = {
                ...decks,
                ...newDeckObj
            };
        }
        // Update storage with new title if it is available
        await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecksObj || newDeckObj), (err) => {
            if (err) {
                console.log(err);
                result = err;
            }
            console.log('Item was set up successfully');
            result = 'success';
        });
        return result;
    } catch (e) {
        console.log(e);
    }
};

// TODO should finished
//take in two arguments, title and card, and will add
//the card to the list of questions for the deck with
//the associated title.
export const addCardToDeck = async (title, card) => {
    try {
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        const updatedDecks = {
            ...decks,
            [title]: {
                ...decks[title],
                questions: card
            }
        };
        await AsyncStorage.setItem(DECKS_STORAGE_KEY, updatedDecks);
    } catch (e) {
        console.log(e);
    }
};