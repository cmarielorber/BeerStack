const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//return all posts associated with the user
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        // const postData = await Post.findAll({
        //     where: { user_id: req.session.user_id },
        //     attributes: ['id', 'title', 'content', 'created_at'],
        //     include: [
        //         {
        //             model: Comment,
        //             attributes: [
        //                 'id',
        //                 'comment_text',
        //                 'post_id',
        //                 'user_id',
        //                 'created_at',
        //             ],
        //             include: { model: User, attributes: ['username'] },
        //         },
        //         { model: User, attributes: ['username'] },
        //     ],
        // });
        // Serialize data so the template can read it and reverse order so newest posts show near top
        const posts = postData.map((post) => post.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
            logged_in: req.session,
        });
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

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
