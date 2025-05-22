const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const app = express();
const PORT = 3000;
const userRoute = require('./routes/user.route')

require('dotenv').config();
require('./lib/dbConnect');

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(
  session({
    secret:process.env.AUTH_SECRET,
    saveUninitialized:true,
    resave:false,
  })
);

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello from Node.js' });
});

app.get('/contact', (req, res) => {
res.render('index', { message: 'The Contact Page' });
});

app.get('/about', (req, res) => {
res.render('index', { message: 'The About Page' });
});

app.use('/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});