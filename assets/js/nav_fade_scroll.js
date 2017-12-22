$(window).scroll(function(){
	var currentScroll = $(window).scrollTop();
	if(currentScroll>60)
		$("nav").addClass("scrolled");
	else
		$("nav").removeClass("scrolled");
});