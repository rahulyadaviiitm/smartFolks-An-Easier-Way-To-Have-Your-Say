var express=require("express");
var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser = require('body-parser')
var url = require('url');
var multer=require('multer');
var app=express();
var path=require("path");
var myFun = require('./fun');
var User = require('./user');
var mongodb = require('mongodb');
var problem=require('./problem');
var eventOrg=require('./eventorg');
var Orgs=require('./org');
var Admin=require('./admin');

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({  
  extended: true
})); 
app.use(cookieParser());
app.use(session({secret:"Rahul_Yadav",resave:true,saveUninitialized:true}));

app.use(multer({
  dest:path.join(__dirname,'public/upload')
}).any());
app.use(express.static(__dirname+'/public'));
app.get("/",function(req,res){
 res.sendFile(path.join(__dirname+"/public/html/home.html"));
});
app.get("/folks",function(req,res){
    if(req.session.userType=='folks'){
       res.sendFile(path.join(__dirname+"/public/html/folks.html"));
    }
    else
      res.redirect('/');
  
});

app.get("/admin",function(req,res){
  if(req.session.userType=='admin'){
       res.sendFile(path.join(__dirname+"/public/html/admin.html"));
    }
    else
      res.redirect('/');
});
app.get("/organization",function(req,res){
  if(req.session.userType=='org'){
       res.sendFile(path.join(__dirname+"/public/html/organization.html"));
    }
    else
      res.redirect('/');
});

app.get("/login/:type",function(req,res){
 if(req.params.type=="folks"){
      if(req.session.userType=='folks'){
       res.redirect('/folks');
    }
      else
      res.sendFile(path.join(__dirname+"/public/html/login.html"));
 }
else if(req.params.type=="admin"){
      if(req.session.userType=='admin'){
       res.redirect('/admin');
    }
      else
      res.sendFile(path.join(__dirname+"/public/html/login.html"));
}
else if(req.params.type=="org"){
       if(req.session.userType=='org'){
       res.redirect('/organization');
    }
      else
      res.sendFile(path.join(__dirname+"/public/html/login.html"));
}

});
app.get("/register/:type",function(req,res){

if(req.params.type=='folks'){
  res.sendFile(path.join(__dirname+"/public/html/register.html"));
}
else if(req.params.type=="org"){
  res.sendFile(path.join(__dirname+"/public/html/register.html"));
}

});

app.post("/register/new/user",function(req,res){
      var data=req.body;
      var para=req.body.type;
      if(para=='folks')
      {
        myFun.registerFolks(data,res);
      }
      else if(para=='org')
      {
        myFun.registerOrg(data,res);
      }
});
app.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if (err) {throw err;}
  });
  res.redirect('/');
});
app.post('/check/user/existing',function (req,res) {
  myFun.checkCredentials(req,res);
})

app.get('/api/problem',function(req,res){
  myFun.sendProblem(req.session.userEmail,res);
});

app.get('/api/following',function(req,res){
   myFun.sendEvents(req.session.userEmail,res);
});
app.get('/api/suggestion',function(req,res){
   myFun.sendSuggestion(req.session.userEmail,res);
});

app.get('/api/admin/problem',function(req,res){
myFun.sendProblemToAdmin(req.session.userEmail,res);
});
app.post('/api/likebutton/problem',function(req,res){
  myFun.likeButtonFun(req.session.userEmail,User,problem,req.body.r_id,res);
});
app.post('/api/dislikebutton/problem',function(req,res){
  myFun.dislikeButtonFun(req.session.userEmail,User,problem,req.body.r_id,res);
});
app.post('/api/likebutton/event',function(req,res){
  myFun.likeButtonFun(req.session.userEmail,User,eventOrg,req.body.r_id,res);
});
app.post('/api/dislikebutton/event',function(req,res){
  myFun.dislikeButtonFun(req.session.userEmail,User,eventOrg,req.body.r_id,res);
});
// app.get('/folks',function(req,res){
//   res.sendFile(path.join(__dirname+"/public/html/folks.html"));
// });


app.post('/api/likebutton/admin/problem',function(req,res){
  myFun.likeButtonFun(req.session.userEmail,Admin,problem,req.body.r_id,res);
});

app.post('/api/dislikebutton/admin/problem',function(req,res){
  myFun.dislikeButtonFun(req.session.userEmail,Admin,problem,req.body.r_id,res);
});


app.post('/api/add/replyto/problem',function(req,res){
  myFun.addReplyToProblem(req.session.userEmail,req.body,res);
});

app.post('/api/addproblem',function(req,res){
 myFun.addNewProblem(req,res);
});
app.post('/api/add/new/following',function(req,res){
  myFun.addNewFollowing(req.session.userEmail,req.body.o_id,res);
});


app.post('/api/addevent',function(req,res){
myFun.addNewEvent(req,res);
});

app.get('/api/send/events/owner',function(req,res){
myFun.sendEventToOwner(req.session.userEmail,res);
});

app.get('/api/suggest/area',function(req,res){
myFun.sendAreaNameSuggession(req.query.qdata,res);
});

app.get('/api/get/count/problem/user',function(req,res){
  var data={};
  User.find({},function(err,result){
    if(err) throw err;
    data.user_count=result.length;
  });
  Orgs.find({},function(err,result){
    if(err) throw err;
    data.org_count=result.length;
  });
  problem.find({},function(err,result){
    if(err) throw err;
    data.problem_count=result.length;
    res.json(data);
   });
});

app.post('/api/add/query/message',function(req,res){
myFun.addQueryMessage(req,res);
});

app.get('/owner',function(req,res){
    if(req.session.pannel=='yes'){
     res.sendFile(path.join(__dirname+"/public/html/owner.html"));
  }
  else
    res.sendFile(path.join(__dirname+"/public/html/ownerlogin.html"));
});

app.post('/owner',function(req,res){
    var data=req.body;
    if(data.usremail=='smartcp' && data.usrpwd=='!qazmlp@'){
      req.session.pannel='yes';
      res.sendFile(path.join(__dirname+"/public/html/owner.html"));
    }
    else
    res.end('You are Not Authentic User.');
});

app.get('/api/query/owner',function(req,res){
  myFun.sendQueryToOwner(res);
});

app.post('/api/add/new/admin',function(req,res){
  myFun.addNewAdminstration(req,res);
});
app.post('/api/replyto/query',function(req,res){
  myFun.makeReplyToQuery(req,res);
})


app.listen(8082);
console.log("Server is runnig on 8082 port");