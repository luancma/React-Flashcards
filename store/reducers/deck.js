import { FETCH_DECK_SUCCESS, ADD_CARD_SUCCESS } from "../actions/decks";

export default (deck = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DECK_SUCCESS:
      return {
        ...state,
        ...action.deck
      };

    case ADD_CARD_SUCCESS:
      return {
        ...state,
        ...action.deck
      };

    default:
      return state;
  }
});
