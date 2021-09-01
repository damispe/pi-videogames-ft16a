const {Videogame} = require('../db.js');
const axios = require('axios');
const {v4: uuidv4} = require('uuid');
const {API_KEY, API_GAME} = require('../../consts.js');

//Crear videogame
async function addGame (req, res) {
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
        },
      });
      if(games){
        let aux = [games];
        return res.json({
          message: 'New game created successfully',
          data: aux
        });
      }
    } catch(e){
      console.log(e);
      res.send({ error: 500, msg: 'a field is empty' });
    }
  }
  
  //traer juegos de la DB:
  async function getAddedGames (req, res){
    const dbGames = await Videogame.findAll();
    return dbGames;
  }

  //traer videogames de la API y de la DB:
  async function getGames (req, res){
    if (req.query.name){
        const videogames = await (axios.get(`${API_GAME}?search=${req.query.name}&key=${API_KEY}`)); 
        if (videogames.data.results[0]) return res.json(videogames.data.results);
        return res.status(404).send('Not found');
    } else {
        try {
            const videogames = await (axios.get(`${API_GAME}?key=${API_KEY}`));
            const dbVideogames = await getAddedGames();
            return res.json(dbVideogames.concat(videogames.data.results));
        } catch (error){
            return res.status(404).send('Videogames not found');
        }
    }
}


module.exports = {
    getGames,
    addGame,
};