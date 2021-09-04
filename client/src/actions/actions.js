import { GET_VIDEOGAMES } from "./consts";

export function getVideogames(){
    return function(dispatch){
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: GET_VIDEOGAMES,
                payload: json
            })
        })
    }
}