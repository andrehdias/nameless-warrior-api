var express = require('express'),
router = express.Router();

/*Character = require('../models/characters');*/


//JADE Routes
router.route('/list')
.get(function(req, res, next) {
  var characters = [ 
    { 
      _id: '57838cc5f7c09db81b09d493',
      nickname: 'Andrézinho'        
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    },
    { 
      _id: '57838cdaf7c09db81b09d495',
      nickname: 'uashduasd'
    }  
  ];

  res.render('characters/list', {'characters': characters});
});

module.exports = router;