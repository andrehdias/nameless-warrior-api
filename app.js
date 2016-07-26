var express    = require('express'),
		app        = module.exports = express(),
		bodyParser = require('body-parser'),
		mongoose   = require('mongoose'),
		port       = process.env.PORT || 8080,
		config     = require('./api.json');


//Connect to Mongo
mongoose.connect(config.connStr, function(err) {
	if (err) throw err;
	console.log('Successfully connect to MongoDB');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//API Access Control to REST
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


//Set secret to auth
app.set('superSecret', config.secret);


//Call routes
app.use(require('./routes'));


// route middleware to verify a token
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});


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
