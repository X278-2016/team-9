var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
var User = require('../model/user');
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))


//build the REST operations at the base for users
//this will be accessible from http://127.0.0.1:3000/users if the default route for / is left unchanged
router.route('/')
    //GET all users
    .get(function(req, res) {
        //retrieve all users from Monogo
        User.find(function(err, users) {
          if(err) 
            res.send(err);
          res.json(users);
        });
    })
    //POST a new user
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls.
        var user = new User();
        user.lgnName = req.body.lgnName;
        user.password = req.body.password;
        user.userName = req.body.userName;
        user.race = req.body.race;
        user.income = req.body.income;
        user.age = req.body.age;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.county = req.body.county;
        user.hhNum = req.body.hhNum;
        user.gender = req.body.gender;
        user.isDisabled = req.body.isDisabled;
        user.isVeteran = req.body.isVeteran;
        user.isForeign = req.body.isForeign;
        
        user.save(function(err){
          if(err) 
            res.send(err);
          res.json({res_msg: 'user created success!'});
        });
    });


/* GET New User page. */
router.get('/new', function(req, res) {
    res.render('users/new', { title: 'Add New User' });
});


// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('User').findById(id, function (err, user) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(user);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});


router.route('/:id')
  .get(function(req, res) {
    User.findById(req.id, function (err, user) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
        res.send(err);
      } 
        console.log('GET Retrieving ID: ' + user._id);
        res.json(user);
    });
  })
  .put(function(req, res) {
    // Get our REST or form values.
    User.findById(req.id, function (err, user) {
      if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
      } 
      user.lgnName = req.body.lgnName;
      user.password = req.body.password;
      user.userName = req.body.userName;
      user.race = req.body.race;
      user.income = req.body.income;
      user.age = req.body.age;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.county = req.body.county;
      user.hhNum = req.body.hhNum;
      user.gender = req.body.gender;
      user.isDisabled = req.body.isDisabled;
      user.isVeteran = req.body.isVeteran;
      user.isForeign = req.body.isForeign;
      user.save(function(err) {
          if(err)
            res.send(err);
          res.json({res_msg: 'User updated!'});
      });
      });
  })
  .delete(function (req, res){
      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) {
            res.send(err);
        } 
        res.json({res_msg: 'User deleted!'});
    });
});


module.exports = router;


