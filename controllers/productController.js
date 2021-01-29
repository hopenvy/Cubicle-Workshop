const { Router } = require('express');
const uniqid = require('uniqid');
const Cube = require('../models/cubeModel');

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Browse' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/crete', (req, res) => {
    let data = req.body;
    let cube = new Cube(uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    res.redirect('/products');
});

router.get('/details/:productId', (req, res) => {
    res.render('details', { title: 'Details' });
})

module.exports = router;
