const express = require('express');
const router = express.Router();

const {
    validateSignup,
    signup
} = require('../controllers/user.controller');

router.get('/', (req, res) => {
    res.render('pages/index', { title: 'Finly' });
});
router.get('/login', (req, res) => {
    res.render('pages/login', {title: 'Sign in',});
});
router.get('/signup', (req, res) => {
    res.render('pages/signup', {title: 'Sign up',errors:req.flash('errors')});
});

router.post('/signup', validateSignup, signup)
module.exports = router;
