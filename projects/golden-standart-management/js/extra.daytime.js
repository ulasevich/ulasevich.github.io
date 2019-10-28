// функции, нужные для уточнения времени суток на клиентской стороны. Для показа корректной картинки на главной

function getDaytime() {
	var hour = new Date().getHours();
	if(hour > 6 && hour <= 18) { // определяем время суток
		daytime = 'day';
	}
	else {
		daytime = 'night';
	}
	return daytime;
};


function getSeason() {
	var d = new Date();
	var m = d.getMonth() + 1;
	var season_floor = Math.floor(m / 3);
	
	if (season_floor == 1) {
		return 'spring';
	} else if (season_floor == 2) {
		return 'summer';
	} else if (season_floor == 3) {
		return 'autumn';
	} else {
		return 'winter';
	}
	
};

function setIndexBgImage() {
	var img_src = 'img/index-bg-city/' + getSeason() + '-' + getDaytime() + '.jpg';
	$('.gsm-city img').data('src', img_src);
}
setIndexBgImage();


function checkWeather() {
	$('.gsm-city-weather').remove();
	var season = getSeason();
	if (season=="autumn") {
		$('<div class="gsm-city-weather gsm-city__rain"> <div class="rain front-row"></div> <div class="rain back-row"></div> </div>  <div class="gsm-city-weather gsm-city__cloud-big"></div>').insertAfter( ".gsm-city img" );
	}
	if (season=="spring" || season=="summer") {
		$('<div class="gsm-city-weather gsm-city__cloud-small"></div>').insertAfter( ".gsm-city img" );
	}
	if (season=="winter") {
		$('<div class="gsm-city-weather gsm-city__snow"> <div class="snow snow--near"></div> <div class="snow snow--near snow--alt"></div> <div class="snow snow--mid"></div> <div class="snow snow--mid snow--alt"></div> <div class="snow snow--far"></div> <div class="snow snow--far snow--alt"></div> </div>').insertAfter( ".gsm-city img" );
	}
}
checkWeather();


