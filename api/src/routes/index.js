const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require('./videogames.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', gamesRouter);
router.use('/videogame', gamesRouter);
// router.use('/videogames?name=', );
// router.use('/videogame/:gameId', );
// router.use('/genres', );

module.exports = router;
