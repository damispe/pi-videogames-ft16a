const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { API_KEY, API_GAMES } = require('../../consts.js');

//Crear videogame:
async function addGame (req, res){
  const id = uuidv4();
  const game = { ...req.body, id };
  try {
    const [games] = await Videogame.findOrCreate({
      where: {
          id: game.id,
          name: game.name,
          description: game.description,
          release_date: game.releaseDate,
          rating: game.rating,
          platforms: game.platforms,
          genre: game.genre,
        }
      });
      let dbGenre = await Genre.findAll({
        where: {genre_name: game.genre}
      });
      games.addGenre(dbGenre);
      if(games){
        let aux = [games];
        return res.json({
          message: 'New game created successfully',
          data: aux
        });
      }
    } catch(e){
      res.status(500).send('Something went wrong');
    }
  }
  
  //desde de la DB:
  async function getAddedGames (req, res){
    const dbGames = await Videogame.findAll();
    return dbGames;
  }

  //desde la API y la DB y cuando se pasa query.name:
  async function getGames (req, res){
    if (req.query.name){
        const videogames = await (axios.get(`${API_GAMES}?search=${req.query.name}&key=${API_KEY}`)); 
        if (videogames.data.results[0]) return res.json(videogames.data.results.slice(0, 15));
        return res.status(404).send('Videogames not found');
    } else {
        try {
            const videogames = await (axios.get(`${API_GAMES}?key=${API_KEY}`));
            const dbVideogames = await getAddedGames();
            return res.json(dbVideogames.concat(videogames.data.results));
        } catch (error){
            return res.status(404).send('Videogames not found');
        }
    }
}

//videogame por ID en API y DB:
async function getGamesById (req, res) {
  let n1 = 0;
  let n2 = 0;
  try {
    const gameId = await Videogame.findByPk(req.params.idVideogame);
    if (gameId){
      return res.json(gameId);
    }
  }
  catch {
    n1 = 1;
  }
  try {
    const gameId = await axios.get(`${API_GAMES}/${req.params.idVideogame}?key=${API_KEY}`);
    if (gameId){
      return res.json(gameId.data);
    }
  }
  catch {
    n2 = 1;
  }
  if (n1 !== 0 && n2 !== 0){
    return res.status(404).send('ID not found');
  }
}

module.exports = {
    getGames,
    addGame,
    getGamesById,
};