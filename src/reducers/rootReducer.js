import { ADD_LIST } from "../actions/constants";

export default function Reducers(state = {}, action) {
    switch (action.type) {
        case ADD_LIST:
            return ({ ...state, list: action.payload })
        default:
            return state;
    }
}