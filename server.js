require('dotenv').config();
var express = require('express') //necessary modules required
var router = express.Router();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
var nodemailer = require('nodemailer');
var path = require('path')
var session = require('express-session');
var multer = require('multer');
var alert = require('alert-node')
var fs = require('fs');
const mongodb = require('mongodb');

var app = express();


//body parser and database connectivity
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true})); //If extended is false, you can not post "nested object"
app.use(express.json()); //incoming request as a json object

  app.use(function (req, res, next) { //middleware function that have access to request,response and next obj
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
 //mailing schema
 var mailSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   username: String,
   subject: String,
   message: String,
 })

 //NGO Schema
 var ngoSchema = new mongoose.Schema({
    nGOName: String,
    filingPersonName: String,
    email: String,
    address: String,
    statengo: String,
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
  statename: String,
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
var mailbox = mongoose.model('mails',mailSchema);

app.post('/mail',function(req,res){
  var obj=req.body;
  mailbox.create(obj,function(error,result){
    if(error)
      throw err;
    else{
      res.sendFile(path.join(__dirname + '/public/index.html'));
    }
  })
})

app.post('/addNgo',function(req,res)      //Add NGO Request 
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

app.post('/addVictim',function(req,res)     //Add Victim Request
{
  var obj = req.body;
  victim.create(obj,function(error,result)
  {
    if(error)
    throw err;
    else
    {
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
      res.sendFile(path.join(__dirname + '/public/index.html'));  }
    })
})

app.post('/mail',function(req,res){
  var obj = req.body;
  let transporter = nodemailer.createTransport({
      service :'gmail',
      auth : {
      user : process.env.EMAIL,
        pass : process.env.PASSWORD
      }
  });
  
  
  let mailOptions = {
      from : 'shoutup1617@gmail.com',
      to : 'shoutup1617@gmail.com',
      subject : 'Shoutup Contact Request',
      text : "You have got a contact request from: " + obj.username + "\n" + " From SHOUTUP\nThe First Name is: " + obj.firstName + "\n" + " Last Name is: " + obj.lastName + "\nThe subject is: " + obj.subject + "\nThe message is: " + obj.message
  };
  transporter.sendMail(mailOptions,function(err,data){
      if (err) {
        console.log('Error Occurs');
      } else {
         console.log('Email sent!!');
         res.sendFile(path.join(__dirname + '/public/index.html'));
      }
  });
});


//image uploading code
var storage=multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'uploads')
  },
    filename : function(req,file,cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
  storage : storage
})
app.post('/uploadphoto',upload.single('myImage'),(req,res) => {
   var img = fs.readFileSync(req.file.path);
   var encode_image = img.toString('base64');
   var finalImg = {
     contentType : req.file.mimetype,
     path : req.file.path,
     image : new Buffer(encode_image,'base64')
   };
})


//Server Running Confirmation
app.listen(3000,function()
{
  console.log("Running on port 3000");
});
