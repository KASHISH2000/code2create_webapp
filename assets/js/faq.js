
/*LOGIC:
JAb koi wrapper mein click karen, toh uska active karo. Phir Baki saare ko close kar do.
*/
var tot_len=6;


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
	for(var i=1;i<=tot_len;i++){
		if(i==index) continue;
		var faq_wrapper=$('*[data-id='+i+']');
		$(faq_wrapper).removeClass("active");
		$(faq_wrapper).find(".hamburger").removeClass("is-active");
		$(faq_wrapper).find(".faq-details").slideUp();
		$(faq_wrapper).find(".faq-details-inner").removeClass("faq-border-left-thick");
	}
	
}

tot_len=12;


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
	for(var i=6;i<=tot_len;i++){
		if(i==index) continue;
		var faq_wrapper=$('*[data-id='+i+']');
		$(faq_wrapper).removeClass("active");
		$(faq_wrapper).find(".hamburger").removeClass("is-active");
		$(faq_wrapper).find(".faq-details").slideUp();
		$(faq_wrapper).find(".faq-details-inner").removeClass("faq-border-left-thick");
	}
	
}