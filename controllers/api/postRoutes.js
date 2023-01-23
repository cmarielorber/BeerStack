const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at'],
      // include: [
      //   {
      //     model: Comment,
      //     attributes: ['id', 'post_text', 'post_id', 'user_id', 'created_at'],
      //     include: {
      //       model: User,
      //       attributes: ['first_name']
      //     }
      //   },
      //   {
      //     model: User,
      //     attributes: ['first_name']
      //   }
      // ]
    })
    // const users = userData.map((user) => user.get({ plain: true }));
    const login_status = req.session.logged_in;
    res.render('dashboard', { postData, login_status });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/new', async (req, res) => {
  try {
    const newPost = await Post.create({
    ...req.body,
    user_id: req.session.user_id
  });

  res.status(200).json(newPost);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      post_text: req.body.post_text
    },
      {
        where: { id: req.params.id },
      });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    postDataNew = postData.get({ plain: true });
    res.render('dashboard', {
      post: postDataNew,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id"
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;