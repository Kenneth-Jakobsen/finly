const Customer = require('../libs/models/customer.model');
const Invoice = require('../libs/models/invoice.model');

const {EUR} = require('../libs/formatter');

const showDashboard = async(req,res)=>{
    const query = {owner:req.session.userId};

    const invoiceCount = await Invoice.countDocuments(query);
    const customerCount = await Customer.countDocuments(query);

    const allInvoices = await Invoice.find(query)
    .populate({
        path:'customer',
        model:'Customer',
        select:'_id name',          
    });

    allInvoices.sort((a,b) => new Date(b.date) - new Date(a.date));
    const latestInvoices = allInvoices.slice(0, 5);

     const revenueData = [];
        for(let i=0; i<6; i++){
            const today = new Date();
            today.setMonth(today.getMonth()-i);
            const firstDay = new Date(today.getFullYear(), today.getMonth(),1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() +1, 0);
            const month = today.toLocaleString('default', {month:'short'});
    
            const revenueMonth = allInvoices.filter(invoice =>{
                return(
                    new Date(invoice.date) >= firstDay && new Date(invoice.date) <= lastDay
                );
            }).reduce((total, invoice) => total + invoice.amount, 0);

            revenueData.unshift({month, revenue:revenueMonth});
        }

    const totalPaid = allInvoices.reduce((sum, invoice)=>{
        return invoice.status === 'paid' ? sum + invoice.amount : sum;
    },0);

    const totalPending = allInvoices.reduce((sum, invoice)=>{
        return invoice.status === 'pending' ? sum + invoice.amount : sum
    },0);

    console.log('EUR in controller', EUR)

    res.render('pages/dashboard',{
        title:'Dashboard',
        invoiceCount,
        customerCount,
        totalPaid,
        totalPending,
        EUR,
        latestInvoices,
        revenueData:JSON.stringify(revenueData),
        info:req.flash('info')[0],
    });
};

module.exports = {
    showDashboard
}