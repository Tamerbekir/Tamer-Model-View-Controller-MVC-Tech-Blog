const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        res.render('features', {
            logged_in: req.session.logged_in,
            user: req.session.user
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router