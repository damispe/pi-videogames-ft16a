import  { GET_VIDEOGAMES, SEARCH_GAME, ADD_GAME, GET_GENRES, GET_GAME_BY_ID }  from '../actions/actions';

const initialState = {
    videogames: [],
    genres: [],
    details: []
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
            }
        case SEARCH_GAME:
            return {
                ...state,
                videogames: action.payload
            }
        case ADD_GAME:
            return {
                ...state
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_GAME_BY_ID:
            return {
                ...state,
                details: action.payload
            }
        default: return state;
    }
};
