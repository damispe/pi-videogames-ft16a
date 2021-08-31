const {Videogame} = require('../db.js');
const {axios} = require('axios');
const {v4: uuidv4} = require('uuid');
const {API_KEY, API_GAME} = require('../../consts.js');

//Crear videogame
async function addGame(req, res){
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
      res.send({ error: 500, msg: 'Nothing was sended' });
    }
  }

  //traer videogames de la API

// async function getGames (req, res){
//     let videogames = await axios.get(`${API_GAME}?key=${API_KEY}`);
//     if (!videogames) return res.status(404).send('Videogame not found');
//     res.send(videogames); 
// };

function getGames(req, res, next){
    let allGames = axios.get(`${API_GAME}?key=${API_KEY}`);
    allGames
    .then((res) => {
        let games = res['data']
        res.send(games)
    })
    .catch((err) => next(err));
};

//traer videogames de la DB
function getAddedGames(req, res, next){
    Videogames.findAll()
      .then((genres) => res.send(genres))
      .catch((err) => next(err));
  }

module.exports = {
    getGames,
    addGame,
    getAddedGames,
};