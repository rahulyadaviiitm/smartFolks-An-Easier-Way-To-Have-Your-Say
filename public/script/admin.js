function makevisibleUp(){
document.getElementById('up').style.display='block';
}
function myresizefn(){
var outWidth=window.outerWidth;
if (outWidth >=700) {
       var mn=document.getElementById("menudiv");
       if (mn.style.display=='none') {
        mn.style.display="block";
       }
   }
}

function showProblemTOadmin(adata){
    var parentdiv=document.getElementById("dynamicParent");
        if(parentdiv.childElementCount>0){
        document.getElementById('dynamicChild').remove();   
       }
    var nchild=document.createElement('div');
    nchild.setAttribute("id","dynamicChild");
    parentdiv.appendChild(nchild);
    var mydata=adata;
    var size=mydata.length;
    var info=document.getElementsByClassName('adminInfo');
    info[0].innerHTML=mydata[size-1].adminName;
    info[1].innerHTML=mydata[size-1].adminPlace;
    var adm_id=mydata[size-1].ad_id;
    info[0].setAttribute("style","font-weight:bold;");
    info[1].setAttribute("style","font-weight:bold;");
    mydata.pop();
    if(mydata.length>0){
        for(var i=0;i<mydata.length;i++){
        generateDiv(mydata[i],'admin',adm_id);
       }
    }
   else
   generateNodata(); 
}
function generateDiv(a,divTpye,admin_id){
	  var pagediv=document.getElementById('dynamicChild');
	  var mydiv=document.createElement("div");
	  var authr=document.createElement('span');
	  var authrval=document.createTextNode("Author:");
	  authr.setAttribute("style","font-weight:bold;")
    authr.appendChild(authrval);
    var areatag=document.createElement('span');
	  var areaval=document.createTextNode("Area:");
	  areatag.setAttribute("style","font-weight:bold;")
    areatag.appendChild(areaval);
    
    var prbmt=document.createElement('span');
	  var prbmtval=document.createTextNode("Topic:");
	  prbmt.setAttribute("style","font-weight:bold;")
    prbmt.appendChild(prbmtval);
    
    var prbmd=document.createElement('span');
	  var prbmdval=document.createTextNode("Description:");
	  prbmd.setAttribute("style","font-weight:bold;")
    prbmd.appendChild(prbmdval);

    var prbmad=document.createElement('span');
	  var prbmadval=document.createTextNode("Previous Reply:");
	  prbmad.setAttribute("style","font-weight:bold;")
    prbmad.appendChild(prbmadval);

    var adminInp=document.createElement('textarea');
    adminInp.setAttribute("name","adminReply");
    adminInp.setAttribute("id",a._id+"@input");
    adminInp.setAttribute("style","width:100%;height:100px;margin-top:10px;");
    
    var saveButton=document.createElement("button");
    saveButton.setAttribute("class","replyButton")
    saveButton.setAttribute("id",a._id+'@reply');
    saveButton.setAttribute('onclick',"replyButtonFn(this)");
    saveText=document.createTextNode("Update Reply");
    saveButton.appendChild(saveText);

    var br1=document.createElement('br');
    var br2=document.createElement('br');
    var br3=document.createElement('br');
    var br4=document.createElement('br');
    var br5=document.createElement('br');
    var br6=document.createElement('br');

	  var txt1=document.createElement('span');
	  var p1=document.createTextNode(a.author);
    txt1.appendChild(p1);
    var txt2=document.createElement('span');
	  var p2=document.createTextNode(a.area);
    txt2.appendChild(p2);
    var prbmtpoic=document.createElement('span');
	  var p3=document.createTextNode(a.topic);
    prbmtpoic.appendChild(p3);
    var prbmdes=document.createElement('span');
    var p4=document.createTextNode(a.description);
    prbmdes.appendChild(p4);
    var prbmimg=document.createElement('img');
    prbmimg.setAttribute("src",a.img);
    prbmimg.setAttribute('class','event_bimg');
    if(a.img){
          prbmimg.setAttribute('class','event_img');
    }
    var prbmadmin=document.createElement('span');
    prbmadmin.setAttribute('id',a._id+'@pre_reply');
    if(a.admin!=''){
         var p5=document.createTextNode(a.admin);
    }
    else
    {
         var p5=document.createTextNode("Not Replied");
    }
    var likedislikeDiv=document.createElement('div');
    likedislikeDiv.setAttribute("style","width:100%;");
    var like_div=document.createElement('div');
    like_div.setAttribute('id',a._id+"@l"+divTpye);
    like_div.setAttribute('class',"likeDiv");
    like_div.setAttribute('onclick','likeButtonPress(this)');
    var like_img=document.createElement('img');
    like_img.setAttribute('id',a._id+"@limg"+divTpye);
    var a_likeIndex=a.like_by.indexOf(admin_id);
    if(a_likeIndex==-1){
       like_img.setAttribute('src',"/image/elike.png");
      }
    else{
         like_img.setAttribute('src',"/image/flike.png");
      }
    like_img.setAttribute("style","width:30px;height:30px;verticaL-align:middle;");
    var like_text=document.createElement('span');
    like_text.setAttribute("style","margin:10px;");
    like_text.setAttribute("id",a._id+"@ltext"+divTpye);
    var like_text_val=document.createTextNode("Like:"+" "+a.like_by.length);
    like_text.appendChild(like_text_val);
    like_div.appendChild(like_img);
    like_div.appendChild(like_text);
    
    var dislike_div=document.createElement('div');
    dislike_div.setAttribute('id',a._id+"@d"+divTpye);
    dislike_div.setAttribute('class',"dislikeDiv");
    dislike_div.setAttribute('onclick','dislikeButtonPress(this)');
    var dislike_img=document.createElement('img');
    dislike_img.setAttribute('id',a._id+"@dimg"+divTpye);
    var a_dislikeIndex=a.dislike_by.indexOf(admin_id);
     if(a_dislikeIndex==-1){
           dislike_img.setAttribute('src',"/image/edis.png");
      }
    else{
         dislike_img.setAttribute('src',"/image/fdis.png");
      }
    dislike_img.setAttribute("style","width:30px;height:30px;verticaL-align:middle;");
    var dislike_text=document.createElement('span');
    dislike_text.setAttribute("style","margin:10px;");
    dislike_text.setAttribute("id",a._id+"@dtext"+divTpye);
    var dislike_text_val=document.createTextNode("Dislike:"+" "+a.dislike_by.length);
    dislike_text.appendChild(dislike_text_val);
    dislike_div.appendChild(dislike_img);
    dislike_div.appendChild(dislike_text);


    likedislikeDiv.appendChild(like_div);
    likedislikeDiv.appendChild(dislike_div);
    prbmadmin.appendChild(p5);
    mydiv.appendChild(authr);
    mydiv.appendChild(txt1);
    mydiv.appendChild(br1);
    mydiv.appendChild(areatag);
    mydiv.appendChild(txt2);
    mydiv.appendChild(br2);
     mydiv.appendChild(br4);
    mydiv.appendChild(prbmt);
    mydiv.appendChild(prbmtpoic);
    mydiv.appendChild(br3);
     mydiv.appendChild(br5);
    mydiv.appendChild(prbmd);
    mydiv.appendChild(prbmdes);
    mydiv.appendChild(prbmimg);
    mydiv.appendChild(likedislikeDiv);
    mydiv.appendChild(br6);
    mydiv.setAttribute("class","singlediv");
    mydiv.appendChild(prbmad);
    mydiv.appendChild(prbmadmin);
    mydiv.appendChild(adminInp);
    mydiv.appendChild(saveButton);
    pagediv.appendChild(mydiv);
}   

