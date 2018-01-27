var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var shapes = require('./routes/shapes')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/shapes', shapes)

app.listen('3000', ()=> console.log('Application listening on http://localhost:3000/'));

module.exports = app;
