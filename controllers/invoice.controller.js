const Customer = require('../libs/models/customer.model');
const Invoice = require('../libs/models/invoice.model');

const { body, validationResult } = require('express-validator');
const { populate } = require('../libs/models/user.model');
const { EUR } = require('../libs/formatter'); 

const validateInvoice = [
    body('customer', 'Select the Customer').notEmpty(),
    body('amount', 'Amount must not be empty').notEmpty(),
    body('date', 'Due Date must not be empty').notEmpty(),
    body('status', 'Select the Status').notEmpty(),
];

const populateInvoices = query => {
    return query.populate({ path: 'customer', model: Customer, select: '_id name' });
};

const showInvoices = async (req, res) => {
    const query = { owner: req.session.userId };
    const invoices = await populateInvoices(Invoice.find(query));
    res.render('pages/invoices', {
        title: 'Invoices',
        type: 'data',
        invoices,
        EUR,
        info: req.flash('info')[0],
    });
    console.log(invoices)
};



const createInvoice = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        req.flash('errors', errors);
        req.flash('data', req.body);
        return res.redirect('create');
    }

    const newInvoice = req.body;
    newInvoice.owner = req.session.userId;
    await Invoice.create(newInvoice);
    req.flash('info', {
        message: 'New Invoice Created',
        type: 'Success'
    });

    res.redirect('/dashboard/invoices');
};

const getCustomers = async (req, res, next) => {
    const customerQuery = { owner: req.session.userId };
    const customers = await Customer.find(customerQuery);
    req.customers = customers;
    next();
}

const editInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    const invoice = await populateInvoices(Invoice.findById(invoiceId));
    const { customers } = req;

    res.render('pages/invoices', {
        title: 'Edit Invoice',
        type: 'form',
        formAction: 'edit',
        customers,
        invoice: req.flash('data')[0] || invoice,
        errors: req.flash('errors'),
    });
}

const updateInvoice = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        req.flash('errors', errors);
        req.flash('data', req.body);
        return res.redirect('edit');
    }

    const invoiceId = req.params.id;
    const data = req.body;

    await Invoice.findByIdAndUpdate(invoiceId, data);
    req.flash('info', {
        message: 'Invoice Updated',
        type: 'Success'
    });

    res.redirect('/dashboard/invoices');
};

const deleteInvoice = async (req, res) => {
    const invoiceId = req.params.id;

    await Invoice.findByIdAndDelete(invoiceId);
    req.flash('info', {
        message: 'Invoice Deleted',
        type: 'Success'
    });
    res.redirect('/dashboard/invoices');
};


module.exports = {
    showInvoices,
    createInvoice,
    getCustomers,
    editInvoice,
    updateInvoice,
    deleteInvoice,
    validateInvoice,
};