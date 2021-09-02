const { Videogame } = require('../db.js');
const { Router } = require('express');
const { getGames, addGame, getGamesById } = require('../controllers/Videogames.js');

const router = Router();

router.get('/', getGames);
router.get('/', getGamesById);
router.post('/', addGame);

module.exports = router;