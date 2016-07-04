var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),			
		port = process.env.PORT || 8080;


var connStr = 'mongodb://localhost:27017/nameless-warrior';
mongoose.connect(connStr, function(err) {
	if (err) throw err;
	console.log('Successfully connect to MongoDB');
});		

app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('./routes'));

app.listen(port, function() {
	console.log('YOOOOO!, Server up on port: ' + port);
});
