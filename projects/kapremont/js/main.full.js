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



// Мобильное меню
App.HeaderMenuMobile = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			sidr_selector: '.sidr',
			h_menu_selector: '.h-menu',
			mobile_btn_selector: '.mobile-mainmenu-btn',
			sidr_class: 'sidr-mobile-mainmenu',
		},
		render: function () {
            this_ = this;
			if (!$(this_.el.mobile_btn_selector).length) {
				return false;
			}
            this_.sidrInit();
            this_.sidrSwipe();
			this_.sidrResize();
        },
		sidrInit: function () {
			if (typeof ($.fn.sidr) === 'undefined') {
				console.info("required jquery.sidr(.min).js (для мобильного меню)");
				return;
			}
			$(this_.el.mobile_btn_selector).sidr({
                name: this_.el.sidr_class,
                source: this_.el.h_menu_selector,
				side: 'right'
            });
			
			// для скроллинга до активного пункта в моб-м меню
			var activeMenuElement = document.getElementsByClassName('sidr-class-active')[0];
			var topPos = activeMenuElement.offsetTop;
			document.getElementById('sidr-mobile-mainmenu').scrollTop = topPos;
			
		},
        sidrClose: function () {
            $.sidr('close', this_.el.sidr_class);
        },
        sidrSwipe: function () {
            if (typeof ($.fn.swipe) === 'undefined') { // jquery.touchSwipe.min.js
                return;
            }
            // при перелистывания меню налево, закрываем его
            $(this_.el.sidr_selector).swipe({
                excludedElements: 'button, input, select, textarea, .noSwipe',
                swipeRight: function (event, direction, distance, duration, fingerCount) {
                    this_.sidrClose();
                },
            });
        },
		sidrResize: function () {
			var debounceSidrResize = debounce(function () { // оптимизация обработчика resize
                if (App.win.width() > App.max_mobile_width) {
                    // если ширина стала большой, активное меню надо закрыть вручную
                    this_.sidrClose();
                }
            }, 250);
            App.win.resize(debounceSidrResize);
		},
    };
    new module;
}


