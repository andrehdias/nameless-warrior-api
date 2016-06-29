var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),			
		port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/nameless-warrior');		

app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('./controllers'));

app.listen(port, function() {
	console.log('YOOOOO!, Server up on port: ' + port);
});
