//Глобальный объект App сайта
var App = {
    win: $(window),
	doc: $(document),
	is_mobile: detectmob(), // браузер мобильный или нет
	ms_ie: /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent), // Браузер - ie или нет
	header_height: 0, // высота шапки
	middle_height: 0, // высота без учета шапки сайта (для больших блоков-фильтров)
	max_mobile_width: 768, // максимальная ширина, при которой применяется стили и функционал для портативных устройств
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

			if( fileName ) {
				//label.querySelector( 'span' ).innerHTML = fileName;
			}
			else {
				label.innerHTML = labelVal;
			}
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
};


function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
}

function mask(event) {
    var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
    if (event.type == "blur") {
        if (this.value.length == 2) this.value = ""
    } else setCursorPosition(this.value.length, this)
};


function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(emailAddress);
};


// Добавление масок к различным типам полей
App.InputMasks = function () {
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--phone:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			input.addEventListener("input", mask, false);
			input.addEventListener("focus", mask, false);
			input.addEventListener("blur", mask, false);
			input.focus();
			input.blur();
		}
	);
	
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--float-number:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			var numberFloatMask = new IMask(input,
			{
				mask: Number,
				thousandsSeparator: '',
				radix: '.',
				mapToRadix: [',']
			});
		}
	);
	
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--int-number:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			var numberFloatMask = new IMask(input,
			{
				mask: Number,
				thousandsSeparator: '',
				scale: 0
			});
		}
	);
	
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--price-number:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			var numberFloatMask = new IMask(input,
			{
				mask: Number,
				thousandsSeparator: ' ',
				scale: 0
			});
		}
	);
	
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--year:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			var yearMask = new IMask(input,
			{
				mask: Number,
				thousandsSeparator: '',
				scale: 0
			});
		}
	);	
	
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--time:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			var timeMask = new IMask(input,
			{
				mask: 'HH:MM',
				groups: {
					HH: new IMask.MaskedPattern.Group.Range([1, 23] /*, optional size */),
					MM: new IMask.MaskedPattern.Group.Range([1, 59] /*, optional size */),
				},
			});
		}
	);	
	
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--time-seconds:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			var timeMask = new IMask(input,
			{
				mask: 'HH:MM:SS',
				groups: {
					HH: new IMask.MaskedPattern.Group.Range([1, 23] /*, optional size */),
					MM: new IMask.MaskedPattern.Group.Range([1, 59] /*, optional size */),
					SS: new IMask.MaskedPattern.Group.Range([1, 59] /*, optional size */),
				},
			});
		}
	);
	
	
	Array.prototype.forEach.call( 
		document.querySelectorAll('.js--type-time:not(.masked)'),
		function(input, index){
			input.classList.add('masked');
			$(input).on('change', function(){ 
				$(input).attr("value", $(input).val());
			});
		}
	);
};


// Функционал для форм
App.Forms = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
		},
		render: function () {
            this_ = this;
			//if (!App.ms_ie) { this_.checkBox(); }
			this_.resetForms();
			this_.fileBoxes();
        },
		checkBox: function () {
			App.doc.on('change', 'input[type="checkbox"]', function(){ // для корректной работы при анимации
				$('input[type="checkbox"]').attr("disabled", true);
				setTimeout(function() { $('input[type="checkbox"]').removeAttr("disabled"); }, 1000);
			});
		},
		resetForms: function () {
			App.doc.on('click', '[type="reset"]', function(){ // нужно для принудительного сброса списков multiselect
				$(this).parents('form').find('select[multiple]').multiselect('deselectAll', false);
				$(this).parents('form').find('select[multiple]').multiselect('updateButtonText');
			});
		},
		fileBoxes: function () {
			var inputs = $( '.inputfile' );
			fileBoxesInit(inputs);
		},
    };
    new module;
};



// оформление списков
App.Selects = function () {
	
	$('.select:not(.decorated)').append('<i class="fas fa-angle-down"></i>').addClass('decorated'); // для оформления select
	
	$('.select select:not([multiple]):not([data-toggle]):not(.image-select)').chosen({
		disable_search_threshold: 20,
		no_results_text: "Ничего не найдено"
	});
	
	$('.select select.image-select').chosenImage({
		disable_search_threshold: 20,
		no_results_text: "Ничего не найдено"
	});
	
	$('select[multiple]').multiselect({
		buttonClass: '',
		nonSelectedText: '...',
		allSelectedText: 'Все',
		selectAllText: ' Выбрать все',
		nSelectedText: 'выбрано',
		includeSelectAllOption: true,
	});
	
	
};


