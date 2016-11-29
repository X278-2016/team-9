var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
var Question = require('../models/question');
var Button =  require('../models/button');
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
        Button.find(function(err, buttons) {
            if(err)
                res.send(err);
            res.json(buttons);

        });
    })
    //POST a new user
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls.
        var button = new Button();
        button.content = req.body.content;
        button.createDate = req.body.createDate;
        button.creator = req.body.creator;
        button.parentPtr = req.body.parentPtr;
        button.childPtr = req.body.childPtr;
        button.save(function(err, button){
            if(err)
                res.send(err);
            res.json({res_msg: 'button created success!', button});
        });
    });



// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Button').findById(id, function (err, button) {
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
        Button.findById(req.id, function (err, button) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
                res.send(err);
            }
            console.log('GET Retrieving ID: ' + question._id);
            res.json(button);
        });
    })
    .put(function(req, res) {
        // Get our REST or form values.
        Button.findById(req.id, function (err, button) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            }
            button.content = req.body.content;
            button.createDate = req.body.createDate;
            button.creator = req.body.creator;
            button.parentPtr = req.body.parentPtr;
            button.childPtr = req.body.childPtr;
            button.save(function(err) {
                if(err)
                    res.send(err);
                res.json({res_msg: 'Button updated!'});
            });
        });
    })
    .delete(function (req, res){
        Button.remove({
            _id: req.params.button_id
        }, function(err, button) {
            if (err) {
                res.send(err);
            }
            res.json({res_msg: 'Button deleted!'});
        });
    });


module.exports = router;


