var User = require('./user');
var Orgs=require('./org');
var Admin=require('./admin');
var problem=require('./problem');
var eventOrg=require('./eventorg');
var path=require("path");
var fs = require('fs');
var Jimp = require("jimp");
var Query=require('./query');
var nodemailer = require('nodemailer');
var im = require('imagemagick');
// function updateMoreInfo(npdata){

// }
module.exports={
 
 registerFolks:function(usrData,response) {
 	     User.find({email:usrData.usrEmail},function(err,user){
            if (err) throw err;
            if(user.length==0){
                var newUser=User({
                name:usrData.usrName,
                email:usrData.usrEmail,
                password:usrData.usrPsw,
                area:usrData.usrArea.toUpperCase()
                });
            newUser.save(function(err){
            	if (err) throw err;
              response.end('folks');
            });
          }
          else if(user.length>0){
             response.end('already');
             }
        });

 },
       registerOrg:function(orgData,response) {
         Orgs.find({email:orgData.usrEmail},function(err,org){
            if (err) throw err;
            if(org.length==0){
                var newOrg=Orgs({
                name:orgData.usrName,
                email:orgData.usrEmail,
                password:orgData.usrPsw,
                area:orgData.usrArea.toUpperCase()
                });
            newOrg.save(function(err){
              if (err) throw err;
              response.end('org');
            });
          }
          else if(org.length>0){
              response.end('already');
             }
        });

 },

checkCredentials:function(req,res){
  if(req.body.type=='folks'){
    User.find({email:req.body.usremail,password:req.body.usrpwd},function(err,result){
      if(err) throw err;
      if(result.length>0){
           req.session.userEmail=req.body.usremail;
           req.session.userType='folks';
           res.end('folks');
      }
      else res.end('0');
    })
  }
 else if(req.body.type=='admin'){
    Admin.find({email:req.body.usremail,password:req.body.usrpwd},function(err,result){
      if(err) throw err;
      if(result.length>0){
           req.session.userEmail=req.body.usremail;
           req.session.userType='admin';
           res.end('admin');
      }
      else res.end('0');
    })
  }
   else if(req.body.type=='org'){
    Orgs.find({email:req.body.usremail,password:req.body.usrpwd},function(err,result){
      if(err) throw err;
      if(result.length>0){
           req.session.userEmail=req.body.usremail;
           req.session.userType='org';
           res.end('org');
      }
      else res.end('0');
    })
  }
},
sendProblem:function(sessionEmail,response){
 User.find({email:sessionEmail},function(err,user){
   if(err) throw err;
   if(user.length>0){
     problem.find({area:user[0].area},function(err,result){
    if(err) throw err;
     var data=result.sort(function(a,b){
        // var c = ;
        // var d = ;
        return new Date(b.time) - new Date(a.time);
        });
    data.push({
         u_id:user[0]._id,
         u_area:user[0].area,
         u_name:user[0].name
      });
    response.json(data);
   });
 }
  });
},
sendProblemToAdmin:function(sessionEmail,response){
      Admin.find({email:sessionEmail},function(err,result){
      if(err) throw err;
      if(result.length>0){
      problem.find({area:result[0].area},function(err,resdata){
        if (err) throw err;
        var data=resdata.sort(function(a,b){
        var c = new Date(a.time);
        var d = new Date(b.time);
        return d-c;
        });
        data.push({
         ad_id:result[0]._id,
         adminName:result[0].name,
         adminPlace:result[0].area
      });    
        response.json(data);
       });
     }
  });
},
sendEvents:function(sessionEmail,response){
 User.find({email:sessionEmail},function(err,user){
   if(err) throw err;
   if(user.length>0){
     eventOrg.find({area:user[0].area,org_id:{$in:user[0].following}},function(err,result){
    if(err) throw err;
     var data=result.sort(function(a,b){
        return new Date(b.time) - new Date(a.time);
        });
     data.push({
         u_id:user[0]._id
      });
    response.json(data);
   });
 }
  });
},

sendEventToOwner :function(sessionEmail,response){
    Orgs.find({email:sessionEmail},function(err,result){
      if(err) throw err;
      if(result.length>0){
        eventOrg.find({author:result[0].name},function(err,resdata){
        if(err) throw err;
         var data=resdata.sort(function(a,b){
        // var c = ;
        // var d = ;
        return new Date(b.time) - new Date(a.time);
        });
        data.push({
          org_name:result[0].name,
          org_area:result[0].area
        });
        response.json(data);
      });
    }
 });
},
sendSuggestion:function(sessionEmail,response){
 User.find({email:sessionEmail},function(err,user){
   if(err) throw err;
   if(user.length>0){
     Orgs.find({area:user[0].area,_id:{$nin:user[0].following}},function(err,result){
    if(err) throw err;
    response.json(result);
   });
 }
  });
},

addNewProblem:function(request,response){
if(request.files.length>0 && request.files[0].size >5242880){
  response.end('large');
}
else{
User.find({email:request.session.userEmail},function(err,user){
if(err) { response.end('0'); throw err;}
        if(user.length>0){
        var d = new Date();
        var newProblem=problem({
        author:user[0].name,
        area:user[0].area,
        topic:request.body.prbmTopic,
        description:request.body.prbmDescription,
        img:"",
        admin:'',
        like:'',
        dislike:'',
        time:d.toString()
        });
if(request.files.length>0){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    var img_extension=request.files[0].originalname.split('.');
    var img_name = text+'.'+img_extension[1];
    var old_path=request.files[0].path;
    var new_path=request.files[0].destination+'/'+img_name;
    fs.rename(old_path, new_path, function (err) {
    if (err) { response.end('0'); throw err;}
    Jimp.read(new_path, function (err, rec_img) {
    if (err) { response.end('0'); throw err;}
     rec_img.autocrop()
         .resize(1000, Jimp.AUTO)
         .quality(50)        
         .write(new_path); 
      });
   });
  newProblem.img='/upload/'+img_name;
}

        newProblem.save(function(err){
          if(err){response.end('0'); throw err;} 
          else{
            response.end('1');
          }
        });
      }
  });
}
},
addNewEvent:function(request,response){
if(request.files.length>0 && request.files[0].size >5242880){
  response.end('large');
}
else{
 Orgs.find({email:request.session.userEmail},function(err,result){
 if(err) throw err;
 if(result.length>0){
    var d = new Date();
    var newEvent=eventOrg({
      org_id:result[0]._id,
      author:result[0].name,
      area:result[0].area,
      topic:request.body.event_topic,
      description:request.body.event_des,
      img:'',
      like:'',
      dislike:'',
      time:d.toString()
    });

if(request.files.length>0){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    var img_extension=request.files[0].originalname.split('.');
    var img_name = text+'.'+img_extension[1];
    var old_path=request.files[0].path;
    var new_path=request.files[0].destination+'/'+img_name;
    fs.rename(old_path, new_path, function (err) {
    if (err) { response.end('0'); throw err;}
    Jimp.read(new_path, function (err, rec_img) {
    if (err) { response.end('0'); throw err;}
     rec_img.autocrop()
          .resize(1000, Jimp.AUTO)
         .quality(50)
         .write(new_path);            
      });
   });
  newEvent.img='/upload/'+img_name;
}

    newEvent.save(function(err){
     if(err){response.end('0'); throw err;} 
     else{
           response.end('1');
         }
      });
    }
  });
}
},
addNewFollowing:function(sessionEmail,o_id,response){
      User.find({email:sessionEmail},function(err,result){
      if(err) throw err;
      if(result.length>0){
      result[0].following.push(o_id);
      result[0].save(function(err){
        if(err){
           response.end('0');
           throw err;
          }
           else
           response.end('1');
        });
      }
   });
},

addReplyToProblem:function(sessionEmail,pdata,response){
            Admin.find({email:sessionEmail},function(err,user){
                if(err){
                  response.end('0');
                  throw err;
                } 
              if(user.length>0){
                problem.find({_id:pdata.p_id},function(err,result){
                if(err){response.end('0');throw err;} 
                result[0].admin=pdata.reply;
                result[0].save(function(err){
                  if(err){
                    response.end('0');
                    throw err;
                  }
                  else
                    response.end('1');
                });
            });
          }
      });
},

likeButtonFun:function(sessionEmail,colName1,colName2,obj_id,response){
colName1.find({email:sessionEmail},function(err,user){
if(err) throw err;
if(user.length>0){
      colName2.find({_id:obj_id},function(err,result){
            if(err) throw err;
             if(result.length>0)
            var like_index=result[0].like_by.indexOf(user[0]._id);
            var dislike_index=result[0].dislike_by.indexOf(user[0]._id);
            if(like_index==-1&&dislike_index==-1){
              result[0].like_by.push(user[0]._id);
              result[0].save();
              response.end("1");
            }
            else if(like_index!=-1&&dislike_index==-1){
              result[0].like_by.splice(like_index,1);
              result[0].save();
              response.end('2');
            }
            else if(like_index==-1&&dislike_index!=-1){
              result[0].dislike_by.splice(dislike_index,1);
              result[0].like_by.push(user[0]._id);
              result[0].save();
              response.end('3')
            }
            
           });

      }
  });

},
dislikeButtonFun:function(sessionEmail,colName1,colName2,obj_id,response){
colName1.find({email:sessionEmail},function(err,user){
if(err) throw err;
if(user.length>0){
      colName2.find({_id:obj_id},function(err,result){
            if(err) throw err;
             if(result.length>0)
            var like_index=result[0].like_by.indexOf(user[0]._id);
            var dislike_index=result[0].dislike_by.indexOf(user[0]._id);
            if(like_index==-1&&dislike_index==-1){
              result[0].dislike_by.push(user[0]._id);
              result[0].save();
              response.end("1");
            }
            else if(like_index==-1&&dislike_index!=-1){
              result[0].dislike_by.splice(dislike_index,1);
              result[0].save();
              response.end('2');
            }
            else if(like_index!=-1&&dislike_index==-1){
              result[0].like_by.splice(like_index,1);
              result[0].dislike_by.push(user[0]._id);
              result[0].save();
              response.end('3')
            }
            
           });

      }
  });

},
sendAreaNameSuggession:function(entr_data,response){
    User.distinct("area",function(err,data){
    if(err) throw err;
    var area_data=[];
    if(data.length>0){
        for(var i=0;i<data.length;i++){
           if((data[i].toLowerCase()).indexOf(entr_data.toLowerCase())!=-1)
            area_data.push(data[i]);
          }      
        response.json(area_data);
     }
  });
},

addQueryMessage:function(request,response){
    var data=request.body; 
    var d= new Date();
    var newQuery=Query({
    name:data.qname,
    email:data.qemail,
    message:data.qmsg,
    time:d.toString(),
    reply:'no'
    });
   newQuery.save(function(err){
      if(err){response.end('0');throw err;}
      response.end('1');
    });
},

sendQueryToOwner:function(response){
    Query.find({reply:'no'},function(err,result){
    if(err) throw err;
    if(result.length>0){
      var data=result.sort(function(a,b){
        return new Date(b.time) - new Date(a.time);
        });
      response.json(data);
    }
    else
      response.end('0');
  });
},

addNewAdminstration:function(request,response){
    Admin.find({email:request.body.admin_email},function(err,result){
    if(err) {response.end('0'); throw err;}
    if(result.length>0){response.end('already');}
    else{
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));    
         
        var newAdmin=Admin({
        name:request.body.admin_name,
        email:request.body.admin_email,
        area:request.body.admin_area.toUpperCase(),
        password:text
       });

        newAdmin.save(function(err){
        if(err){response.end('0');throw err;}
          // response.end('1');
            var email=request.body.admin_email;
            var mysubject="Credentials for SmartFolks";
            var myhtml = "<p>Hello "+request.body.admin_name+"</p><p>Your credentials for SmartFolks are as:-<br/><br/> Username: " +request.body.admin_email+"<br><br> Password: " +text+"<br/></p><p>Now you can see all the problem of your region as well deparment also.For more please visit <a href='smartfolks.tk' target='_blank'>SmartFolks</a> <br/> <br/>Thanks For Your Time.</p>";
          sendEmailToPerson(email,mysubject,myhtml,response);
        });
 
     }
  });
},

makeReplyToQuery:function(request,response){
      var data=request.body;
      Query.find({_id:data.q_id},function(err,result){
      if(err) throw err;
      if(result.length>0){
        var email=result[0].email;
        var message_txt=data.q_reply;
        var mysub="Query Reply"
        var myhtml="<pre style='font-family:sans-serif;'>"+message_txt+"</pre><br/><br/><p>Thanks for contacting us.<br/>Regards<br/><a href='smartfolks.tk' target='_blank'>SmartFolks</a></p>";
        sendEmailToPerson(email,mysub,myhtml,response);
        result[0].reply='yes';
        result[0].save(function(err){
          if(err){ response.end('0');throw err;}
          });
      }
      else
        response.end('0');
  });

}



}



function sendEmailToPerson(email,sub,htmlMsg,response){
       var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "infosmartfolks@gmail.com",
            pass: "smart@folks"
           }
       });
     var message = {
      from: '"smartFolks Info"<infosmartfolks@gmail.com>',
      to: email,
      subject:sub, 
      html:htmlMsg
     };
    transport.sendMail(message, function(error,info){
    if(error){
       response.end('0');
      }
   response.end('1');
   transport.close(); 
});










}