App.Sliders = function() {
	if (typeof ($.fn.slick) === 'undefined') {
        console.info("required slick(.min).js (для слайдеров, каруселей)");
        return;
    }
    var module = function () {
        this.render();
    },
	this_;
    module.prototype = {
        el: {
			partners_slider_selector: '.partners-slider',
			news_slider_selector: '.news-slider',
			work_slider_selector: '.work-slider',
			showing_slider_selector: '.showing-slider',
		},
		render: function () {
            this_ = this;
            this_.partnersSlider();
			this_.newsSlider();
			this_.workSlider();
			this_.showingSlider();
        },
		partnersSlider: function () {
			$(this_.el.partners_slider_selector).slick({
				infinite: true,
				speed: 300,
				touchThreshold: 10,
				swipeToSlide: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				centerMode: true,
				autoplay: true,
				autoplaySpeed: 6000,
				centerPadding: '20px',
				responsive: 
				[
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 568,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerPadding: '5px',
							centerMode: false,
						}
					}
				],
			});
		},
		newsSlider: function () {
			$(this_.el.news_slider_selector).slick({
				infinite: false,
				slidesToShow: 1,
				dots: true,
				adaptiveHeight: true
			});
		},
		workSlider: function () {
			$(this_.el.work_slider_selector).slick({
				infinite: true,
				slidesToShow: 1,
				dots: true,
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 6000
			});
		},
		showingSlider: function () {
			$(this_.el.showing_slider_selector).slick({
				infinite: true,
				slidesToShow: 1,
				dots: false,
				adaptiveHeight: true
			});
		},
    };
    new module;
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
			if (!App.ms_ie) { this_.checkBox(); }
			this_.fileBoxes();
			this_.copyBlock();
			this_.Alerts();
			this_.viewDoc();
			this_.fieldControls();
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
		checkBox: function () {
			App.doc.on('change', 'input[type="checkbox"]', function(){ // для корректной работы при анимации
				$('input[type="checkbox"]').parent('label').css("pointer-events", 'none');
				setTimeout(function() { $('input[type="checkbox"]').parent('label').css("pointer-events", 'auto'); }, 1000);
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
				if (copy.find('[name*="area"]').length) {
					copy.find('label.error').remove();
					validate_area_fields();
				}
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
		viewDoc: function () {
			// Просмотр документов
			$(document).on('click', '.js-link--viewdoc', function(){
				if ( $('#view-doc-iframe').attr('src')!=$(this).attr('href')) { // чтобы при повторном открытии того же документа не пришлось заново грузить iframe
					$('#view-doc-iframe').attr('src', $(this).attr('href'));
				}
				return false;
			});
		},
		fieldControls: function () { // функционал для доп. всплывающих кнопок полей (сброс и справка)
			$(document).on({
				mouseenter: function(){
					$(this).children('.field-controls__container').fadeIn();
				},
				mouseleave: function(){
					$(this).children('.field-controls__container').fadeOut();
				}
			}, '.field-controls');
			
			$(document).on({
				mouseenter: function(){
					$('#reference-' + $(this).data('name')).fadeIn();
				},
				mouseleave: function(){
					$('#reference-' + $(this).data('name')).fadeOut('slow');
				}
			}, '.field-controls-btn-reference');
			
			$(document).on('click', '.field-controls-btn-reset', function(){
				$('[name="'+$(this).data('name')+'"]').val('');
				$('select[name="'+$(this).data('name')+'"]').trigger("chosen:updated");
				return false;
			});
		},
    };
    new module;
};



// оформление списков
App.Selects = function () {
	
	$('.select-block:not(.decorated)').prepend('<span class="arr"></span>').addClass('decorated'); // для оформления select
	
	// для списков с chosen-extra нужно добавить кнопку для возможности добавления новых опций
	$('.chosen-extra .select-chosen').on('chosen:ready', function(){
		$(this).siblings('.chosen-container').find('.chosen-search').append('<button class="btn btn-chosen-extra" data-select-name="'+$(this).attr('name')+'">добавить</button>');
    });
	
	$('.select-chosen').chosen({
		disable_search_threshold: 0,
		no_results_text: "Ничего не найдено"
	});
	
	
	App.doc.on('keyup', '.chosen-extra .chosen-search-input', function() {
		console.log($(this).parent('.chosen-search').siblings('.chosen-results').children('.no-results').length);
		if ($(this).parent('.chosen-search').siblings('.chosen-results').children('.no-results').length == 1) {
			$(this).siblings('.btn-chosen-extra').show();
		} else {
			$(this).siblings('.btn-chosen-extra').hide();
		}
	});
	
	App.doc.on('click', '.btn-chosen-extra', function(){
		var new_option_text = $(this).siblings('.chosen-search-input').val();
		var select_name = $(this).data('select-name');
		console.log(new_option_text);
		console.log(select_name);
		$('select[name="'+select_name+'"]').append("<option value='"+new_option_text+"'>"+new_option_text+"</option>");
		$('select[name="'+select_name+'"]').val(new_option_text);
		$('select[name="'+select_name+'"]').trigger("chosen:updated");
	});
	
	App.doc.on('click', '[type="reset"]', function(){
		$(".select-chosen").val('').trigger("chosen:updated");
	});
	
};




App.Media = function () { // аудио, видео
	$('video, audio').mediaelementplayer({
		// More configuration
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

// дополняет стандартный метод проверки "number" для вещественных чисел с точкой и запятой
$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
}


// отдельная функция для валидации поля площади. Потребуется повторный вызов при клонировании полей на странице "Личные данные" - /personal/
function validate_area_fields() {
	var field_counter = 0;
	$('[name*="area"]').each(function() {
		$(this).attr('name', 'area_'+ (field_counter++));
		$(this).rules('add', {
			required: true,
			number: true,
			messages: {
				required:  "обязательно для заполнения",
				number:  "только числовое значение"
			}
		});
	});						
}


$(document).ready(function(){
	
	App.HeaderMenuMobile();
	App.Sliders();
	App.Share();
	App.Forms();
	App.Media();
	App.Print();
	App.Selects();
	
	$('[data-toggle="popover"]').popover(); // нужно для всплывающих окон (напр. Горячая линия в шапке)
	
	$('.form').on('hide.bs.modal', function () { // нужно, чтобы аудио и видео в модальных окнах прерывалось при их закрытии
		$('video, audio').each(function(){
			this.pause(); // Stop playing
		});
		
		var $if = $(this).find('iframe');
		var src = $if.attr("src");
		$if.attr("src", src);
	})
		
});
