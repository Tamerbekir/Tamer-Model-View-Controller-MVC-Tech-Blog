const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const blogPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true })) //added to show posts show on dashboard
        console.log(blogPosts)
        res.render('dashboard', { blogPosts });
    } else {
        res.redirect('/login')
    }
});


router.post('/post/create', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});


//Route for updating the individual blot post
router.post('/update/:id', async (req, res) => {
    try {
        const updateBlogPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        
        res.redirect('/dashboard')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Route for deleting a post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        // res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
