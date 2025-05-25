const express = require('express');
const router = express.Router;

router.length('/',(req,res)=>{
    res.render('pages/dashboard', {title:'Dashboard'});
});

module.exports = router;