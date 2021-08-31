const { Router } = require('express');
const { getGames, addGame } = require('../controllers/Videogames.js');
const router = Router();

router.get('/', getGames);
router.post('/', addGame);

module.exports = router;