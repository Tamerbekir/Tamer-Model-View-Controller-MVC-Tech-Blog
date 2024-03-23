const express = require('express')
const exphbs = require('express-handleBars')
const sessions = require('express-session')

const sequelize  = require('./config/connection')
const routes = require('./controllers/homeRoute')

const SequelizeStore = require('connect-session-sequelize')(sessions.Store)
const session = require('express-session')

const app = express()
const  PORT = process.env.PORT ||  3001;

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(routes)

sequelize.sync({ force: false }).then(()=>
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)))