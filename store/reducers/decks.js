import {
  ADD_DECK_SUCCESS,
  FETCH_DECKS_SUCCESS,
  ADD_CARD_SUCCESS
} from "../actions/decks";

export default (decks = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DECKS_SUCCESS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK_SUCCESS:
      return {
        ...state,
        ...action.deck
      };

    default:
      return state;
  }
});
