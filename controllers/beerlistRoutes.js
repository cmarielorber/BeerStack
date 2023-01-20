const router = require('express').Router();
const Beers = require('../models/Beers');

router.get('/', async (req, res) => {
  const beerData = await Beers.findAll().catch((err) => {
    res.json(err);
  });
  const beers = beerData.map((beer) => beer.get({ plain: true }));
  res.render('beerpost', { beers });
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
router.get('/beerpostlikes', async (req, res) => {
  const beerData = await Beers.findAll().catch((err) => {
    res.json(err);
  });
  const beers = beerData.map((beer) => beer.get({ plain: true }));
  res.render('beerpostlikes', { beers });
});

module.exports = router;