// Блок Preloader
App.showPreloader = function (selector) {
	if (selector) {
		$(selector).append('<div class="preloader"></div>')
	} else {
		$('body').append('<div class="preloader preloader--full"></div>')
	}
};
App.removePreloader = function (selector) { // убрать блок прелоадера
	$('.preloader').fadeOut(200, function() {$(this).remove()});
}


App.Sliders = function (selector) {	
};


// Блок с фильтром-картой на главной
App.Filtr = function (selector) {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			map_filtr_selector: '.map-filtr-section',
			map_filtr_form_selector: '.map-filtr-col-form',
			map_filtr_results_selector: '.map-filtr-col-results',
			map_filtr_scroll_selector: '.map-filtr-scroll',
			map_filtr_scroll_height: 0,
			map_filtr_submit_selector: '.map-filtr-col-form .btn--entire' ,
		},
		render: function () {
            this_ = this;
			if ($(this_.el.map_filtr_selector).length) {
				this_.mapFiltrInit();
				this_.mapFiltrResize();
				this_.MapScrolling();
			}
        },
		mapFiltrInit: function () {
			var debounceFiltrResize = debounce(function () { // оптимизация обработчика resize
                if (App.win.width() > App.max_mobile_width) {
					this_.mapFiltrResize();
				}
            }, 100);
            App.win.resize(debounceFiltrResize);
		},
		mapFiltrResize: function () {
			App.header_height = $('.header').outerHeight();
			App.middle_height = $(window).outerHeight() - App.header_height;
			this_.el.map_filtr_scroll_height = App.middle_height - $(this_.el.map_filtr_submit_selector).outerHeight();
			
			$(this_.el.map_filtr_form_selector).height(App.middle_height);
			$(this_.el.map_filtr_results_selector).height(App.middle_height);
			$(this_.el.map_filtr_scroll_selector).height(this_.el.map_filtr_scroll_height);
		},
		MapScrolling: function () {
			App.AddScrolling(this_.el.map_filtr_scroll_selector);
		},
    };
    new module;
};


// различный дополнительный функционал
App.ExtraFunctions = function (selector) {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
		},
		render: function () {
            this_ = this;
			this_.popOvers();
			this_.dropDowns();
			this_.dropDownsSelect();
			this_.filtersToggle();
			this_.chatScrolling();
			this_.textareaAutoheight();
			this_.chessPagesScrolling();
			this_.chessMainScrolling();
        },
		popOvers: function () {
			$('[data-toggle="tooltip"]').tooltip()
			$('[data-toggle="popover"]').popover(); // для работы всплывающих подсказок
			$('.catalog__item-status-bookmark').popover({
				placement: 'top',
				html: true,
				template: '<div class="popover favorite-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
				content: function() {
					if ($(this).hasClass('active')) {
						return '<i class="fas fa-minus"></i> Удалено из закладок';
					} else {
						return '<i class="fas fa-plus"></i> Добавлено в закладки';
					}
				},
			});
						
			$('.catalog__item-status-bookmark').each(function( index ) {
				$(this).attr('title', $(this).attr('data-original-title'));
			});
		},
		dropDowns: function () {
			$(document).on('click', '.filtr-col-btn .dropdown-filtr', function (e) { // инчае при клике на dropdown он сразу пропадает
				e.stopPropagation();
			});
		},
		dropDownsSelect: function () {
			$(document).on('mousedown', '#dropdownObjectFiltr', function (e) {
				e.preventDefault();
			});
		},
		filtersToggle: function () {
			$(document).on('click', '.js--widthToggle', function(event){
				var $this = $(this);
				var $block = $($(this).data('target'));
				$this.prop("disabled", true);
				
				if (!$block.hasClass('show')) {
					$block.animate( {width:'toggle'}, 0, function() {
						$block.addClass('show');
						$this.prop("disabled", false);
					});
				} else {
					$block.animate( {width:'toggle'}, 0, function() {
						$block.removeClass('show');
						$this.prop("disabled", false);
					});
				}
			});
		},
		chatScrolling: function () {
			if ($('.chat-block__discuss-scroll').length) {
				App.AddScrolling('.chat-block__discuss-scroll');
				$('.chat-block__discuss-scroll').scrollTop($('.chat-block__discuss-scroll').get(0).scrollHeight, -1);
			}
		},
		textareaAutoheight: function () {
			function autosize(){
				var el = this;
				setTimeout(function(){
					el.style.cssText = 'height:auto; padding:0';
					el.style.cssText = 'height:' + el.scrollHeight + 'px';
				}, 0);
			}			
			var textareas = document.querySelectorAll('.js--textarea-autoheight');
			for (var i = 0; i < textareas.length; i++) {
				textareas[i].addEventListener('keydown', autosize);
			}
			
		},
		chessPagesScrolling: function () {
			if ($('.chess-pages__scroll').length) {
				$('.chess-pages__scroll').niceScroll({
					cursorcolor: "#7a965a",
					cursorborder: "none",
					cursorwidth: "3px",
					cursorborderradius: "3px",
					horizrailenabled: true,
					railvalign: 'bottom', 
					preservenativescrolling: false,
					autohidemode: 'leave'
				});
			}
		},
		chessMainScrolling: function () {
			if ($('.chess-main__scroll').length) {
				$('.chess-main__scroll').niceScroll({
					cursorcolor: "#7a965a",
					cursorborder: "none",
					cursorwidth: "5px",
					cursorborderradius: "5px",
					horizrailenabled: true,
					railvalign: 'bottom', 
					preservenativescrolling: false,
					autohidemode: 'leave',
					background: "#f8f9f9",
				});
			}
		},
    };
    new module;
};