function generateNodata(){
   var pagediv=document.getElementById('dynamicChild');
   var n_div=document.createElement('div');
   n_div.setAttribute('style',"width:100%");
   var n_img=document.createElement('img');
   n_img.setAttribute('src',"/image/nodata.jpg");
   n_img.setAttribute('style',"width:50%;display:block;margin:auto;");
   n_div.appendChild(n_img);
   pagediv.appendChild(n_div);
}

function likeButtonPress(my_div){
       var btn_id=my_div.getAttribute('id').split('@');
       var prob_data={};
       prob_data.r_id=btn_id[0];
       $.post('/api/likebutton/admin/problem',prob_data,function(data){
       var like_img=document.getElementById(btn_id[0]+'@limgadmin');
       var like_ele=document.getElementById(btn_id[0]+'@ltextadmin');
       var like_text=like_ele.innerHTML.split(' ');
       var like_count=Number(like_text[1]);
       var dislike_img=document.getElementById(btn_id[0]+'@dimgadmin');
       var dislike_ele=document.getElementById(btn_id[0]+'@dtextadmin');
       var dislike_text=dislike_ele.innerHTML.split(' ');
       var dislike_count=Number(dislike_text[1]);
         if(data=='1'){
          like_count=(like_count+1).toString();
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/flike.png');
          }
          else if(data=='2'){
            like_count=(like_count-1).toString();
            like_ele.innerHTML='Like:'+" "+like_count;
            like_img.setAttribute('src',"/image/elike.png");
          }
          else if(data=='3'){
          like_count=(like_count+1).toString();
          dislike_count=(dislike_count-1).toString();
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/flike.png');
          dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
          dislike_img.setAttribute('src','/image/edis.png');
          }
       });
}

