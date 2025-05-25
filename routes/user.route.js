const express = require('express');
const router = express.Router();

const {
    getUser,
    createUser,
    deleteUser,
} = require('../controllers/user.controller');

router.get('/',(req,res)=>{
    res.render('pages/index',{title:'Finly'});
});

router.get('/login',(req,res)=>{
    res.render('pages/login',{
        title:'Sign in'
    });
});

router.get('signup',(req,res)=>{
    res.render('pages/signup',{
        title:'Sign Up'
    });
});

module.exports = router;
