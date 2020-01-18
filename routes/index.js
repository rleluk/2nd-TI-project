const {check, validationResult} = require('express-validator');
const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const UserController = require('../controllers/UserController');
const SurveyController = require('../controllers/SurveyController');

router.get('/', UserController.loginPage);

router.get('/register', UserController.registerPage);

router.post('/login', 
    [
        check('login').isLength({min: 1}).withMessage('Podano nieprawidłowy login.'),
        check('password').isLength({min: 1}).withMessage('Podano nieprawidłowe hasło.')
    ], 
    UserController.login
);

router.post('/register', 
    [
        check('login')
            .isLength({min: 1}).withMessage('Podano nieprawidłowy login.').bail()
            .isAlphanumeric().withMessage('Login musi zawierać wyłącznie znaki alfanumeryczne.'),
        check('password').isLength({min: 1}).withMessage('Podano nieprawidłowe hasło.'),
        check('passwordConfirmation')
            .custom((value, {req}) => {
                if (value !== req.body.password) 
                    throw new Error("Hasła się różnią.");
                return true;
            })
    ], 
    UserController.register
);

router.get('/home',
    PagesController.sessionChecker,
    PagesController.home
);

router.get('/survey',
    PagesController.sessionChecker,
    PagesController.survey
);

router.get('/analysis',
    PagesController.sessionChecker,
    PagesController.analysis
);

router.get('/logout',
    PagesController.sessionChecker,
    PagesController.logout
);

router.post('/survey',
    [
        check('sex').isIn(['mężczyzna', 'kobieta']),
        check('genre').isLength({min: 1}),
        check('artist').isLength({min: 1}),
        check('piece').isLength({min: 1}),
        check('listeningTime').isIn(['codziennie', '2-3 razy w tygodniu', 'parę razy w miesiącu', 'kilka razy w roku', 'nigdy']),
        check('date').isISO8601()
    ],

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) 
            return res.status(400).send({msg: 'Wprowadzono nieprawidłowe dane.'});

        next();
    },

    SurveyController.saveAnswers
);

router.get('/survey/all',
    PagesController.sessionChecker,
    SurveyController.getSurveyData
);

module.exports = router;