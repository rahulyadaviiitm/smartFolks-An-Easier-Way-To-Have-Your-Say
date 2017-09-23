// function makevisibleUp(){
// document.getElementById('up').style.display='block';
// }

function showQueryToOwner(adata){
    var parentdiv=document.getElementById("dynamicParent");
        if(parentdiv.childElementCount>0){
        document.getElementById('dynamicChild').remove();   
       }
    var nchild=document.createElement('div');
    nchild.setAttribute("id","dynamicChild");
    parentdiv.appendChild(nchild);
    var mydata=adata;
    // var size=mydata.length;
    // var info=document.getElementsByClassName('adminInfo');
    // info[0].innerHTML=mydata[size-1].adminName;
    // info[1].innerHTML=mydata[size-1].adminPlace;
    // var adm_id=mydata[size-1].ad_id;
    // info[0].setAttribute("style","font-weight:bold;");
    // info[1].setAttribute("style","font-weight:bold;");
    // mydata.pop();
    if(mydata.length>0){
        for(var i=0;i<mydata.length;i++){
        generateDiv(mydata[i]);
       }
    }
   else
   generateNodata(); 
}
function generateDiv(a){
	  var pagediv=document.getElementById('dynamicChild');
	  var mydiv=document.createElement("div");
	  var authr=document.createElement('span');
	  var authrval=document.createTextNode("Name:");
	  authr.setAttribute("style","font-weight:bold;")
    authr.appendChild(authrval);
    var areatag=document.createElement('span');
	  var areaval=document.createTextNode("Email:");
	  areatag.setAttribute("style","font-weight:bold;")
    areatag.appendChild(areaval);
      
    var prbmd=document.createElement('span');
	  var prbmdval=document.createTextNode("Message:");
	  prbmd.setAttribute("style","font-weight:bold;")
    prbmd.appendChild(prbmdval);

    var adminInp=document.createElement('textarea');
    adminInp.setAttribute("name","adminReply");
    adminInp.setAttribute("id",a._id+"@input");
    adminInp.setAttribute("style","width:100%;height:100px;margin-top:10px;");
    
    var saveButton=document.createElement("button");
    saveButton.setAttribute("class","replyButton")
    saveButton.setAttribute("id",a._id+'@reply');
    saveButton.setAttribute('onclick',"replyButtonFn(this)");
    saveText=document.createTextNode("Send Reply");
    saveButton.appendChild(saveText);

    var br1=document.createElement('br');
    var br2=document.createElement('br');
    var br3=document.createElement('br');
    var br4=document.createElement('br');
    var br5=document.createElement('br');
    var br6=document.createElement('br');

	  var txt1=document.createElement('span');
	  var p1=document.createTextNode(a.name);
    txt1.appendChild(p1);
    var txt2=document.createElement('span');
	  var p2=document.createTextNode(a.email);
    txt2.appendChild(p2);
    var prbmdes=document.createElement('span');
    var p4=document.createTextNode(a.message);
    prbmdes.appendChild(p4);
   
    mydiv.appendChild(authr);
    mydiv.appendChild(txt1);
    mydiv.appendChild(br1);
    mydiv.appendChild(br2);
    mydiv.appendChild(areatag);
    mydiv.appendChild(txt2);  
    mydiv.appendChild(br4);
    mydiv.appendChild(br3);
    mydiv.appendChild(prbmd);
    mydiv.appendChild(prbmdes);
    mydiv.appendChild(br6);
    mydiv.setAttribute("class","singlediv");
    mydiv.appendChild(adminInp);
    mydiv.appendChild(saveButton);
    pagediv.appendChild(mydiv);
}   

function generateNodata(){
    var parentdiv=document.getElementById("dynamicParent");
        if(parentdiv.childElementCount>0){
        document.getElementById('dynamicChild').remove();   
       }
    var nchild=document.createElement('div');
    nchild.setAttribute("id","dynamicChild");
    parentdiv.appendChild(nchild);

   var pagediv=document.getElementById('dynamicChild');
   var n_div=document.createElement('div');
   n_div.setAttribute('style',"width:100%");
   var n_img=document.createElement('img');
   n_img.setAttribute('src',"/image/noqry.jpg");
   n_img.setAttribute('style',"width:50%;display:block;margin:auto;");
   n_div.appendChild(n_img);
   pagediv.appendChild(n_div);
}


function replyButtonFn(my_btn){
// console.log(query_id);
 var btn_id=my_btn.getAttribute('id').split('@');

 var query_id=btn_id[0]; 

 var input_ele=document.getElementById(query_id+"@input");
       if(input_ele.value==''){
            alert('Can\'t leave blank. Please type somthing first.' );
       }
      else{
         var info={};
         info.q_id=query_id;
         info.q_reply=input_ele.value;
         $.post('/api/replyto/query',info,function(data){
         if(data=='1'){
              alert('Successful! Thanks for your time.');
              input_ele.value='';
            }
            else{
              alert("Error. Please try again.");
            }
         });
    }
}
