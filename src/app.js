require('dotenv').config();
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrategy');
const path = require('path');


app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

// MongoDB
const db = require('./database/database');
db.then(() => console.log('Connected to MongoDB.')).catch(err => console.log(err));

// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'MoWebsite'
}));

// Viewing
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);




app.use('/', isAuthorized, (req, res) => {
    res.render('home', { })

});

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log("User is authorized. ON app.js");
        req.session.user = 
        res.redirect('/dashboard');
    } 
    else {
        console.log("User is not logged in.");
        next();
    }
}

app.listen(PORT, () => console.log(`Now listening to requests on port ${PORT}`));
