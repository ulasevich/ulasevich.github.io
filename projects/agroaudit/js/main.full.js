//Глобальный объект App сайта
var App = {
    win: $(window),
	doc: $(document),
	is_mobile: detectmob(), // браузер мобильный или нет
	ms_ie: /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent), // Браузер - ie или нет
	max_mobile_width: 992, // максимальная ширина, при которой применяется стили и функционал для портативных устройств
	wheeling: false, // нужно для корреткной работы параллакса при скроллинге
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




function check_scroll() { // для определения прокрутки страницы
	if($(window).scrollTop() == 0) {
		$('body').addClass('scrollTop');
	} else if($(window).scrollTop() + $(window).height() == $(document).height()) {
		$('body').addClass('scrollBottom');
	}
	else {
		$('body').removeClass('scrollTop scrollBottom');
	}
};



// различный дополнительный функционал
App.Other = function () {
	if (App.is_mobile) {
		$('html').addClass('is_mobile');
	}
	
	App.doc.on('click', '.block-accordion__link', function(){
		$(this).parents('.block-accordion').removeClass('block-accordion-rolled').addClass('block-accordion-opened');
		setTimeout(function() {$.fn.fullpage.reBuild(); console.log('reBuild');}, 2100);
		return false;
	});	
};


// слайдеры, карусели
App.Sliders = function () {
	$('.services-carousel').slick({
		slidesToShow: 3.6,
		infinite: false,
		edgeFriction: 0,
		responsive: [
			{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				}
			},
			{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				}
			},
			{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				}
			}
		]
	});
	
	$('.services-carousel').on('afterChange', function(e, slick, currentSlide) {
		if (slick.$slides.length <= currentSlide + slick.options.slidesToShow) {
			$('.services-carousel').addClass('services-carousel--last');
			$('.services-carousel').removeClass('services-carousel--first');
		} else if (currentSlide == 0) {
			$('.services-carousel').addClass('services-carousel--first');
			$('.services-carousel').removeClass('services-carousel--last');
		} else {
			$('.services-carousel').removeClass('services-carousel--last');
			$('.services-carousel').removeClass('services-carousel--first');
		}
	});
	
	$('.services-carousel').on('setPosition', function(e, slick, currentSlide) {
		slick.$slides.css('height', slick.$slideTrack.height() + 'px');
	});
	
	
	
	$('.technology-slider').slick({
		slidesToShow: 1,
		infinite: false,
		edgeFriction: 0,
		arrows: false,
	});
	
	App.doc.on('click', '.tab-link', function(){
		$(this).siblings('a').removeClass('active');
		$(this).addClass('active');
		$($(this).data('slider')).slick('slickGoTo', $(this).data('slide'));
		return false;
	});	
	
};


// Прокрутка страниц-слайдов
App.FullPage = function () {
	var page_autoScrolling = false;
	var page_scrollOverflow = false;
	
	var menu_anchors = [];
	var menu_titles = [];
	$("#menu li").each(function( index ) {
		menu_anchors.push($(this).data('menuanchor'));
		menu_titles.push($(this).text());
	});
	
	if (App.is_mobile) {
		page_autoScrolling = false;
		page_scrollOverflow = false;
	}
	
		
	$('#agroaudit-fullpage').fullpage({ // 
		autoScrolling: page_autoScrolling,
		scrollOverflow: page_scrollOverflow,
		anchors: menu_anchors,
		menu: '#menu',
		navigationPosition: 'right',
		navigationTooltips: menu_titles,
		navigation: true,
		afterRender: function() {
			App.RemoveMainPreloader();			
		}
	});
		
	
	App.doc.on('click', '.arrow-link-index', function(){
		$("#agroaudit-fullpage").fullpage.moveTo(2);
		return false;
	});	
	
	App.doc.on('click', '.arrow-link-last', function(){
		$("#agroaudit-fullpage").fullpage.moveTo(1);
		return false;
	});
	
};



App.RemoveMainPreloader = function () {
	$('.preloader').fadeOut("slow");
};


// проверка на кириллицу (доп. метод для jquery validate)
$.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[\u0400-\u04FF\s]*$/i.test(jQuery.trim(value));
}, "Только символы кириллицы и пробелы");


