const {check} = require('express-validator');
const express = require('express');
const router = express.Router();

const utils = require('./utils');
const PagesController = require('../controllers/PagesController');

router.get('/', PagesController.loginPage);

router.post('/', 
    [
        check('login').isLength({min: 1}).withMessage('Login is required.'),
        check('password').isLength({min: 1}).withMessage('Password is required')
    ], 
    PagesController.checkUserValidation, 
    PagesController.login
);

router.get('/home',
    utils.sessionChecker,
    PagesController.home
);

router.get('/survey',
    utils.sessionChecker,
    PagesController.survey
);

router.get('/analysis',
    utils.sessionChecker,
    PagesController.analysis
);

router.get('/logout',
    utils.sessionChecker,
    PagesController.logout
);

module.exports = router;