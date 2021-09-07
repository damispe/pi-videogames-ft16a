import axios from 'axios';
import { GET_VIDEOGAMES } from './consts';
import {GAMES_URL} from '../consts';

function getVideogames(){
    return function(dispatch){
        return axios.get(`${GAMES_URL}`)
        .then((games) => {
            dispatch({
                type: GET_VIDEOGAMES,
                payload: games
            })
        })
    }
};

export default getVideogames;