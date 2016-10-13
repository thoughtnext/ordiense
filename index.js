var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http')
var connection = require('./server/server.db_connection.js');
var routes = require('./server/server.routes.js');

var app = express();

app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('hi')
})

allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

connection.start();
routes.configure(app);

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
