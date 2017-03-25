var tot_len=$(".faq-div").length;


$(".faq-wrapper").click(function(){
	var faq_div=this;
	var index=$(this).index()+1;
	close_all(index);
	$(this).toggleClass("active");
	$(this).find(".hamburger").toggleClass('is-active');
	$(this).find('.faq-details').slideToggle();
	setTimeout(function(){ 
		$(faq_div).find('.faq-details').find(".faq-details-inner").toggleClass("faq-border-left-thick");
	}, 500);
});

function close_all(index){
	for(var i=1;i<=tot_len;i++){
		if(i==index) continue;
		var faq_wrapper=$(".faq-wrapper:nth-child("+i+")");
		$(faq_wrapper).removeClass("active");
		$(faq_wrapper).find(".hamburger").removeClass("is-active");
		$(faq_wrapper).find(".faq-details").slideUp();
		$(faq_wrapper).find(".faq-details-inner").removeClass("faq-border-left-thick");
	}
	
}