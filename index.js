const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./lib/dbConnect');
const app = express();
app.use(morgan('dev'));
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));



app.get('/', (req, res) => {
  res.render('index', { message: 'Hello from Node.js' });
});

app.get('/contact', (req, res) => {
res.render('index', { message: 'The Contact Page' });
});

app.get('/about', (req, res) => {
res.render('index', { message: 'The About Page' });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});