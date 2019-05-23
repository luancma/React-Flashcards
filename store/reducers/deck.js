import {FETCH_DECK_SUCCESS} from '../actions/decks'

export default deck = (state = {}, action) => {
    switch (action.type) {
        case FETCH_DECK_SUCCESS:
            return{
                ...action.decks
            }
        default:
            return state
    }
}