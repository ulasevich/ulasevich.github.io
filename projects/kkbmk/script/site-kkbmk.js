$(document).ready(function(){
	
	// против возможных недочётов с шириной экрана на портативных устройствах
	if ( $(window).width()<=1060 ) { $(".wrapper").width(1060); $(".footer").width(1060); }
	$(window).resize(function(){
		if ( $(window).width()<=1060 ) { $(".wrapper, .footer").width(1060); }
		else { $(".wrapper, .footer").width("100%"); }
	});
	
	// появление формы обратной связи
	$(".h-feedback-btn").live("click", function() {
		$(".h-feedback-form").show();
	});
	
	// Закрытие формы обратной связи (если открыта)	
	$(document).mouseup(function (e) {
		if ( ($(".h-feedback-form").has(e.target).length === 0) || ($(e.target).attr("class")=="h-f-btn-hover") ) {
			$(".h-feedback-form").hide();
		}
	});
	
	if ( ($(".h-feedback-form .mf-ok-text").length>0) || ($(".h-feedback-form .errortext").length>0) ) { $(".h-feedback-form").show();  }
	
});
