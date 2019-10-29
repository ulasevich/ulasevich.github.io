//Глобальный объект App сайта
var App = {
    win: $(window),
	doc: $(document),
	max_mobile_width: 1024,
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


// Полезно для событий resize, scroll (увеличивает производительность)
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


function fileBoxesInit(inputs) { // для стилизованного input file
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.parentNode,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 ) // для множественного выбора файлов у input должен быть атрибут multiple, а также data-multiple-caption
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length ); 
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
};




App.Share = function() { // для кастомных кнопок "поделиться"
	var ptitle = 'Фонд МКД';
	var popup_options = 'toolbar=0,status=0,width=626,height=436'
	App.doc.on('click', '.js-link--share', function(){
		switch ($(this).data('share-type')) {
			case 'facebook':
				url  = 'http://www.facebook.com/sharer.php?s=100';
				url += '&p[title]='     + encodeURIComponent(ptitle);
				url += '&p[url]='       + encodeURIComponent($(this).data('share-url'));
				window.open(url, '', popup_options);
			break;
			
			case 'vkontakte':
				url  = 'http://vkontakte.ru/share.php?';
				url += 'url='          + encodeURIComponent($(this).data('share-url'));
				url += '&title='       + encodeURIComponent(ptitle);
				url += '&noparse=true';
				window.open(url, '', popup_options);
			break;
			
			case 'twitter':
				url  = 'http://twitter.com/share?';
				url += 'text='      + encodeURIComponent(ptitle);
				url += '&url='      + encodeURIComponent($(this).data('share-url'));
				url += '&counturl=' + encodeURIComponent($(this).data('share-url'));
				window.open(url, '', popup_options);
			break;
			
			case 'odnoklassniki':
				url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
				url += '&st.comments=' + encodeURIComponent(ptitle);
				url += '&st._surl='    + encodeURIComponent($(this).data('share-url'));
				window.open(url, '', popup_options);
			break;
		}
		return false;
	});	
};


// Функционал для форм
App.Forms = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			datepicker_selector: '.js-datepicker',
			datepicker_time_selector: '.js-datepicker-time',
		},
		render: function () {
            this_ = this;
            this_.datepickerInit();
			this_.selectBox();
			if (!App.ms_ie) { this_.checkBox(); }
			this_.fileBoxes();
			this_.copyBlock();
			this_.Alerts();
        },
        datepickerInit: function () {
			if (typeof ($.fn.pikaday) === 'undefined') {
				console.info("required pikaday.js (для выбора даты)");
				return;
			}
			
			var i18n = {
				previousMonth : 'Предыдущий месяц',
				nextMonth     : 'Следующий месяц',
				months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
				weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
				weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			};
			
			$(this_.el.datepicker_time_selector).pikaday({
				firstDay: 1,
				format: 'DD.MM.YYYY HH:mm', // нужен moment.js
				yearRange: [1950, 2005],
				use24hour: true,
				showSeconds: false,
				i18n: i18n,
			});
			
			$(this_.el.datepicker_selector).pikaday({
				firstDay: 1,
				format: 'DD.MM.YYYY', // нужен moment.js
				yearRange: [1950, 2005],
				showTime: false,
				i18n: i18n,
			});
        },
		selectBox: function () {
			$('.select-block').append('<span class="arr"></span>'); // для оформления select
		},
		checkBox: function () {
			App.doc.on('change', 'input[type="checkbox"]', function(){ // для корректной работы при анимации
				$('input[type="checkbox"]').attr("disabled", true);
				setTimeout(function() { $('input[type="checkbox"]').removeAttr("disabled"); }, 1000);
			});
		},
		fileBoxes: function () {
			var inputs = $( '.inputfile' );
			fileBoxesInit(inputs);
		},
		copyBlock: function () {
			App.doc.on('click', '.js--copy-block', function(){
				var copy = $(this).parent('div').prev('.copy-block').removeClass('copy-block').clone().hide();
				copy.find('input').val('');
				copy.find('.file-box span').text('');
				copy.addClass('copy-block').insertBefore( $(this).parent('div') ).slideDown();
				
				var inputs = copy.find( '.inputfile' );
				fileBoxesInit(inputs);
			});
			
			App.doc.on('click', '.js--delete-block', function(){
				var block = $(this).parents('.additional-block');
				block.slideUp(function() {block.remove()});
			});
		},
		Alerts: function () {
			// скроллим, если есть ошибки 
			if ($(".alert.show").length>0) {
				$('body, html').animate({scrollTop: $('.alert').first().offset().top-140 }, 500);
			}
		},
    };
    new module;
};


App.Media = function () { // аудио, видео
	$('video, audio').mediaelementplayer({
		// More configuration
	});
};


App.Special = function () { // скрипты для панели контрастной версии
	$(document).on('click', ".font-link", function(e) {
		$(this).addClass('selected').siblings().removeClass('selected');
		$('body').removeClass('spec-font-small spec-font-normal spec-font-big').addClass($(this).data('font-class'));
		$.cookie('spec-font', $(this).data('font-class'), { expires: 1, path: '/' });
		return false;
	});
	
	$(document).on('click', ".color-link", function(e) {
		$(this).addClass('selected').siblings().removeClass('selected');
		$('body').removeClass('spec-color-white spec-color-black spec-color-blue spec-color-brown').addClass($(this).data('color-class'));
		$.cookie('spec-color', $(this).data('color-class'), { expires: 1, path: '/' });
		return false;
	});
	
	// часто в содержимом есть статьи с большим количеством стилевых атрибутов
	$(".content p, .content div, .content span, .content font, .content b, .content strong, .content br, .content ul, .content ol, .content li, .content a").removeAttr("style");
	
	$('input[type="checkbox"].spec-img-checkbox').change(function() { // отключить\включить просмотр изображений
		if($(this).is(':checked')) {
			$('body').removeClass($(this).data('img-class'));
			$.cookie('spec-img', $(this).data('img-class'), { expires: 1, path: '/' });
		}
		else {
			$('body').addClass($(this).data('img-class'));
			$.cookie('spec-img', '', { expires: 1, path: '/' });
		}
	});
	
};


App.Print = function () { // печать страницы
	App.doc.on('click', '.js-link--print', function(){
		if (window.print) {
			window.print(); 
		} else {
			alert('Ваш браузер не поддерживает js-функцию печати. Нажмите Ctrl+P');
		}
		return false;
	});
};


$(document).ready(function(){
	
	App.Share();
	App.Forms();
	App.Media();
	App.Special();
	App.Print();
		
});
