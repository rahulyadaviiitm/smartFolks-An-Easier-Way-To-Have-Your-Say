function showNewDiv(){
	var mymenu=document.getElementById('id001');
    if(mymenu.style.display!="block"){
        mymenu.style.display="block";
    }
    else{
    	mymenu.style.display="none";
    }
}
function hideNewDiv(){
	var mymenu=document.getElementById('id001');
    document.getElementById('eventForm').reset();
    	mymenu.style.display="none";
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

function showEventsToOwner(data){
 var mydata=data;
 var parfdiv=document.getElementById("dynamicParent");
 if(parfdiv.childElementCount>0){
    document.getElementById('dynamicChild').remove();   
    } 
    var nfchild=document.createElement('div');
    nfchild.setAttribute("id","dynamicChild");
    parfdiv.appendChild(nfchild);
    var info=document.getElementsByClassName('orgInfo');
    info[0].innerHTML=mydata[mydata.length-1].org_name;	
    info[1].innerHTML=mydata[mydata.length-1].org_area;
    mydata.pop();
    if(mydata.length>0){
         for(var j=0;j<mydata.length;j++){
           generateDiv(mydata[j]);
       }
    }
    else
    generateNodata()     
}

function generateDiv(a){
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
	var prbmadval=document.createTextNode("Admin\'s Reply:\t");
	prbmad.setAttribute("style","font-weight:bold;visibility:hidden;")
    prbmad.appendChild(prbmadval);

    var br1=document.createElement('br');
    var br2=document.createElement('br');
    var br3=document.createElement('br');
    var br4=document.createElement('br');
    var br5=document.createElement('br');

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
    var like=document.createElement('p');
    like.setAttribute("class","likeDiv");
    var likevalue=document.createTextNode("Liked BY:"+" "+a.like_by.length);
    like.appendChild(likevalue);
    var dislike=document.createElement('p');
    dislike.setAttribute("class","dislikeDiv");
    var dislikevalue=document.createTextNode("Disliked BY:"+" "+a.dislike_by.length);
    dislike.appendChild(dislikevalue);
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
    mydiv.appendChild(like);
    mydiv.appendChild(dislike);
    mydiv.setAttribute("class","singlediv");
    mydiv.appendChild(prbmad);
    pagediv.appendChild(mydiv);
} 

function makevisibleUp(){
  document.getElementById('up').style.display='block';
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
