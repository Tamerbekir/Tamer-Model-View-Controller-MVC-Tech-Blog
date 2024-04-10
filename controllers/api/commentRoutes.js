const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');


//Made route for creating comment
router.post('/create', async (req, res) => {
    // console.log(req.body)
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            post_id: req.body.blogPost_id,
            user_id: req.session.user_id
        })
        //using to ensure comment was created and in database. All is working
        // console.log(req.body);
        // res.status(200).json(newComment);
        res.redirect('/');
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
        });
        if (!deleteComment) {
            res.status(404).json({ message: "No comment found with this id" });
        } else {
            res.status(200).json({ message: "Comment deleted successfully" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router; 