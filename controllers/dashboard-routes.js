const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll()

    const users = userData.map((user) => user.get({ plain: true }));
    const login_status = req.session.logged_in;
    res.render('dashboard', { users, login_status });
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;
