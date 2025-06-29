const Customer = require('../libs/models/customer.model');

const {body, validationResult} = require('express-validator');
const Invoice = require('../libs/models/invoice.model');

const validateCustomer =[ 
    body('name', 'Name must not be empty').notEmpty(),
    body('email', 'Email must not be empty').notEmpty(),
    body('phone', 'Phone must not be empty').notEmpty(),
    body('address', 'Address must not be empty').notEmpty(),
];

const showCustomer = async(req,res) => {
    const query = {owner:req.session.userId};
    const customers = await Customer.find(query);

    res.render('pages/customers',{
        title:'Customer',
        type:'data',
        customers,
        info:req.flash('info')[0],
    });
};

const createCustomer = async(req,res) =>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array();
        req.flash('errors', errors);
        req.flash('data', req.body);
        return res.redirect('create');
    }

    const newCustomer = req.body;
    newCustomer.owner = req.session.userId;
    await Customer.create(newCustomer);
    req.flash('info',{
        message:'Customer created',
        type:'success'
    });
    res.redirect('/dashboard/customers');
};

const editCustomer = async(req,res) =>{
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    res.render('pages/customers',{
        title:'Edit Customer',
        type:'form',
        formAction:'edit',
        customer:req.flash('data')[0] || customer,
        errors:req.flash('errors'),
        
    });
};

const updateCustomer = async(req,res) =>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array();
        req.flash('errors', errors);
        req.flash('data', req.body);
        req.flash('info',{
        message:'Customer Updated',
        type:'success'
    });
        return res.redirect('edit');
    };

    const customerId = req.params.id;
    const customerData = req.body;

    await Customer.findByIdAndUpdate(customerId, customerData);
    req.flash('info',{
        message:'Customer Updated',
        type:'success'
    });
    res.redirect('/dashboard/customers');
}

const deleteCustomer = async(req,res) =>{
    const customerId = req.params.id;

    await Invoice.deleteMany({customer: customerId});
    await Customer.findByIdAndDelete(customerId);

    req.flash('info',{
        message:'Customer Deleted',
        type:'Success',
    });
    res.redirect('/dashboard/customers')
}

module.exports = {
    showCustomer,
    editCustomer,
    updateCustomer,
    validateCustomer,
    createCustomer,
    deleteCustomer,
};