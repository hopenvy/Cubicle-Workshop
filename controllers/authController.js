const { Router } = require('express');
const router = Router();
const validator = require('validator');
const { body, validationResult } = require('express-validator');

const authService = require('../services/authService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');


const { COOKIE_NAME } = require('../config/config')

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch (error) {
        console.log(console.error);
        res.render('login', { error });
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

const isStrongPasswordMiddleware = (req, res, next) => {
    let password = req.body.password;

    let isStrongPassword = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });

    if (!isStrongPassword) {
        return res.render('register', { error: { message: 'You should have strong password!' }, username: req.body });
    }
    next();
}

router.post('/register',
    isGuest,
    //isStrongPasswordMiddleware,
    body('username', 'Specify username').notEmpty(),
    body('password', 'Password too short').isLength({ min: 5 }),
    async (req, res) => {
        const { username, password, repeatPassword } = req.body

        if (password !== repeatPassword) {
            res.render('register', { message: 'Password missmatch!' });
            return;
        }

        let errors = validationResult(req);
        if (errors.errors.length > 0) {
            return res.render('register', errors );
        }

        try {
            let user = await authService.register({ username, password });

            res.redirect('/auth/login');

        } catch (error) {
            res.render('register', { error });
        }

    });

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});

module.exports = router;