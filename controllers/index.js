const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboard-routes');
const beerlistRoutes = require('./beerlistRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/beerpost', beerlistRoutes);

module.exports = router;
