require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_GAMES =  'https://api.rawg.io/api/games';
const API_GENRES = 'https://api.rawg.io/api/genres';

module.exports = {
    API_KEY,
    API_GAMES,
    API_GENRES,
};

