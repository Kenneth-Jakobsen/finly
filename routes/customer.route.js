const express = require('express');
const router = express.Router();

const {
    showCustomer,
    createCustomer,
    validateCustomer,
    editCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customer.controller');

router.get('/', showCustomer);

router.get('/create',function(req,res){
    res.render('pages/customers',{
        title:'Create Customer',
        formAction:'create',
        type:'form',
        customer:req.flash('data')[0],
        errors:req.flash('errors'),
        info:req.flash('info')[0],
    });
});

router.get('/:id/edit', editCustomer);
router.post('/:id/edit', validateCustomer, updateCustomer);
router.post('/:id/delete', deleteCustomer);


router.post('/create',validateCustomer, createCustomer);

module.exports = router;