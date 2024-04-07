const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const posts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        res.render('dashboard', { posts });
    } else {
        res.redirect('/login');
    }
});


router.post('/create', async (req, res) => {
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

// Route for updating a post
router.put('/update/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: { id: req.params.id, user_id: req.session.user_id }
        });
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(201).json(updatedPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for deleting a post
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id, user_id: req.session.user_id }
        });
        if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(201).json(deletedPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
