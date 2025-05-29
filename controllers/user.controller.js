const User= require('../lib/models/user.model');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


const validateSignup = [
    body('email', 'Email must not be empty').notEmpty(),
    body('password', 'Password must not be empty').notEmpty(),
    body('password', 'Password must be 6+ characters long').isLength({min:6}),
    body('repeatPassword', 'Repeat Password must not be empty').notEmpty(),
    body('repeatPassword', 'Passwords do not match').custom((value,{req})=>(value===req.body.password)),
];

const signup = async (req,res)=>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array();
        req.flash('errors', errors);
        return res.redirect('/signup');
    }
    const {email, password} = req.body;
    const query = {email};
    const existingUser = await User.findOne(query);
    if(existingUser){
        res.redirect('/signup')
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10)
        const user = {
            email,
            password:hashedPassword,
        };
        const result = await User.create(user);
        req.session.userId = result._id;
        res.redirect('/dashboard');
    }
}




module.exports = {
    validateSignup,
    signup,
};

