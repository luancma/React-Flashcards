import { combineReducers } from "redux";
import decks  from './decks'
import deck from './deck'
export default combineReducers({
  deck,
  decks,
});