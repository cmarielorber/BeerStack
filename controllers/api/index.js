const router = require('express').Router();
const userRoutes = require('./userRoutes');
const beerRoutes = require('./beerRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/beer', beerRoutes);
router.use('/post', postRoutes);

module.exports = router;
