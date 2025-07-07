const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('connect-flash');
const {verifyUser} = require('./libs/middleware')
const app = express();
const PORT = 3000;

const userRoute = require('./routes/user.route')
const dashboardRouter = require('./routes/dashboard.route')

require('dotenv').config();
require('./libs/dbConnect');

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}))
app.use(
  session({
    secret:process.env.AUTH_SECRET,
    saveUninitialized:true,
    resave:false,
  })
);
app.use(flash());

app.use('/', userRoute);
app.use('/dashboard',verifyUser, dashboardRouter);



app.use((req,res)=>{
  res.status(404).render('./pages/index',{title:'Not Found',message:'No such page'})
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});