  $(document).ready(function(){
    console.log("called");
   var txt = $(".weltxt");
   if($(window).width()>=1000){
       txt.animate({fontSize:'5em'},1000,function(){
    $('#more').animate({opacity: '1.0'}, 1000);
    $('.ltag').animate({left:'50%',opacity: '1.0'},1000);
    $('.rtag').animate({right:'50%',opacity: '1.0'},1000);
   });
}
  else if($(window).width()<1000 && $(window).width()>=700 ){
       txt.animate({fontSize:'3em'},1000,function(){
    $('#more').animate({opacity: '1.0'}, 1000);
    $('.ltag').animate({left:'50%',opacity: '1.0'},1000);
    $('.rtag').animate({right:'50%',opacity: '1.0'},1000);
   });
}
else if($(window).width()<700){
        txt.animate({fontSize:'2em'},1000,function(){
    $('#more').animate({opacity: '1.0'}, 1000);
    $('.ltag').animate({left:'50%',opacity: '1.0'},1000);
    $('.rtag').animate({right:'50%',opacity: '1.0'},1000);
   });
}
else{
      txt.animate({fontSize:'2em'},1000,function(){
      $('#more').animate({opacity: '1.0'}, 1000);
      $('.ltag').animate({left:'50%',opacity: '1.0'},1000);
      $('.rtag').animate({right:'50%',opacity: '1.0'},1000);
     });
}

   
  
  $(function(){
  $.getJSON('/api/get/count/problem/user',function(data){ 
  var count_ele=document.getElementsByClassName('count');
   count_ele[0].innerHTML=data.user_count;
   count_ele[1].innerHTML=data.problem_count;
   count_ele[2].innerHTML=data.org_count;
  });
  $('#more').on('mouseover',function(){
    $(this).css({'background':'#072d47','borderColor':'#072d47'});

  });
 $('#more').on('mouseout',function(){
    $(this).css({'background':'transparent','borderColor':'#fff'});
    });
  });

$('.count_mainDiv').focus(function(){
  console.log("div get focuesed.");
});

$(function() {
  $('.smooth_scroll').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
 });

 $('#con_form').on('submit',function(event){
event.preventDefault();
var data =new FormData(this);
if(document.getElementById('qrymsg').value==''){
  alert("All fields are needed.");
}
else{
$.ajax({

    type:'POST',
    url:'/api/add/query/message',
    data:data,
    cache:false,
    contentType:false,
    processData:false,
    success:function(data){
      if(data=='1'){
        document.getElementById('con_form').reset();
        alert('Your Message is sent. We will get back to you soon.');

      }
      else
        alert("Error. Please try again.");
     }
  });
}
});


 $('#menupic').click(function(){
     $("#menudiv").animate({
        height: 'toggle'
    },'slow');
 });
});