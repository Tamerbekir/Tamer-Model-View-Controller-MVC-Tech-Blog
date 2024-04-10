const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');


router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
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

module.exports = router