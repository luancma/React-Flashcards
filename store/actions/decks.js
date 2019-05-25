import { saveDeck, getDecks, getDeck, addCardToDeck } from "../../api";

export const ADD_DECK_SUCCESS = "ADD_DECK_SUCCESS";
export const FETCH_DECKS_SUCCESS = "FETCH_DECKS_SUCCESS";
export const FETCH_DECK_SUCCESS = "FETCH_DECK_SUCCESS";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";

// Carregar baralhos
export function fetchDecksSuccess(decks) {
  return {
    type: FETCH_DECKS_SUCCESS,
    decks
  };
}

export const fetchDecks = () => {
  return dispatch => {
    getDecks().then(value => dispatch(fetchDecksSuccess(value)));
  };
};

// Selecionar baralho
export function fetchDeckSuccess(deck) {
  return {
    type: FETCH_DECK_SUCCESS,
    deck
  };
}

export const fetchDeck = title => {
  return dispatch => {
    getDeck(title).then(value => dispatch(fetchDeckSuccess(value)));
  };
};

// Criar novo deck
export function addDeckSuccess(deck) {
  return {
    type: ADD_DECK_SUCCESS,
    deck
  };
}

export const addDeck = title => {
  return dispatch => {
    saveDeck(title).then(value => dispatch(addDeckSuccess(value)));
  };
};

// Adicionar carta ao deck
export function addCardToDeckSuccess(deck) {
  return {
    type: ADD_CARD_SUCCESS,
    deck
  };
}

export const addCard = (title, card) => {
  return dispatch => {
    addCardToDeck(title, card).then(value =>
      dispatch(addCardToDeckSuccess(value))
    );
  };
};
