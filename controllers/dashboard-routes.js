const router = require('express').Router();
const { Post, Comment, User, Beers } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const login_status = req.session.logged_in;
    const currentUser = req.session.user_id;
    const userData = await User.findByPk(currentUser, {
      attributes: {
        exclude: ['password']
      }
    });

    const userRawPosts = await Post.findAll({ where: { user_id: currentUser} });
    const userPosts = [];
    for (let i = 0; i < userRawPosts.length; i++) {
      const singlePost = userRawPosts[i].dataValues;
      userPosts.push(singlePost);
    };

    const coolerList = userData.cooler;
    const coolerData = [];
    for (let i = 0; i < coolerList.length; i++) {
      const singleBeer = await Beers.findByPk(coolerList[i]);
      coolerData.push(singleBeer.dataValues);
    };
    res.render('dashboard', { login_status, coolerData, userPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
