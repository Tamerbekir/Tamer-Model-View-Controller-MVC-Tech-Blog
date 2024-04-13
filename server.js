//for api
const path = require('path');
//brining in package for .dotevn file/session
require('dotenv').config();
//package for using express
const express = require('express')
//brining in package for handlebars
const exphbs = require('express-handlebars');
//package for using express sessions
const sessions = require('express-session')
//brought in date helpers
const dateHelpers = require('./utils/helpers');
//time helper
const moment = require('moment');
//bringing in handlebars 
const handlebars = require('handlebars');







//grabbing the routes from the index.js in the controllers  folder
//which has all the route files inside of it
const routes = require('./controllers')

//package for sequelize
const SequelizeStore = require('connect-session-sequelize')(sessions.Store)
//added sequelize package, which will grab data from the config folder, connection.js
const sequelize = require('./config/connection')

//middleware for express
const app = express()
//port
const PORT = process.env.PORT || 3001;


// custom helper for time and date
const hbs = exphbs.create({ 
    helpers: dateHelpers,
    layoutsDir: path.join(__dirname, 'views/layouts')
});

//helper for handlebars that will work with the delete button showing IF the user leaves a comment it will check if user === active comment, thus showing delete button. 
handlebars.registerHelper('eq', function (val1, val2) {
    return val1 === val2;
});


// setting up Handlebars engine with custom helpers
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//middlewares for express to use on every request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//we are setting up a session that uses sequelize 
const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

///added session middleware to make sure user is logged in before
app.use(sessions(sess));
app.use(routes)


// turn on connections and start server with provided port
sequelize.sync({ force: false }).then(() =>
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)))