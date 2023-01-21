const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboard-routes');
const beerlistRoutes = require('./beerlistRoutes')
const homepageRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/beerpost', beerlistRoutes);
router.use('/homepage', homepageRoutes);

module.exports = router;