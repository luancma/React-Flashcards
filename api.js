import { AsyncStorage } from 'react-native';
export const deKey = 'FlashCards:decks';


export const saveDeck = (title) => {
    return getDecks().then((decks) => {
        return {
            ...decks,
            [title]: {
                title,
                questions: [],
            }
        }
    }).then((newDecks) => {
        AsyncStorage.setItem(deKey, JSON.stringify(newDecks))
        return newDecks
    })
};

export const getDecks = async () => {
    const result = await AsyncStorage.getItem(deKey).then((decks) => JSON.parse(decks))
    return result
}

export const getDeck = (title) => {
    return AsyncStorage.getItem(deKey).then(data => {
        const decks = JSON.parse(data);
        return decks[title]
    })
};

export const addCardToDeck = (title, card) => {
    return getDecks().then((decks) => {
        const updateDeck = {
            ...decks[title],
            questions: decks[title].questions.concat([card])
        }
        const newDecks = {
            ...decks,
            [title]: updateDeck,
        }
        AsyncStorage.setItem(deKey, JSON.stringify(newDecks))
        return updateDeck
    }) 
}
