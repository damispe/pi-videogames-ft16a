const { Router } = require('express');
const { getAddedGames } = require('../controllers/Videogames.js');
const router = Router();

router.get('/', getAddedGames);

module.exports = router;