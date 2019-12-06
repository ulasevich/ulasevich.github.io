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
	$('.lazy').lazy({
		//effect: 'fadeIn',
		//effectTime: 1000,
        //threshold: 0,
		afterLoad: function(element) {
			console.log(element);
			console.log('loaded');
        },
		onError: function(element) {
            console.log(element);
			console.log('load error');
        },
	});
};


$(document).ready(function(){
	App.Other();
});
