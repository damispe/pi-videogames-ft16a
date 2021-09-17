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
          release_date: game.release_date,
          rating: game.rating,
          platforms: game.platforms,
        }
      });
      let dbGenre = await Genre.findAll({
        where: {genre_name: game.genres}
      });
      for (let i=0; i < dbGenre.length; i++){
        games.addGenre(dbGenre[i].dataValues.id);
      }
      // games.addGenre(dbGenre);
      if(games){
        let aux = [games];
        return res.json({
          message: 'New game created successfully',
          data: aux
        });
      }
    } catch(e){
      console.log(e);
      res.status(500).send('Something went wrong');
    }
  }
  
  //desde de la DB:
  async function getAddedGames (req, res){
    const dbGames = await Videogame.findAll({
      include: {
        model: Genre
      }
    });
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
            const firstGet = await (axios.get(`${API_GAMES}?key=${API_KEY}`));
            const videogames1 = await firstGet.data.results

            const secondGet = await (axios.get(`${API_GAMES}?key=${API_KEY}&page=2`));
            const videogames2 = await secondGet.data.results

            const thirdGet = await (axios.get(`${API_GAMES}?key=${API_KEY}&page=3`));
            const videogames3 = await thirdGet.data.results

            const fourthGet = await (axios.get(`${API_GAMES}?key=${API_KEY}&page=4`));
            const videogames4 = await fourthGet.data.results

            const fifthGet = await (axios.get(`${API_GAMES}?key=${API_KEY}&page=5`));
            const videogames5 = await fifthGet.data.results

            const allVideogames = [...videogames1, ...videogames2, ...videogames3,
              ...videogames4, ...videogames5];

            const apiVideogames = allVideogames.map((e) => {
              return {
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                rating: e.rating,
                genres: e.genres.map((e) => e.name)
              }
            });
            const dbVideogames = await getAddedGames();
            return res.json(dbVideogames.concat(apiVideogames));
        } catch (error){
            return res.status(404).send('Videogames not found');
        }
    }
}

//videogame por ID en API y DB:
async function getGamesById (req, res){
  try {
      if (req.params.idVideogame.length > 10){
          const gameId = await Videogame.findByPk(req.params.idVideogame, {
              include: Genre
          });
          return res.json(gameId);
      } else {
          const videogames = await axios.get(`${API_GAMES}/${req.params.idVideogame}?key=${API_KEY}`);
          return res.json(videogames.data);
      }
  } catch (error){
      console.log(error);
      return res.status(400).send('ID not found');
  }
}
module.exports = {
    getGames,
    addGame,
    getGamesById,
};