require('dotenv').config()
var express = require('express')                //necessary modules required
var path = require('path')
var app = express()
var nodemailer = require('nodemailer');

//body parser and database connectivity
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

 //Schemas Defined
 //NGO Schema
 var ngoSchema = new mongoose.Schema({
    nGOName: String,
    filingPersonName: String,
    email: String,
    address: String,
    ngostate: String,
    employement: String,
    experience: String,
    contactno: String,
})
 //Victim Schema
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
//RF Schema
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

app.post('/addNgo',function(req,res)      //Add NGO Request 
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

app.post('/addVictim',function(req,res)     //Add Victim Request
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

app.post('/Rf',function(req,res)      //Friend Report Request
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

app.post('/mail',function(req,res)        //mail function
{
  var obj = req.body;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: 'hack7jack@gmail.com',
    to: 'hack7jack@gmail.com',
    subject: 'Domestic Violence Contact Form',
    text: "You have got a contact request from: " + req.body.username + "\n" + " From SHOUTUP\nThe First Name is: " + req.body.firstName + "\n" + " Last Name is: " + req.body.lastName + "\nThe subject is: " + req.body.subject + "\nThe message is: " + req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.res);
      res.sendFile(path.join(__dirname + '/public/index.html'));
    }
  });
})

//Server Running Confirmation
app.listen(3000,function()
{
  console.log("Running on port 3000");
});
