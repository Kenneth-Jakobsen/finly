const Customer = require('../libs/models/customer.model');
const Invoice = require('../libs/models/invoice.model');

const {body, validationResults} = require('express-validator');

const validateInvoice = [
    body('customer', 'Select the Customer').notEmpty(),
    body('amount', 'Amount must not be empty').notEmpty(),
    body('date', 'Due Date must not be empty').notEmpty(),
    body('status', 'Select the Status').notEmpty(),
];

populateInvoices = query =>{
    return query.populate({path:'customer', model:Customer, select:'_id name'});
};

const showInvoices = async(req,res) =>{
    const query = {owner:req.session.userId};

    const invoices = await Invoice.find(query);
    res.render('pages/invoices',{
        title:'Invoices',
        type:'data',
        invoices,
        info:req.flash('info')[0],
    });
};

const createInvoice = async(req,res) =>{
    const validationErrors = validationResults(req);
    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array();
        req.flash('errors', errors);
        req.flash('data', req.body);
        return res.redirect('create');
    }

    const newInvoice = req.body;
    newInvoice.owner = req.session.userId;
    await Invoice.create(newInvoice);
    req.flash('info',{
        message:'New Invoice Created',
        type:'Success'
    });
};

const getCustomers = async(req,res,next) =>{
    const customerQuery = {owner:req.session.userId};
    const customers = await Customer.find(customerQuery);
    req.customers = customers;
    next();
}

module.exports = {
    showInvoices,
    createInvoice,
    getCustomers,
    validateInvoice,
};