const router = require('express').Router();
const { Post, Comment, User, Beers } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const login_status = req.session.logged_in;
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      }
    });
    const coolerList = userData.cooler;
    const coolerData = [];
    for (let i = 0; i < coolerList.length; i++) {
      const singleBeer = await Beers.findByPk(coolerList[i]);
      coolerData.push(singleBeer.dataValues);
    }
    console.log(coolerData)
    res.render('dashboard', { login_status, coolerData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
