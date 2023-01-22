const router = require('express').Router();
const Beers = require('../models/Beers');

router.get('/', async (req, res) => {
  const beerData = await Beers.findAll().catch((err) => {
    res.json(err);
  });
  const beers = beerData.map((beer) => beer.get({ plain: true }));
  const login_status = req.session.logged_in;
  res.render('beerpost', { beers, login_status });
});

// MODIFY TO SORT BY ALPHA
router.get('/beerpostalpha', async (req, res) => {
  const beerData = await Beers.findAll().catch((err) => {
    res.json(err);
  });
  const beers = beerData.map((beer) => beer.get({ plain: true }));
  res.render('beerpostalpha', { beers });
});

// MODIFY TO SORT BY LIKES
router.get('/beerpostnumber', async (req, res) => {
  const beerData = await Beers.findAll().catch((err) => {
    res.json(err);
  });
  const beers = beerData.map((beer) => beer.get({ plain: true }));
  res.render('beerpostalpha', { beers });
});
module.exports = router;
