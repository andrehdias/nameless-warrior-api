var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),			
		port = process.env.PORT || 8080,
		config = require('./api.json');


//Connect to Mongo
mongoose.connect(config.connStr, function(err) {
	if (err) throw err;
	console.log('Successfully connect to MongoDB');
});		


//Set template engine
app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');


//Config express
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


//API Access Control
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


//Call routes
app.use(require('./routes'));


// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
  	console.log(err)
  	
    res.status(err.status || 500)
	    .send({
	        message: err.message,
	        error: err
	    });
  });
}


// Production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    	.send({
        message: err.message,
        error: {}
    	});
});


//Open server
app.listen(port, function() {
	console.log('YOOOOO!, Server up on port: ' + port);
});
