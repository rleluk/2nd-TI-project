const Survey = require('../models/Survey');

exports.sessionChecker = (req, res, next) => {
    if(!req.session.user || !req.cookies.user_sid) 
        res.redirect('/');
    else next();
};

exports.home = (req, res) => {
    res.render('home');
};

exports.survey = async (req, res) => {
    res.render('survey');
};

exports.analysis = async (req, res) => {
    try {
        let data = await Survey.getAll();
        res.render('analysis', {answers: data});
    } catch(err) {
        console.log(err);
    }
};

exports.logout = (req, res) => {
    if(req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
    } 
    res.redirect('/');
};


