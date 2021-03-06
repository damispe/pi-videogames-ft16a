const {Router} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require('./videogames.js');
const {getGamesById} = require('../controllers/Videogames.js');
const { getGenres } = require('../controllers/Genres.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', gamesRouter);
router.use('/videogame', gamesRouter);
router.get('/videogame/:idVideogame', getGamesById);
router.get('/genres', getGenres);

module.exports = router;
