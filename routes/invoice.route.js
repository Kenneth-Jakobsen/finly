const express = require('express');
const router = express.Router();

const {
    showInvoices,
    getCustomers,
    createInvoice,
    validateInvoice
} = require('../controllers/invoice.controller');

router.get('/', showInvoices);

router.get('/create', getCustomers, (req,res) =>{
    const {customers} = req;
    res.render('pages/invoices',{
        title:'Create Invoice',
        formAction:'create',
        type:'form',
        customers,
        invoice:req.flash('data')[0],
        errors:req.flash('errors')
    });
});

router.post('/create', validateInvoice, createInvoice);

module.exports = router;