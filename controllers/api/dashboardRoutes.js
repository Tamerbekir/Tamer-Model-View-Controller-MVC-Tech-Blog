const express = require('express');
const router = express.Router();
const { Post } = require('../models')

// This will get all the blog posts that were posted by the user when they are logged in
router.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    Post.findAll({
        where: {
            user_id: req.session.user_id //need to store username upon log in
        }
    }).then(posts => {
        const newPost = posts.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts: newPost,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send('There was a problem fetching data');
    });
});

module.exports = router;

