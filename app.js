//require modules
 const express = require('express');
 const bodyParser= require('body-parser');
 const journel= require(__dirname+"/Journel.js");
 const headingData= require(__dirname+"/headingData.js")
 const _ = require('lodash');

 

//Objects for storing journel blogs
const journel1= new journel("Harry", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente molestias corrupti eum doloremque nemo facilis ipsam enim. Atque aut sit a at iure nisi facilis quo, quas est? Vitae, adipisci.");
console.log(journel1.heading);
var journelArray=[];
journelArray.push(journel1);

console.log(headingData.home[0])

 //getting module functions
 const app= express();
 app.set('view engine', 'ejs');
 app.use(express.static("public"))
 app.use(bodyParser.urlencoded({extended:true}));


//Get Requests
// 1. home route
app.get('/', function(req,res){
    res.render("index", {journels : journelArray , heading : headingData.home[0] , text:headingData.about[1]});
});

// 2. about route
app.get('/about', function(req,res){
    res.render("about", {heading : headingData.about[0] , text:headingData.about[1]});
});

// 3. contact route
app.get('/contact', function(req,res){
    res.render("contact", {heading : headingData.contact[0], text:headingData.contact[1]});
});

// 4.compose route
app.get('/compose', function(req,res){
    res.render("compose");
});

// 5. posts route
app.get('/posts/:param', function(req, res){
    const param= _.lowerCase(req.params.param);
    console.log(param);
    let postReq= new journel("No post found","");
    for(let i=0; i<journelArray.length;i++){
        if(param=== _.lowerCase(journelArray[i].heading)){
            console.log('Match Found');
            postReq=journelArray[i];
            break;
        }
    }
    res.render("post", {postReq: postReq});
    
})

//Post Requests
app.post("/",function(req,res){
    const newJournel = new journel(req.body.journelTitle, req.body.journelText);
    console.log(newJournel);
    journelArray.push(newJournel)
    res.redirect("/");
})

 //Starting The Server
 app.listen(3000,function(){
     console.log("Server Started at Port 3000 for PROJECT DAILY JOURNEL")
 });
