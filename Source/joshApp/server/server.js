// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration

// Thanks to http://www.joshmorony.com/building-a-review-app-with-ionic-2-mongodb-node/ for the start code
mongoose.connect('mongodb://localhost/pocketmanager');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Expense = mongoose.model('Expense', {
    category: String,
    amount: Number,
    vendor: String,
    dateAdd: Date
});
 
// Routes
 
    // Get expense
    app.get('/tab/record', function(req, res) {
 
        console.log("fetching expenses");
 
        // use mongoose to get all expense in the database
        Expense.find(function(err, data) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(record); // return all expense in JSON format
        });
    });
 
    // create expense and send back all expense after creation
    app.post('/tab/record', function(req, res) {
 
        console.log("creating expense");
 
        // create a expense, information comes from AJAX request from Ionic
        Expense.create({
            category : req.body.category,
            amount : req.body.amount,
            vendor: req.body.vendor,
            dateAdd: req.body.date,
            done : false
        }, function(err, data) {
            if (err)
                res.send(err);
 
            // get and return all the expense after you create another
            Expense.find(function(err, data) {
                if (err)
                    res.send(err)
                res.json(data);
            });
        });
 
    });
 
    // delete a expense
    app.delete('/tab/record/:expense_id', function(req, res) {
        Expense.remove({
            _id : req.params.expense_id
        }, function(err, data) {
 
        });
    });
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");