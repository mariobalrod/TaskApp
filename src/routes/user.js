const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');
require('../config/passport');

//------------------------------------------------------------------------------------------------
//          SIGN IN
//------------------------------------------------------------------------------------------------
router.get('/user/signin', (req, res) => {
    res.render('user/signIn');
});

router.post('/user/signin', passport.authenticate('local', {
    successRedirect: '/task',
    failureRedirect: '/user/signin',
    failureFlash: true 
}));

//------------------------------------------------------------------------------------------------
//          SIGN UP
//------------------------------------------------------------------------------------------------
router.get('/user/signup', (req, res) => {
    res.render('user/signUp');
});

router.post('/user/signup', async (req, res) => {

    const { email, username, password, confirmPassword } = req.body;
    const errors = [];
    if(password!=confirmPassword){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 5){
        errors.push({text: 'La contraseña es demasiado corta.'});
    }

    if(errors.length > 0){

        res.render('user/signUp', {errors, email, username, password, confirmPassword});

    }else {

        // TODO Comprobando si las credenciales ya estan en uso
        const emailUser = await User.findOne({email: email});
        const usernameUser = await User.findOne({username: username});
        if(emailUser) {
            req.flash('error_msg', 'Email is already in use');
            res.redirect('/user/signup');
        } else if (usernameUser) {
            req.flash('error_msg', 'Username is already in use');
            res.redirect('/user/signup');
        } else {
            // TODO Guardando usuario en base de datos
            const newUser = new User({username, email, password});
            //? Encrypted password
            newUser.password = await newUser.encryptPassword(password);

            await newUser.save();

            //? Mensaje de registrado usando la dependencia connect-flash
            req.flash('success_msg', 'You are registered!');

            console.log('New User Registered!');

            res.redirect('/user/signIn');
        }
        
    }

});

//------------------------------------------------------------------------------------------------
//          PROFILE
//------------------------------------------------------------------------------------------------
router.get('/user/profile', (req, res) => {
    res.render('user/profile');
});

module.exports = router;