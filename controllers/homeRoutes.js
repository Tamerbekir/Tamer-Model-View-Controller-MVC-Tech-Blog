//bringing in express package
const express = require('express');
//for express routes
const router = express.Router();

// Renders the main/home page to the user
router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
});

//renders the login page to the user
router.get('/login', (req,res) => {
    res.render('login', { loggedIn: req.session.loggedIn } );
})

router.get('/homepage', (req,res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn } );
})

//wild card that renders home page if parameter is not found
router.get('*', (req, res) => {
    res.render('home', { loggedIn: req.session.loggedIn });
});

//exporting routes to server.js
module.exports = router;
