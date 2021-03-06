import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'MobileFlashCards:decks';

export const getDecks = async (itemId) => {
    try {
        const decks = await AsyncStorage.getItem(itemId);
        return JSON.parse(decks);
        // return {}; //debugging purpose case
    } catch (e) {
        console.error(e);
    }
};

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
        // await AsyncStorage.clear(); //- debugging purpose
        const decks = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));

        // Case for handling exsiting Deck
        const titleExists = decks && !!decks[title];
        if (titleExists) {
            // eslint-disable-next-line quotes
            return result = `Sorry you've already had such deck - please enter another title`;
        }

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
            console.log('Item has been set up successfully');
            result = 'success';
        });
        return result;
    } catch (e) {
        console.log(e);
    }
};

export const removeDeck = async (title) => {
    try {
        let result = null;
        const decks = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));

        const titleExists = decks && !!decks[title];
        if (titleExists) {
            delete decks[title];

            await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks), (err) => {
                if (err) {
                    console.log(err);
                    result = err;
                }
                console.log('Item has been removed successfully');
                result = 'success';
            });
            return result;
        }
        return result;
    } catch (e) {
        console.log(e);
    }
};

export const addCardToDeck = async (title, card) => {
    try {
        let result = null;
        const decks = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));

        const updatedDecks = {
            ...decks,
            [title]: {
                ...decks[title],
                questions: decks[title].questions.concat([card])
            }
        };

        await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecks), (err) => {
            if (err) {
                console.log(err);
                result = err;
            }
            console.log('Deck has been added successfully');
            result = 'success';
        });
        return result;
    } catch (e) {
        console.log(e);
    }
};