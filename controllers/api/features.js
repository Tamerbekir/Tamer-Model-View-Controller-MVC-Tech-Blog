const express = require('express');
const router = express.Router();

//Future of the tech blog page
router.get('/', async (req,res) => {
    try {
        res.render('features')
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router