const checkCredentials = require('../models/User');
const {validationResult} = require('express-validator');

exports.sessionChecker = (req, res, next) => {
    if(!req.session.user || !req.cookies.user_sid) 
        res.redirect('/');
    else next();
};

exports.loginPage = (req, res) => {
    if(req.session.user && req.cookies.user_sid) 
        res.redirect('home');
    else res.render('login');
};

exports.home = (req, res) => {
    res.render('home');
};

exports.checkUserValidation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.render('login', {
        errors: errors.mapped()
      });
    }
    next();
};

exports.login = async (req, res) => {
    let result = await checkCredentials(req.body);
    if(result !== null) {
        req.session.user = req.body.login;
        res.redirect('/home');
    } else {
        res.render('login', {
            notFound: true
        });
    }
};

exports.logout = (req, res) => {
    if(req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
    } 
    res.redirect('/');
};