App.RemoveScrolling = function (selector) {
	$(selector).getNiceScroll().remove();
};
App.AddScrolling = function (selector) {
	$(selector).niceScroll({
		cursorcolor: "#d6d7d9",
		cursorborder: "none",
		cursorwidth: "4px",
		cursorborderradius: "4px",
		railpadding: { top: 0, right: 1, left: 0, bottom: 0 },
		//preservenativescrolling: false,
	});
};


// оформление датапикеров
App.DatePickers = function () {
	
	$('.js--datepicker:not(.decorated)').after('<i class="far fa-calendar green"></i>').addClass('decorated');
	$('.js--datepicker.decorated').flatpickr({
		dateFormat: "d.m.Y",
	});
	
	$('.js--timepicker:not(.decorated)').after('<i class="far fa-clock green"></i>').addClass('decorated');
	$('.js--timepicker.decorated').flatpickr({
		enableTime: true,
		noCalendar: true,
		dateFormat: "H:i",
		time_24hr: true
	});
	
};


// всплывающие подсказки для таблицы дежурств (выполнять при обновлении таблицы) 
App.DutyPopovers = function () {
	
	$('.calendar-line-day .calendar-line').popover({
		placement: 'top',
		html: true,
		trigger: 'hover',
		template: '<div class="popover duty-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
		content: function() {
			var this_ = this;
			return '<img src="'+$(this_).data('duty-photo')+'" >' + 
			'<div class="duty-popover__text">' + 
			$(this_).data('duty-name') + '<br>' + '<div class="duty-time gray">' + $(this_).data('duty-type') + ' <b>·</b> ' + $(this_).data('duty-time') + '</div>' + 
			'</div>';
		},
	});
	
};


// всплывающие подсказки для шахматки
App.ChessPopovers = function () {
	
	$('.chess-apartment-link, .chess-apartment-cell').popover({
		placement: 'auto',
		container: 'body',
		html: true,
		trigger: 'hover',
		template: '<div class="popover chess-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
		content: function() {
			var this_ = this;
			return '<p>' +$(this_).data('chess-type') + '</p>' + 
			'<p class="align-center"><img src="'+$(this_).data('chess-photo')+'" ></p>' + 
			'<div class="chess-popover__text">' + 
			'Площадь: ' + $(this_).data('chess-area') + ' м<sup>2</sup> <br>' + 
			'Кухня: ' + $(this_).data('chess-kitchen') + ' м<sup>2</sup> <br>' + 
			'Цена: ' + $(this_).data('chess-price') + ' руб. <br>' + 
			'</div>';
		},
	});
	
};



// всплывающие подсказки для чекбоксов и радио
App.DesableLabel = function (selector) {
	$(selector).popover({
		placement: 'top',
		html: true,
		trigger: 'hover',
		template: '<div class="popover label-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
		content: function() {
			return $(this).data('text');
		},
	});
	$(selector).addClass('label-disabled').find('input').attr('disabled', true).attr('checked', false);
};
App.EnableLabel = function (selector) {
	$(selector).popover('dispose');
	$(selector).removeClass('label-disabled').find('input').attr('disabled', false);
};


App.StackableTables = function () { // применяется по умолчанию для таблиц без сортировки
	$('.data-table table:not(.stacktable)').stacktable();
};


$(document).ready(function(){
	
	App.Forms();
	App.InputMasks();
	App.Selects();
	App.Sliders();
	App.Filtr();
	App.ExtraFunctions();
	
	// Нужно для изменения настроек локализации датапикера по умолчанию
	flatpickr.localize(flatpickr.l10ns.ru);
	flatpickr.l10ns.default.firstDayOfWeek = 1; // Monday - Понедельник
	App.DatePickers();
	
	App.StackableTables();
	
});
