const express = require('express')
//Bringing in express package and Router package
const router = express.Router()

//the home page/ main index when going to the website. Used 'test' as a  placeholder for now.
router.get('/', (req, res) =>{
    res.send('test')
})

//exporting the routes to server.js
module.exports = router