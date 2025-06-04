const express = require('express');
const router = express.Router();
const {redirectAuthenticated } = require('../libs/middleware');

const {
    validateSignup,
    signup,
    login,
    validateLogin,
    logout
} = require('../controllers/user.controller');

router.get('/',redirectAuthenticated, (req, res) => {
    res.render('pages/index', { title: 'Finly', info:req.flash('info')[0] });
});
router.get('/login', redirectAuthenticated, (req, res) => {
    res.render('pages/login', {title: 'Sign in', user:req.flash('data')[0], info:req.flash('info')[0], errors:req.flash('errors')});
});

router.post('/login', validateLogin, login);

router.get('/logout', logout);

router.get('/signup', redirectAuthenticated, (req, res) => {
    res.render('pages/signup', {title: 'Sign up', user:req.flash('data')[0], info:req.flash('info')[0], errors: req.flash('errors')});
});

router.post('/signup', validateSignup, signup)
module.exports = router;
