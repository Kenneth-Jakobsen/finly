const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
require('./lib/dbConnect');
const app = express();
app.use(morgan('dev'));
const PORT = 3000;

app.use(express.static('public'));


app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello from Node.js' });
});

app.get('/about', (req, res) => {
  res.render('about', { message: 'About Us' });
});
app.get('/contact', (req, res) => {
  res.render('contact', { message: 'Contact Us' });
});

app.use((req, res, next) => {
  res.status(404).render('404', { message: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
