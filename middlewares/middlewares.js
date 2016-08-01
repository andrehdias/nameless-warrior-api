var jwt = require('jsonwebtoken'),
		app = require('../app');

module.exports = {
	// route middleware to verify a token
	tokenMiddleware: function(req, res, next) {  
	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
	      if (err) {
	        return res.status(403).send({ 
	          success: false,
	          message: 'Authentication failed' 
	        });
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
	      message: 'Authentication failed'
	    });
	  }
	}
}