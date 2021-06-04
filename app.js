//require modules
 const express = require('express');
 const bodyParser= require('body-parser');
 const journel= require(__dirname+"/Journel.js");

 

//Objects for storing journel blogs
const journel1= new journel("Harry", "Potter");
console.log(journel1.heading);
var journelArray=[];
journelArray.push(journel1);
 //getting module functions
 const app= express();
 app.set('view engine', 'ejs');
 app.use(express.static("public"))
 app.use(bodyParser.urlencoded({extended:true}));

//Get Request

app.get('/', function(req,res){
    res.render("index", {journels : journelArray})

});

 //Starting The Server
 app.listen(3000,function(){
     console.log("Server Started at Port 3000 for PROJECT DAILY JOURNEL")
 });
