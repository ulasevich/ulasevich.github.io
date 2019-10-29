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



// Главное меню
App.Menu = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			main_menu_selector: '.main-menu',
			mobile_btn_selector: '.js-main-menu-btn',
			opened_menu_class: 'main-menu-opened',
		},
		render: function () {
            this_ = this;
			this_.sidebarInit();
			this_.sidebarSwipe();
			this_.sidebarIndexMenu();
			this_.sidebarSubMenu();
        },
		sidebarInit: function () {
			App.doc.on('click', this_.el.mobile_btn_selector, function(e){
				e.preventDefault();
				if (!$(this_.el.main_menu_selector).hasClass(this_.el.opened_menu_class)) {
					this_.sidebarOpen();
				} else {
					this_.sidebarClose();
				}
			});	
		},
		sidebarOpen: function () {
			$(this_.el.main_menu_selector).addClass(this_.el.opened_menu_class);
        },
        sidebarClose: function () {
			$(this_.el.main_menu_selector).removeClass(this_.el.opened_menu_class);
        },
        sidebarSwipe: function () {
            if (typeof ($.fn.swipe) === 'undefined') { // jquery.touchSwipe.min.js
                return;
            }
            // при перелистывания меню вверх, закрываем его
            $(this_.el.main_menu_selector).swipe({
                excludedElements: 'button, input, select, textarea, .noSwipe, .gsm-menu',
                swipeUp: function (event, direction, distance, duration, fingerCount) {
					this_.sidebarClose();
                },
            });
			
			$(this_.el.mobile_btn_selector).swipe({
                excludedElements: 'button, input, select, textarea, .noSwipe',
                swipeDown: function (event, direction, distance, duration, fingerCount) {
					this_.sidebarOpen();
                },
            });
        },
		sidebarIndexMenu: function () {
			App.doc.on('click', '.main-menu .gsm-menu > ul > li > a', function() { 
				this_.sidebarClose();
			});
			App.doc.on('click', '.main-menu-logo a', function() { 
				this_.sidebarClose();
			});	
		},
		sidebarSubMenu: function () {
			App.doc.on('click', '#main-menu-sub a', function(){ // для пролистывания на странице услуг 
				this_.sidebarClose();
			});	
		},
    };
    new module;
};




// проверка на кириллицу (доп. метод для jquery validate)
$.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[\u0400-\u04FF\s]*$/i.test(jQuery.trim(value));
}, "Только символы кириллицы и пробелы");

