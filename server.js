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
    ngoname: String,
    email: String,
    NGOLocation: String,
    ngoaddress: String,
    ngophone: String,
    NGOIssues: String,
})
 
var VictimSchema = new mongoose.Schema({
  victimName: String,
  gender: String,
  age: String,
  phone: String,
  email: String,
  location: String,
  address: String,
  issue: String,
  status: String,
  extent: String,
  criminal_name: String,
  criminal_relation: String,
  description: String,
})

var ReportAsAFriendSchema = new mongoose.Schema({
  rf_name: String,
  rf_age: String,
  rf_phone: String,
  rf_email: String,
  rf_address: String,
  rf_victim_name: String,
  rf_victim_phone: String,
  rf_victim_relationship: String,
  rf_description: String,
})

var ngo = mongoose.model('ngo', ngoSchema);
var victim = mongoose.model('victims',VictimSchema);
var reporter = mongoose.model('friendreport',ReportAsAFriendSchema);

app.post('/addNgo',function(req,res)
{
  var obj = req.body;
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
      ngo.find({ NGOLocation : obj.location}).then(data => {console.log(data)});
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
