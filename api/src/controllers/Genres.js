const { Genre } = require('../db.js');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { API_KEY, API_GENRES } = require('../../consts.js');

async function addGenres(genreName){
    const id = uuidv4();
    await Genre.create({
        id,
        genre_name: genreName
    });
}

async function getGenres (req, res){
    try {
        const genresDB = await Genre.findAll();
        if (!genresDB[0]){
            const genresAPI = await axios.get(`${API_GENRES}?key=${API_KEY}`);
            await Promise.all(genresAPI.data.results.map(async (g) => {
                await addGenres(g.name);
                }))
            genresDB = await Genre.findAll();
        }
        return res.json(genresDB);
    } catch (error) {
        return res.status(404).send('Genres not found');
    }
}

module.exports = {
    getGenres,
};