const express = require('express');
const router = express.Router();
//taking in data from Post model
const { Post } = require('../models')

//This will render the blog posts to the homepage once they are created by the user
router.get('/', async (req, res) => {
    try {
        const blogPost = await Post.findAll({
            order: [[ 'created', 'DESC' ]],
        })
        const posts = blogPost.map(post => post.get({ plain:true }))

        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            posts
        })
    } catch {
        console.error(err);
        res.status(500).json({ message: 'Error fetching blog posts' });
    }
})

module.exports = router