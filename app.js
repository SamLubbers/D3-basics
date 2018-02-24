var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var svg = require('./routes/svg');
var fundamentals = require('./routes/fundamentals');
var charts = require('./routes/charts');
var force = require('./routes/force');
var maps = require('./routes/maps');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true,
	sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/svg', svg);
app.use('/fundamentals', fundamentals);
app.use('/charts', charts);
app.use('/force', force);
app.use('/maps', maps);


app.listen('3000', () => console.log(
	'Application listening on http://localhost:3000/'));

module.exports = app;