$.validator.addMethod('filesize', function (value, element, param) {
  return this.optional(element) || (element.files[0].size <= param)
}, function(size){
return "Максимальный размер - " + filesize(size,{exponent:2, round:1});
});


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
			this_.popupForm();
			this_.fileBoxes();
			this_.applicationForm();
        },
		popupForm: function () { // всплывающие окна для форм
			$('.js-popup').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',
				tClose: 'Закрыть',
				
				fixedContentPos: true,
				fixedBgPos: true,
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in',
		
				// When elemened is focused, some mobile browsers in some cases zoom in
				// It looks not nice, so we disable it:
				callbacks: {
					beforeOpen: function() {
						if($(window).width() < 992) {
							this.st.focus = false;
						} else {
							this.st.focus = '#name';
						}
					}
				}
			});
			
			
		},
		fileBoxes: function () {
			var inputs = $( '.inputfile' );
			fileBoxesInit(inputs);
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
				msg: {
					required: "Сообщение должно быть непустым",
					maxlength: "Не больше 2000 символов",
				},
				agreement: {
					required: "Необходимо дать согласие",
				},
				file:{
					extension: "Допустимый формат: docx|doc|xls|xlsx|rtf|pdf|txt|jpg|jpeg|png",
					filesize: 'Размер не больше 1МБ',
				}
			};
			var response_text = {
				success: 'Спасибо! Мы свяжемся с Вами.',
				error: 'Ошибка отправки письма <br>'
			}
			var recaptcha_alert = "Подтвердите, что вы не робот.";
			
			if ($('html').attr('lang')=="en") {
				btn_text_send = 'Sending...';
				messages_values = {
					name: {
						required: "Introduce youreself",
						maxlength: "200 character limit",
					},
					email: {
						required: "Enter your email address",
						email: "Enter a valid text@text.text address",
					},
					phone: {
						required: "Enter your phone number",
						maxlength: "50 character limit",
					},
					msg: {
						required: "Message must be non-empty",
						maxlength: "2000 character limit",
					},
					agreement: {
						required: "Must give consent",
					},
					file:{
						extension: "Valid format: docx|doc|xls|xlsx|rtf|pdf|txt|jpg|jpeg|png",
						filesize: 'Size not larger than 1MB',
					}
				};
				response_text = {
					success: 'Thank! We will contact you.',
					error: 'Error sending letter <br>'
				}
				recaptcha_alert = "Confirm that you are not a robot.";
			}
			
			
			
			$(this_.el.application_form_selector).each(function( index ) {
				
				$(this).submit(function(event) {
					$(this).find(this_.el.form_response_selector).removeClass("color-green color-red").html("&nbsp;").css("visibility", "hidden").slideUp("fast");
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
							maxlength: 50,
						},
						msg: {
							required: true,
							maxlength: 2000,
						},
						agreement: {
							required: true,
						},
						file:{
							extension: "docx|rtf|doc|pdf|txt|jpg|jpeg|png",
							filesize: 1024000, // 1 МБ
						},
					},
					messages: messages_values,
					
					focusInvalid: false,
					invalidHandler: function(event, validator) {
					},
					showErrors: function(errorMap, errorList) {
						console.log(errorList);
						if (errorList.length>0) {
							$(this_.el.application_form_selector).find(this_.el.form_submit_selector).addClass('disabled');
						} else {
							$(this_.el.application_form_selector).find(this_.el.form_submit_selector).removeClass('disabled');
						}
						this.defaultShowErrors();
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
							
						if ($(form).find('[name="file"]').length) {
							var	files = $(form).find('[name="file"]')[0].files;
							$.each(files, function(i, file) {
								formData.append('file[]', file);
							});
						}
						
						$.each(params, function(i, val) {
							formData.append(val.name, val.value);
						});
												
						$(form).find(this_.el.form_submit_selector).prop('disabled', true);
						$(form).find(this_.el.form_submit_selector).text(btn_text_send);
						$.ajax({ 
							url: $(form).attr("action"),
							type: 'POST',
							dataType: "json",
							cache: false,
							data: formData,
							mimeType: "multipart/form-data",
							processData: false, // tell jQuery not to process the data
							contentType: false, // tell jQuery not to set contentType
							success: function (data) {
								if (data.success) {
									$(form).find(this_.el.form_response_selector).html(response_text.success).addClass("color-green");
								} else {
									$(form).find(this_.el.form_response_selector).html(response_text.error+data.ErrorInfo).addClass("color-red");
								}
								$('.mfp-wrap').animate({ scrollTop: 0 }, "slow");
							},
							error: function (data) {
								if (data.hasOwnProperty("responseJSON")) {
									//$(form).find(this_.el.form_response_selector).html(data.responseJSON.message).addClass("color-red");
									//console.log("error: " + data.responseJSON.message);
								} else {
									//$(form).find(this_.el.form_response_selector).html(data.status+' '+data.statusText + ' Ошибка соединения').addClass("color-red");
								}
							},
							complete: function () {
								$(form).find(this_.el.form_response_selector).slideDown("fast").css("visibility", "visible");
								$(form).find(this_.el.form_submit_selector).prop('disabled', false);
								$(form).find(this_.el.form_submit_selector).text(btn_text_default);
							},
						});
					}
				});
				
			}); // each
		},
    };
    new module;
};


// Различные слайдеры и карусели
App.Sliders = function () {
	$('.team-carousel').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 4,
		infinite: true,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 1280,
			settings: {
				slidesToShow: 3,
				}
			},
			{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				}
			},
			{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				}
			}
		]
	});
	
	$('.team-carousel').on('breakpoint', function(event, slick, currentSlide, nextSlide){
		teamPopupInit(); // Необходимо т.к. при ресайзе slick слайдера может не работать magnificPopup без новой инициализации
	});
	
	
	function teamPopupInit() {
		$('.js-team-popup').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#name',
			tClose: 'Закрыть',
			
			fixedContentPos: true,
			fixedBgPos: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
	
			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 992) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				}
			}
		});
	}
	teamPopupInit();
	
};


// Для страницы с картой
App.Map = function () {
	
};



// различный дополнительный функционал
App.Other = function () {
	if (App.is_mobile) {
		$('html').addClass('is_mobile');
	}
	else { 
		$(window).mousemove(function(e) { // эффект параллакса для фона некоторых слайдов
			if (($('.parallax-overlay:visible').length) && (App.wheeling == false)) {
				var layer_coeff = 20;
				var x = ($(window).width() - $('.parallax-overlay:visible')[0].offsetWidth) / 2 - (e.pageX - ($(window).width() / 2)) / layer_coeff;
				var y = ($(window).height() - $('.parallax-overlay:visible')[0].offsetHeight) / 2 - (e.pageY - ($(window).height() / 2)) / layer_coeff;
				$('.parallax-overlay:visible').offset({ top: y ,left : x });
			}
		});		
	}
};



