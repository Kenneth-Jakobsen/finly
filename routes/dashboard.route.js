const { info } = require('autoprefixer');
const express = require('express');
const router = express.Router();
const customersRoute = require('./customer.route');
const invoicesRouter = require('./invoice.route');

router.get('/',(req,res)=>{
    res.render('pages/dashboard', {title:'Dashboard', info:req.flash('info')[0]});
});
router.use('/customers', customersRoute);
router.use('/invoices', invoicesRouter);

module.exports = router;