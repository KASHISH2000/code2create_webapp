// Type.js

var type = document.getElementById('type_text');
// var tyno = document.getElementById('type_no');
var type_text;
// var type_no;
// type_text.rerun();type_no.rerun();
function type_str(){
	type_text = new Typewriter(type, {
		loop: true
	});
	type_text.typeString('  36 Hours Hack')
	.pauseFor(2500)
	.deleteChars(3)
	.typeString('ack')
	.pauseFor(2500)
	.deleteAll()
	.pauseFor(1000)
	.typeString('300+ Participants')
	.pauseFor(2500)
	.deleteChars(4)
	.typeString('ants')
	.pauseFor(2500)
	.deleteAll()
	.pauseFor(1000)
	.typeString('₹30k Prize Money')
	.pauseFor(2500)
	.deleteChars(5)
	.typeString('Money')
	.pauseFor(2500)
	.start();
}
type_str();

// Nav.js
var fixmeTop = $('.nav-wrap').offset().top;
$(".nav-placeholder").hide();
$(window).scroll(function () {                  // assign scroll event listener
  var currentScroll = $(window).scrollTop(); // get current position
  if (currentScroll >= fixmeTop) {           // apply position: fixed if you
  	$('.navelem').addClass('fixednav');
  	$(".nav-placeholder").show();
  } else {                                   // apply position: static
  	$('.navelem').removeClass('fixednav');
  	$(".nav-placeholder").hide();
  }
});


var home=$("#home").offset().top;
var about=$("#about").offset().top;
var faqs=$("#faqs").offset().top;
var sponsors=$("#sponsors").offset().top;
var organisers=$("#organisers").offset().top;
var contactus=$("#contactus").offset().top;

$(window).scroll(function(){
	var currentScroll = $(window).scrollTop();
	$(".navlink").removeClass("active");
	if(currentScroll>contactus-90)
		$(".a-contactus").addClass("active");

	else if(currentScroll>organisers-90)
		$(".a-organisers").addClass("active");

	else if(currentScroll>sponsors-90)
		$(".a-sponsors").addClass("active");

	else if(currentScroll>faqs-90)
		$(".a-faqs").addClass("active");

	else if(currentScroll>about-90)
		$(".a-about").addClass("active");

	else if(currentScroll>home-90)
		$(".a-home").addClass("active");
});

/* Faq */

/*LOGIC:
JAb koi wrapper mein click karen, toh uska active karo. Phir Baki saare ko close kar do.
*/
var tot_len=5;


$("#faqs-div-wrap-1 .faq-wrapper").click(function(){
	var faq_div=this;
	var index=$(this).data("id");
	close_all_1(index);
	$(this).toggleClass("active");
	$(this).find(".hamburger").toggleClass('is-active');
	$(this).find('.faq-details').slideToggle();
	setTimeout(function(){ 
		$(faq_div).find('.faq-details').find(".faq-details-inner").toggleClass("faq-border-left-thick");
	}, 500);
});

function close_all_1(index){
	for(var i=1;i<=5;i++){
		if(i==index) continue;
		var faq_wrapper=$('*[data-id='+i+']');
		$(faq_wrapper).removeClass("active");
		$(faq_wrapper).find(".hamburger").removeClass("is-active");
		$(faq_wrapper).find(".faq-details").slideUp();
		$(faq_wrapper).find(".faq-details-inner").removeClass("faq-border-left-thick");
	}
	
}

tot_len=10;


$("#faqs-div-wrap-2 .faq-wrapper").click(function(){
	var faq_div=this;
	var index=$(this).data("id");
	close_all_2(index);
	$(this).toggleClass("active");
	$(this).find(".hamburger").toggleClass('is-active');
	$(this).find('.faq-details').slideToggle();
	setTimeout(function(){ 
		$(faq_div).find('.faq-details').find(".faq-details-inner").toggleClass("faq-border-left-thick");
	}, 500);
});

function close_all_2(index){
	for(var i=6;i<=10;i++){
		if(i==index) continue;
		var faq_wrapper=$('*[data-id='+i+']');
		$(faq_wrapper).removeClass("active");
		$(faq_wrapper).find(".hamburger").removeClass("is-active");
		$(faq_wrapper).find(".faq-details").slideUp();
		$(faq_wrapper).find(".faq-details-inner").removeClass("faq-border-left-thick");
	}
	
}