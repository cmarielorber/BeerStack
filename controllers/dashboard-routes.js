const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


// const Post = require("../models/Post");

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll()

    const users = userData.map((user) => user.get({ plain: true }));
    const login_status = req.session.logged_in;
  } catch (err) {
    res.status(500).json(err);
  }
});





//return all posts associated with the user
router.get('/', withAuth, async (req, res) => {
    try {
      // MODIFY THIS LATER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const postData = await User.findAll({
            include: [
                {
                    model: User,
                    attributes: ['password'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render('dashboard', { posts })
      } catch (err) {
        res.status(500).json(err);
    }
});


//edit post route
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        //find one user
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'description', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at',
                    ],
                    include: { model: User, attributes: ['username'] },
                },
                { model: User, attributes: ['username'] },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        postDataNew = postData.get({ plain: true });
        res.render('edit-post', {
            post: postDataNew,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/new', (req, res) => {
  try {
    res.render('new-post');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