function dislikeButtonPress(my_div){
       var btn_id=my_div.getAttribute('id').split('@');
       var prob_data={};
       prob_data.r_id=btn_id[0];
       $.post('/api/dislikebutton/admin/problem',prob_data,function(data){
       var like_img=document.getElementById(btn_id[0]+'@limgadmin');
       var like_ele=document.getElementById(btn_id[0]+'@ltextadmin');
       var like_text=like_ele.innerHTML.split(' ');
       var like_count=Number(like_text[1]);
       var dislike_img=document.getElementById(btn_id[0]+'@dimgadmin');
       var dislike_ele=document.getElementById(btn_id[0]+'@dtextadmin');
       var dislike_text=dislike_ele.innerHTML.split(' ');
       var dislike_count=Number(dislike_text[1]);
         if(data=='1'){
          dislike_count=(dislike_count+1).toString();
          dislike_ele.innerHTML='Disike:'+" "+dislike_count;
          dislike_img.setAttribute('src','/image/fdis.png');
          }
          else if(data=='2'){
            dislike_count=(dislike_count-1).toString();
            dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
            dislike_img.setAttribute('src',"/image/edis.png");
          }
          else if(data=='3'){
          dislike_count=(dislike_count+1).toString();
          like_count=(like_count-1).toString();
          dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
          dislike_img.setAttribute('src','/image/fdis.png');
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/elike.png');
          }
       });   
}

function replyButtonFn(my_btn){
 var btn_id=my_btn.getAttribute('id').split('@');
 var prob_id=btn_id[0];
 var input_ele=document.getElementById(prob_id+"@input");
       if(input_ele.value==''){
            alert('Can\'t leave blank. Please type somthing first.' );
       }
      else{
         var info={};
         info.p_id=prob_id;
         info.reply=input_ele.value;
         $.post('/api/add/replyto/problem',info,function(data){
         if(data=='1'){
              alert('Successful! Thanks for your time.');
              input_ele.value='';
              var pre_ele=document.getElementById(prob_id+'@pre_reply');
              pre_ele.innerHTML=info.reply;   
            }
            else{
              alert("Error. Please try again.");
            }
         });
    }
}
