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