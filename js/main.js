//Глобальный объект App сайта
var App = {
    win: $(window),
	doc: $(document),
	is_mobile: detectmob(), // браузер мобильный или нет
	ms_ie: /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent), // Браузер - ie или нет
};

// определение мобильного браузера
function detectmob() { 
	if(navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	)
		{
			return true;
		}
	else {
		return false;
	}
}


// различный дополнительный функционал
App.Other = function () {
	if (App.is_mobile) {
		$('html').addClass('is_mobile');
	}	
	
	//$('.portfolio-row').css({"height": 600});
	
	$('.js-show-all').on( "click", function() {
		var scrollHeight = $('.portfolio-row').prop("scrollHeight");
		$('.portfolio-row').css('max-height', scrollHeight*1.5);
		$('.portfolio-row__gradient').fadeOut();
		$('.show-all-block').fadeOut();
		return false;
	});
};


$(document).ready(function(){
	App.Other();
});