// Функционал для форм
App.Forms = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			application_form_selector: '.application_form',
			form_response_selector: '.form-response',
			form_submit_selector: ':submit',
		},
		render: function () {
            this_ = this;
			this_.applicationForm();
        },
		applicationForm: function () { // валидация и отправка данных формы
						
			var btn_text_default = $(this_.el.application_form_selector).find(this_.el.form_submit_selector).text();
			var btn_text_send = 'Отправка...';
			var messages_values = {
				name: {
					required: "Представьтесь пожалуйста",
					maxlength: "Не больше 200 символов",
				},
				email: {
					required: "Укажите ваш электронный адрес",
					email: "Введите корректный адрес типа text@text.text",
				},
				phone: {
					required: "Укажите ваш телефон",
					maxlength: "Не больше 50 символов",
				},
			};
			var response_text = {
				success: 'Спасибо! Мы свяжемся с Вами.',
				error: 'Ошибка отправки письма <br>'
			}
			var recaptcha_alert = "Подтвердите, что вы не робот.";
			
			
			$(this_.el.application_form_selector).each(function( index ) {
				
				$(this).submit(function(event) {
					$(this).find(this_.el.form_response_selector).removeClass("color-green color-red").html("&nbsp;").slideUp("fast");
					event.preventDefault();
				});
				
				$(this).validate({
					rules: {
						name: {
							required: true,
							maxlength: 200,
						},
						email: {
							required: true,
							email: true,
						},
						phone: {
							required: true,
							maxlength: 50,
						},
					},
					messages: messages_values,
					focusInvalid: false,
					invalidHandler: function(event, validator) {
					},
					showErrors: function(errorMap, errorList) {
						console.log(errorList);
						if (errorList.length>0) {
							$(this_.el.application_form_selector).find(this_.el.form_submit_selector).prop('disabled', true);
						} else {
							$(this_.el.application_form_selector).find(this_.el.form_submit_selector).prop('disabled', false);
						}
						this.defaultShowErrors();
						if ($(this_.el.application_form_selector).find('label.error:visible').length) {
							$("body,html").animate( { scrollTop: $("label.error:visible").offset().top-100 }, 800 );
						}
					},
					submitHandler: function(form) {										
						// должен быть подключен google.com/recaptcha/api.js
						if(grecaptcha.getResponse().length == 0) { 
							alert(recaptcha_alert);
							return false;
						}
						
						var $form    = form,
							formData = new FormData(),
							params   = $(form).serializeArray();
							
						$.each(params, function(i, val) {
							formData.append(val.name, val.value);
						});
						
						$(form).find(this_.el.form_submit_selector).prop('disabled', true).text(btn_text_send);
						$.ajax({ 
							url: $(form).attr("action"), // $(form).attr("action")
							type: 'POST',
							dataType: "json",
							cache: false,
							data: formData,
							mimeType: "multipart/form-data",
							processData: false, // tell jQuery not to process the data
							contentType: false, // tell jQuery not to set contentType
							success: function (data) {
								if (data.success) {
									$(form).find(this_.el.form_response_selector).html('Спасибо! Мы свяжемся с Вами.').addClass("color-green");
								} else {
									$(form).find(this_.el.form_response_selector).html('Ошибка отправки письма <br> '+data.ErrorInfo).addClass("color-red");
								}
							},
							error: function (data) {
								console.log(data);
								if (data.hasOwnProperty("responseJSON")) {
									$(form).find(this_.el.form_response_selector).html(data.responseJSON.message).addClass("color-red");
									console.log("error: " + data.responseJSON.message);
								} else {
									$(form).find(this_.el.form_response_selector).html('Ошибка status '+data.status+', statusText '+data.statusText).addClass("color-red");
									console.log('data.responseText');
									console.log(data.responseText);
								}
							},
							complete: function () {
								$(form).find(this_.el.form_response_selector).slideDown("fast");
								$(form).find(this_.el.form_submit_selector).prop('disabled', false).text(btn_text_default);
								if ($(this_.el.form_response_selector).is(":visible")) {
									$("body,html").animate( { scrollTop: $(this_.el.form_response_selector).offset().top-100 }, 800 );
								}
							},
						});
					}
				});
				
			}); // each
		},
    };
    new module;
};



$(document).ready(function(){
	App.Other();
	App.Sliders();
	App.FullPage();
	App.Forms();
});
