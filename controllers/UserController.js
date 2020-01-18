const User = require('../models/User');
const {validationResult} = require('express-validator');

exports.loginPage = (req, res) => {
    if(req.session.user && req.cookies.user_sid) 
        res.redirect('home');
    else res.render('login');
};

exports.login = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.render('login', {
        errors: errors.mapped()
      });
    }

    try {
        let result = await User.checkCredentials(req.body);

        if(result !== null) {
            req.session.user = req.body.login;
            res.redirect('/home');
        } else {
            res.render('login', {
                notFound: true
            });
        }
        
    } catch (err) {
        console.log(err);
    }
};

exports.registerPage = (req, res) => {
    if(req.session.user && req.cookies.user_sid) 
        res.redirect('home');
    else res.render('register');
};

exports.register = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.render('register', {
        errors: errors.mapped()
      });
    }

    let result = await User.findByLogin(req.body.login);
    
    if(result === null) {

        try {
            await User.registerInDatabase(req.body);
            res.render('register', {
                message: 'Zarejestrowano pomyślnie.'
            });
        } catch(err) {
            console.log(err);
            res.render('register', {
                message: 'Coś poszło nie tak...'
            });
        }
        
    } else {
        res.render('register', {
            message: 'Użytkownik o takim loginie już istnieje.'
        });
    }
};