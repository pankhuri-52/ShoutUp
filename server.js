var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

  app.use(function (req, res, next) {
    next()
  })

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ngodb = 'mongodb://localhost/NGOs';

mongoose.connect(ngodb);

mongoose.connection.on('error',(err) => {
  console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
    useNewUrlParser: true;
   console.log('DB connected');
 })

 var ngoSchema = new mongoose.Schema({
    nGOName: String,
    filingPersonName: String,
    email: String,
    address: String,
    newstate: String,
    employement: String,
    experience: String,
    contactno: String,
})
 
var VictimSchema = new mongoose.Schema({
  victim_name: String,
  gender: String,
  age: String,
  contactno: String,
  email: String,
  address: String,
  description: String,
  state: String,
  issueFacing: String,
  abuse_status: String,
  extent_abuse: String,
  criminalName: String,
  relationWithCriminal: String,
})

var ReportAsAFriendSchema = new mongoose.Schema({
  rfName: String,
  age: String,
  contactno: String,
  email: String,
  address: String,
  victim_name: String,
  victim_number: String,
  relationshipWithVictim: String,
  description: String,
})

var ngo = mongoose.model('ngo', ngoSchema);
var victim = mongoose.model('victims',VictimSchema);
var reporter = mongoose.model('friendreport',ReportAsAFriendSchema);

app.post('/addNgo',function(req,res)
{
  var obj = req.body;
  console.log(obj);
  ngo.create(obj,function(error,result)
  {
    if(error)
    throw err;
    else
    {
      res.sendFile(path.join(__dirname + '/public/index.html'));  }
    })
})

app.post('/addVictim',function(req,res)
{
  var obj = req.body;
  victim.create(obj,function(error,result)
  {
    if(error)
    throw err;
    else
    {
      ngo.find({ state : obj.state}).then(data => {console.log(data)});
      res.sendFile(path.join(__dirname + '/public/index.html'));  }
    })
})

app.post('/Rf',function(req,res)
{
  var obj = req.body;
  reporter.create(obj,function(error,result)
  {
    if(error)
    throw err;
    else
    {
      res.sendFile(path.join(__dirname + '/public/Victim.html'));  }
    })
})

//Server Running Confirmation
app.listen(3000,function()
{
  console.log("Running on port 3000");
});
