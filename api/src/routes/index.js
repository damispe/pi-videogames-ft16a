const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require('./videogames.js');
const genresRouter = require('./genres.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', gamesRouter);
router.use('/videogame/:idVideogame', gamesRouter);
router.use('/videogame', gamesRouter);
router.use('/genres', genresRouter);

module.exports = router;
