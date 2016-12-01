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
        Question.find(function(err, questions) {
          if(err) 
            res.send(err);
          res.json(questions);

        });
    })
    //POST a new user
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls.
        var question = new Question();
        question.body = req.body.body;
        question.createDate = req.body.createDate;
        question.creator = req.body.creator;
        question.save(function(err, question){
          if(err) 
            res.send(err);
          res.json({res_msg: 'question created success!', question});
        });
    });



// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Question').findById(id, function (err, question) {
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
    Question.findById(req.id, function (err, question) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
        res.send(err);
      } 
        console.log('GET Retrieving ID: ' + question._id);
        //res.json(question);
        Button.find({parentPtr: question._id}, function(err, buttons) {
            if(err)
                res.send(err);
            res.json({question: question, button: buttons});
        });
    });
  })
  .put(function(req, res) {
    // Get our REST or form values.
    Question.findById(req.id, function (err, question) {
      if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
      } 
      question = new Question();
      question.body = req.body.body;
     // question.createDate = req.body.createDate;
      question.creator = req.body.creator;
      question.save(function(err) {
          if(err)
            res.send(err);
          res.json({res_msg: 'Question updated!'});
      });
      });
  })
  .delete(function (req, res){
      Question.remove({
        _id: req.params.question_id
      }, function(err, question) {
        if (err) {
            res.send(err);
        } 
        res.json({res_msg: 'Question deleted!'});
    });
  });


module.exports = router;


