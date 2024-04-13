const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const withAuth =  require('../../utils/auth')

// Route to display a single blog post
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['name'] }]
                }
            ]
        });

        if (blogPostData) {
            const blogPost = blogPostData.get({ plain: true });
            res.render('blogpost', {
                blogPost,
                logged_in: req.session.logged_in,
                user: req.session.user
            });
        } else {
            res.status(404).json({ message: 'No blog post found with this id' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for editing a blog post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['name'] }]
                }
            ]
        });


        if (!postData) {
            res.render('404page')
            return;
        }

        if (postData.user_id !== req.session.user_id) {
            res.render('404page')
            return;
        }
        const post = postData.get({ plain: true });
        res.render('editBlogPost', { post, logged_in: req.session.logged_in });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
