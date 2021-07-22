import { ADD_LIST } from "./constants"

export const AddList = (data) => {
    return (dispatch) => {
        dispatch({
            type: ADD_LIST,
            payload: data
        })
    }
}