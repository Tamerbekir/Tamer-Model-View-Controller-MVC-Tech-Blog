const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');


router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const commentData = await Comment.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const comments = commentData.map((comments) => comments.get({ plain: true })) //added to show comments show on homepage
        res.render('homepage', { comments });
    } else {
        res.redirect('/login')
    }
});

//Made route for creating comment
router.post('/create', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            post_id: req.body.postId,
            user_id: req.session.user_id
        });
        // to see if comment is created
        res.status(201).json(newComment)
    } catch (err) {
        res.status(500).json(err);
    }
});



//Made route for deleting comment
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })
        if (deleteComment) {
            res.status(404).json({ message: "no comment found with this id" })
            return
        }
        res.status(200).json(deleteComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router; 