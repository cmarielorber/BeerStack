const router = require('express').Router();
const { Model } = require('sequelize');
const { User, Post } = require('../models');
// const Beers = require('../models/Beers');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const login_status = req.session.logged_in;
    const postData = await Post.findAll().catch((err) => {
      res.json(err);
    });
    const posts = postData.slice(0,5).map((post) => post.get({ plain: true }));
    res.render('homepage', { posts , login_status });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Render Socal Brew
router.get('/socalbrew', async (req, res) => {
  try {
    const login_status = req.session.logged_in;
    res.render('socalbrew', {  login_status });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Render Login
router.get('/login', async (req, res) => {
  try {
    res.render('login', {});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render Dashboard
router.get('/signup', async (req, res) => {
  try {
    res.render('signup', {});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