// Прокрутка страниц-слайдов
App.FullPage = function () {
	
	if ($('.gsm-fullpage').attr('id')=='fullpage-horizontal') { // для главной страницы
		
		$('#fullpage-horizontal').fullpage({
			loopHorizontal: false,
			scrollOverflow: true,
			//scrollHorizontally: true,
			//controlArrows: false,
			continuousVertical: true,
			anchors: ['slide'],
			afterSlideLoad: function(section, origin, destination, direction) {				
				// для обозначения текущего активного подпункта
				$('.main-menu .gsm-menu > ul > li').removeClass('active');
				$('.main-menu .gsm-menu > ul #li-' + section + '-' + destination).addClass('active');
			},
			afterRender: function() {
				App.RemoveMainPreloader();
			},
			onSlideLeave: function(section, origin, destination, direction){
				//прокрутка не будет осуществлена, если курсор сейчас над картой
				if ($('#map:hover').length) {
					return false;
				}
			}
		});
		
		// Дополнение для корректной прокрутки слайдов по горизонтали
		var window_height = 0;
		var doc_height = window_height;
		
		var is_top = 0;
		var is_bottom = 0;
		
		var matrix = [];
		var x = 0;
		var y = 0;
		
		$('#fullpage-horizontal .section .slide').mousewheel(function (event, delta) { 
			
			window_height = $(window).height();
			doc_height = window_height;
			
			is_top = 0;
			is_bottom = 0;
			
			matrix = [];
			x = 0;
			y = 0;
			
			// если в слайде есть переполнение и в слайде есть блок со скроллом
			if ($(this).find('.fp-scroller').length) { 
				doc_height = $(this).find('.fp-scroller').height();
				
				// извлечь значение translateY. Нужно, чтобы определить прокручена область к началу или к концу
				matrix = $(this).find('.fp-scroller').css('transform').replace(/[^0-9\-.,]/g, '').split(',');
				x = matrix[12] || matrix[4];
				y = matrix[13] || matrix[5];
				
				if (y==0) { // начало
					is_top = 1;
					is_bottom = 0;
				}
				if (doc_height == (Math.abs(y)+window_height)) { // конец, блок прокручен до низа
					is_top = 0;
					is_bottom = 1;
				}
				
			} else { // если переполнения нет
				is_top = 1;
				is_bottom = 1;
			}
						
			if (delta == 1 && is_top == 1) {
				$.fn.fullpage.moveSlideLeft();
			};
			if (delta == -1 && is_bottom == 1) {
				$.fn.fullpage.moveSlideRight();
			};
			
			// нужно для корреткной работы параллакса при скроллинге
			clearTimeout(App.wheeling);
				App.wheeling = setTimeout(function() {
				App.wheeling = false;
			}, 700);
		});
	} // fullpage-horizontal
	
	
	
	if ($('.gsm-fullpage').attr('id')=='fullpage-vertical') { // для страницы услуг и всех остальных
		
		var menu_anchors = [];
		$("#menu-vertical li").each(function( index ) {
			menu_anchors.push($(this).data('menuanchor'));
		});
		
		var page_autoScrolling = true;
		var page_scrollOverflow = true;
		var current_anchor = '';
		if (App.is_mobile) {
			page_autoScrolling = false;
			page_scrollOverflow = false;
		}
		$('#fullpage-vertical').fullpage({ // 
			autoScrolling: page_autoScrolling,
			scrollOverflow: page_scrollOverflow,
			anchors: menu_anchors,
			menu: '#menu-vertical',
			afterLoad: function(origin, destination, direction){				
				// для обозначения текущего активного подпункта
				current_anchor = $('#menu-vertical li.active').data('menuanchor');
				$('#main-menu-sub li').removeClass('active');
				$('#main-menu-sub #li-' + current_anchor).addClass('active');
			},
			afterRender: function() {
				if ($('.team-carousel').length) {
					$('.team-carousel').slick('reinit');
				}
				App.RemoveMainPreloader();
			}
		});
		
	} // fullpage-vertical
	
	
	App.FullpageReBuild();
	
};


App.FullpageReBuild = function () {
	// оптимизация обработчика resize
	var debounceFPResize = debounce(function () { 
		$.fn.fullpage.reBuild();
	}, 300);
	App.win.resize(debounceFPResize);
	
	$.fn.fullpage.reBuild();	
};


App.RemoveMainPreloader = function () {
	$('.gsm-fullpage').show();
	$('.preloader').fadeOut("slow");
};

App.makeItRain = function () {
	if ($('.gsm-city__rain').length == 0 || App.is_mobile) { // на мобильниках лучше отключить
		return false;
	}
	
	//clear out everything
	$('.rain').empty();
	
	var increment = 0;
	var drops = "";
	var backDrops = "";
	
	while (increment < 70) {
	var randoHundo = (Math.floor(Math.random() * (95 - 1 + 1) + 1));
	var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
	increment += randoFiver;
	drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
	backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
	}
	
	$('.rain.front-row').append(drops);
	$('.rain.back-row').append(backDrops);
};


$(document).ready(function(){
	App.Menu();
	App.Other();
	App.Forms();
	App.Sliders();
	App.Map();
	App.FullPage();
	App.makeItRain();
});
