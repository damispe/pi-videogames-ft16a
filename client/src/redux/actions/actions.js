import axios from 'axios';
import { GET_GENRES, GET_VIDEOGAMES, SEARCH_GAME, ADD_GAME, GET_GAME_BY_ID } from './types';
import { GAMES_URL, SEARCH_URL, GENRES_URL, ADD_GAME_URL, DETAILS_URL } from '../../consts';

function getVideogames(){
    return function(dispatch){
        return axios.get(GAMES_URL)
        .then(
            (games) => {
                dispatch({
                    type: GET_VIDEOGAMES,
                    payload: games.data
                })
            });
    }
}

function getVideogamesByName(name){
    return async function(dispatch){
        try {
            let nameSearch = await axios.get(SEARCH_URL + name);
            return dispatch({
                type: SEARCH_GAME,
                payload: nameSearch.data
            });
        } catch (e){
            console.log(e);
        }
    }
}

function createGame(payload){
    return async function(dispatch){
        const customGame = await axios.post(ADD_GAME_URL, payload);
        return customGame;
    }
}

function getGenres(){
    return async function(dispatch){
        try {
            let genres = await axios.get(GENRES_URL);
            return dispatch({
                type: GET_GENRES,
                payload: genres.data
            });
        } catch (e){
            console.log(e);
        }
    }
};

function getGamesById(idVideogame){
    return async function(dispatch){
        try {
            let game = await axios.get(DETAILS_URL+idVideogame);
            console.log(idVideogame);
            return dispatch({
                type: GET_GAME_BY_ID,
                payload: game.data
            });
        } catch (e){
            console.log(e);
        }
    }
}

export {
    getVideogames,
    getVideogamesByName,
    createGame,
    getGenres,
    getGamesById,
    GET_VIDEOGAMES,
    SEARCH_GAME,
    GET_GENRES,
    ADD_GAME,
    GET_GAME_BY_ID
};