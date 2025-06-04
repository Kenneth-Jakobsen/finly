const User = require('../libs/models/user.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const validateSignup = [
    body('email', 'Email must not be empty').notEmpty(),
    body('password', 'Password must not be empty').notEmpty(),
    body('password', 'Password must be 6+ characters long').isLength({ min: 6 }),
    body('repeatPassword', 'Repeat Password must not be empty').notEmpty(),
    body('repeatPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
];

const validateLogin = [
    body('email', 'Email must not be empty').notEmpty(),
    body('password', 'Password must not be empty').notEmpty(),
];

const signup = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        req.flash('errors', errors);
        req.flash('data', req.body)
        return res.redirect('/signup');
    }
    const { email, password } = req.body;
    const query = { email };
    const existingUser = await User.findOne(query);
    if (existingUser) {
        req.flash('data', req.body);
        req.flash('info', {
            message: 'Email is already registered.',
            type: 'errors'
        });
        res.redirect('/signup');
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            email,
            password: hashedPassword,
        };
        const result = await User.create(user);
        req.session.userId = result._id;
        req.flash('info', {
            message: 'Signup Successful',
            type: 'success'
        })
        res.redirect('/dashboard');
    }
}

const login = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        req.flash('errors', errors);
        req.flash('data', req.body);
        return res.redirect('/login');
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            req.session.userId = user._id;
            req.flash('info', {
                message: 'Login successful',
                type: 'success'
            });
            res.redirect('/dashboard');
        }
        else {
            req.flash('info', {
                message: 'Wrong Password',
                type: 'errors'
            });
            req.flash('data', req.body);
            res.redirect('/login');
        }
    }
    else {
        req.flash('info', {
            message: 'Email is not registered',
            type: 'errors'
        });
        req.flash('data', req.body);
        res.redirect('/login');
    }
}

const logout = (req, res) => {
    req.session.userId = null;
    req.flash('info', {
        message: 'Logout successful',
        type: 'success'
    });
    res.redirect('/')
};



module.exports = {
    validateSignup,
    signup,
    login,
    validateLogin,
    logout
};

