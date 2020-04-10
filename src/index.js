const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const overrideM = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();
require('./database');

// TODO Initializations
const app = express();

// TODO Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
// ? Configuracion del motor de plantillas handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
// ? Establecer el motor de plantillas
app.set('view engine', '.hbs');

// TODO Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(overrideM('_method'));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// TODO Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// TODO Routes
app.use(require('./routes/index'));
app.use(require('./routes/tasks'));
app.use(require('./routes/user'));

// TODO Static Files
app.use(express.static(path.join(__dirname, 'public')));

// TODO Server is listenning
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});