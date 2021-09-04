import { GET_VIDEOGAMES } from "../actions/consts";

var initialState = {
    videogames : []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: [...action.payload]
            }
        default: return state;
    }
}