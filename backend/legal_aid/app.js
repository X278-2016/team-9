var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var buttons = require('./routes/buttons');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var Grid    = require('gridfs-stream');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
require('./config/passport')(passport);
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'legal_aid' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./route.js')(app, passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/legal_aid');
var conn = mongoose.connection;

var port = process.env.PORT || 3000;
app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);
app.use('/buttons', buttons);

app.post('/upload', upload.single('pdf'), function(req, res) {
    var dirname = require('path').dirname(__dirname);
    console.log(dirname);
    var filename = req.file.filename;
    var path = req.file.path;
    console.log(path);
    var type = req.file.mimetype;
    console.log(dirname + '/' + path);
    var read_stream =  fs.createReadStream(dirname + '/team-9/' + path);

   // var conn = req.conn;
    Grid.mongo = mongoose.mongo;

    var gfs = Grid(conn.db);

    var writestream = gfs.createWriteStream({
        filename: filename
    });
    read_stream.pipe(writestream);
    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
    });
});


app.get('/file/:id',function(req,res){
    var pic_id = req.param('id');
    Grid.mongo = mongoose.mongo;

    var gfs = Grid(conn.db);

    gfs.files.find({filename: pic_id}).toArray(function (err, files) {

        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            var mime = 'application/pdf';
            res.set('Content-Type', mime);
            var read_stream = gfs.createReadStream({filename: pic_id});
            read_stream.pipe(res);
        } else {
            res.json('File Not Found');
        }
    });
});

app.get('/download', function(req, res) {
   // var gfs = req.gfs;
  // TODO: set proper mime type + filename, handle errors, etc...
  //gfs
  // create a read stream from gfs...
  //    .createReadStream({ filename: req.param('filename') })
      // and pipe it to Express' response
  //    .pipe(res);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port);
console.log('Listening port ' + port);