    $(document).ready(function(){
     var url=document.URL;
     if(url.indexOf('folks')!=-1){
       $('#redirct_link').attr('href','/register/folks');
       $('#tpyetxt').text('Folks email:');
       $('#tpyetxt').css({'font-weight':'bold'});
     }
     else if(url.indexOf('org')!=-1){
         $('#redirct_link').attr('href','/register/org');
         $('#tpyetxt').text('Organization email:');
         $('#tpyetxt').css({'font-weight':'bold'});
     }
     else if(url.indexOf('admin')!=-1){
       $('#tpyetxt').text('Admin email:');
       $('#tpyetxt').css({'font-weight':'bold'});
       $('#red_text').css({'display':'none'});
       $('#my_dash').css({'display':'none'});
       $('#my_ul').css({'display':'none'});
     }

$('#login_frm').on('submit',function(event){
   event.preventDefault();
   var data =new FormData(this);
   var page_url=document.URL;
        if(page_url.indexOf('folks')!=-1){
          data.append('type','folks');
        }
        else if(page_url.indexOf('admin')!=-1){
              data.append('type','admin');
        }
         else if(page_url.indexOf('org')!=-1){
          data.append('type','org');
        }  
    $.ajax({
        type:'POST',
        url:'/check/user/existing',
        data:data,
        cache:false,
        contentType:false,
        processData:false,
        success:function(result){
            if(result=='folks'){
                    window.location.href = "/folks";
                }
                else if(result=='admin'){
                  window.location.href = "/admin";
                }
                 else if(result=='org'){
                  window.location.href = "/organization";
                }
                else{
                    alert("Credentials are wrong.");
                }
              }
        });
     });


});
