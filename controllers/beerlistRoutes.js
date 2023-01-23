const router = require('express').Router();
const { Beers, User } = require('../models/');

router.get('/', async (req, res) => {
  const login_status = req.session.logged_in;
  console.log(login_status);
  const beerData = await Beers.findAll().catch((err) => {
    res.json(err);
  });
  const beers = beerData.map((beer) => beer.get({ plain: true }));

  if (login_status) {
    const currentUser = req.session.user_id;
    const userData = await User.findByPk(currentUser, {
      attributes: {
        exclude: ['password'],
      },
    });
    const coolerList = userData.cooler;
    console.log(login_status);
    res.render('beerpost', { beers, coolerList, login_status });
  } else {
    res.render('beerpost', { beers, login_status });
  }
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
