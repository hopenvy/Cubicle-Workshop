const { Router } = require('express');
const router = Router();
const validator = require('validator');

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

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body

    let isStrongPassword = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });


    if (password !== repeatPassword) {
        res.render('register', { message: 'Password missmatch!' })
        return;
    }

    try {
        let user = await authService.register({ username, password });

        if (!isStrongPassword) {
            throw { message: 'You should have strong password!' };
        }

        res.redirect('auth/login');

    } catch (error) {
        res.render('register', { error });
    }

});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});

module.exports = router;