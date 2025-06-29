const { info } = require('autoprefixer');
const express = require('express');
const router = express.Router();
const customersRoute = require('./customer.route');
const invoicesRouter = require('./invoice.route');
const { showDashboard } = require('../controllers/dashboard.controller');

router.get('/', showDashboard);
router.use('/customers', customersRoute);
router.use('/invoices', invoicesRouter);

module.exports = router;