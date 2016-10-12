var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./server/server.db_connection.js');
var routes = require('./server/server.routes.js');

var port = 8000;

var app = express();

app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res){
	res.send('hi')
})

connection.start();
routes.configure(app);

app.listen(port || process.env.PORT, function() {
  console.log("Your sever is running at http://localhost:" + port);
});
