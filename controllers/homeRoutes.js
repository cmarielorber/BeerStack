const router = require('express').Router();
const { Model } = require('sequelize');
const { User, Post } = require('../models');
// const Beers = require('../models/Beers');
// const withAuth = require('../utils/auth');

// Render Homepage
router.get('/', async (req, res) => {
  try {
    const login_status = req.session.logged_in;
    res.render('homepage', {  login_status });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Render posts to the home page
router.get('/', (req, res) => {
    Post.findAll({
        // Query configuration
        // From the Post table, include the post ID, URL, title, and the timestamp from post creation
        attributes: [
            'first_name',
            'title',
            'post_text',
            
          ],
        // Order the posts from most recent to least
        order: [[ 'post_text', 'DESC']],
        // From the User table, include the post creator's first name
        // From the Comment table, include all comments
        include: [
            {
                model: User,
                attributes: ['first_name']
            },
            //WILL ADD THIS LATER
            // {
            //     model: Comment,
            //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //     include: {
            //         model: User,
            //         attributes: ['username']
            //     }
            // }
        ]
    })
    // render the posts
    .then(dbPostData => {
      // create an array for the posts, using the get method to trim extra sequelize object data out
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass the posts into the homepage template
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    // if there was a server error, return the error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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

// Render Beer List

// router.get('/beerpost', async (req, res) => {
//   const beerData = await Beers.findAll().catch((err) => { 
//       res.json(err);
//     });
//       const beers = beerData.map((beer) => beer.get({ plain: true }));
//       res.render('beerpost', { beers });
//     });


// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
