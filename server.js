const express = require('express')
const exphbs = require('express-handleBars')
const sessions = require('express-session')

const routes = require('./controllers/homeRoute')

const SequelizeStore = require('connect-session-sequelize')(sessions.Store)
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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

app.use(routes)

sequelize.sync({ force: false }).then(() =>
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)))