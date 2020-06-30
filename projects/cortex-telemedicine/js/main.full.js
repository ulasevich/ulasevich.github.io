//Глобальный объект App сайта
var App = {
    win: $(window),
	doc: $(document),
	is_mobile: detectmob(), // браузер мобильный или нет
	ms_ie: /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent), // Браузер - ie или нет
	max_mobile_width: 992, // максимальная ширина, при которой применяется стили и функционал для портативных устройств
	wheeling: false, // нужно для корреткной работы параллакса при скроллинге
	currentX: '',
	currentY: ''
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


function parallaxIt(e, target, movement) {
	var $this = $('.section');
	var relX = e.pageX - $this.offset().left;
	var relY = e.pageY - $this.offset().top;
	
	TweenMax.to(target, 1, {
		x: (relX - $this.width() / 2) / $this.width() * movement,
		y: (relY - $this.height() / 2) / $this.height() * movement
	});
}


// различный дополнительный функционал
App.Other = function () {
	if (App.is_mobile) {
		$('html').addClass('is_mobile');
	}
	
	check_scroll();
	$(document).scroll(function() { 
		check_scroll();
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
			h_menu_selector: '.cortex-menu',
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
				console.info("required jquery.sidr(.min).js");
				return;
			}
			$(this_.el.mobile_btn_selector).sidr({
                name: this_.el.sidr_class,
                source: this_.el.h_menu_selector,
				displace: false,
				body: '.cortex-fullpage',
				side: 'right'
            });
			
			App.doc.on('click', '.sidr a', function(){
				$(".sidr a").removeClass('sidr-class-active');
				$(this).addClass('sidr-class-active');
			});	
			
			$(document).mouseup(function (e) {
				if ( ($(".header").has(e.target).length === 0) && ($(".sidr").has(e.target).length === 0) ) {
					this_.sidrClose();
				}
			});			
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
};




// Прокрутка страниц-слайдов
App.FullPage = function () {
	var page_autoScrolling = false;
	var page_scrollOverflow = false;
	
	var menu_anchors = [];
	var menu_titles = [];
	$("#menu li.fp-link").each(function( index ) {
		menu_anchors.push($(this).data('menuanchor'));
		menu_titles.push($(this).text());
	});
	//menu_anchors.push('lastPage');
	
	if (App.is_mobile) {
		page_autoScrolling = false;
		page_scrollOverflow = false;
	}
		
		
	$('#cortex-fullpage').fullpage({ // 
		autoScrolling: page_autoScrolling,
		scrollOverflow: page_scrollOverflow,
		anchors: menu_anchors,
		menu: '#menu',
		navigationPosition: 'right',
		navigationTooltips: menu_titles,
		navigation: true,
		css3: true,
		scrollBar: true,
		afterRender: function() {
			App.RemoveMainPreloader();			
		},
		afterLoad: function(origin, destination, direction) {
			App.currentX = '';
			App.currentY = '';
		},
	});	
	
	/*
	$(window).on("resize", function () {
		setTimeout(function(){
			$.fn.fullpage.reBuild();
		}, 1000);
	});
	*/
	
	
	/*App.doc.on('click', '.arrow-link-index', function(){
		$("#cortex-fullpage").fullpage.moveTo(2);
		return false;
	});	
	
	App.doc.on('click', '.arrow-link-last', function(){
		$("#cortex-fullpage").fullpage.moveTo(1);
		return false;
	});*/
	
};



App.RemoveMainPreloader = function () {
	$('.preloader').fadeOut("slow");
};



// Order book form
App.FormOrder = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			application_form_selector: '.application_form_order',
			form_response_selector: '.application_form_order .form-response',
			form_submit_selector: '.application_form_order :submit',
		},
		render: function () {
            this_ = this;
			this_.applicationForm();
        },
		applicationForm: function () { // validation and sending form
			var messages_values = {
				name: {
					required: "Please introduce yourself",
					maxlength: "Maximum of 50 characters",
				},
				email: {
					required: "Enter your email address",
					email: "Enter the correct address",
				},
			};
			var response_text = {
				success: 'Thanks! We will contact you.',
				error: 'Error sending email'
			}
			
			$(this_.el.application_form_selector).submit(function(event) {
				$(this_.el.form_response_selector).removeClass("color-green color-red").html("").hide();
				event.preventDefault();
			});
			
			$(this_.el.application_form_selector).validate({
				rules: {
					name: {
						required: true,
						maxlength: 50,
					},
					email: {
						required: true,
						email: true,
					},
				},
				messages: messages_values,
				focusInvalid: false,
				submitHandler: function(form) {
					$(this_.el.form_submit_selector).prop('disabled', true);
					$(this_.el.form_submit_selector).addClass('btn-preloader');
					$(this_.el.form_submit_selector).children(".btn__content").text('Sending...');
					
					$.ajax({ 
						url: $(this_.el.application_form_selector).attr("action"),
						type: 'POST',
						dataType: "json",
						cache: false,
						data: $(form).serialize(),
						success: function (data) {
							console.log(data);
							if (data.success == true) {
								$(this_.el.form_response_selector).html(response_text.success).addClass("color-green");
							}
							else {
								$(this_.el.form_response_selector).html(response_text.error).addClass("color-red");
								console.log(data.ErrorInfo);
							}
						},
						error: function (data) {
							console.log(data);
							if (data.hasOwnProperty("responseJSON")) {
								$(form).find(this_.el.form_response_selector).html(data.responseJSON.message).addClass("color-red");
								console.log("error: " + data.responseJSON.message);
							} else {
								$(form).find(this_.el.form_response_selector).html('Error status '+data.status+', statusText '+data.statusText).addClass("color-red");
								console.log(data.responseText);
							}
						},
						complete: function () {
							$(this_.el.form_response_selector).show();
							$(this_.el.form_submit_selector).prop('disabled', false);
							$(this_.el.form_submit_selector).removeClass("btn-preloader");
							$(this_.el.form_submit_selector).children(".btn__content").text('Book a demo');
						},
					});
					
				}
			});
			
		}, // applicationForm
    };
    new module;
};



// Feedback form
App.FormContact = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			application_form_selector: '.application_form_contact',
			form_response_selector: '.application_form_contact .form-response',
			form_submit_selector: '.application_form_contact :submit',
		},
		render: function () {
            this_ = this;
			this_.applicationForm();
        },
		applicationForm: function () { // validation and sending form
			var messages_values = {
				name: {
					required: "Please introduce yourself",
					maxlength: "Maximum of 50 characters",
				},
				email: {
					required: "Enter your email address",
					email: "Enter the correct address",
				},
				message: {
					required: "Enter your message",
					maxlength: "Maximum of 1000 characters",
				},
			};
			var response_text = {
				success: 'Thanks! We will contact you.',
				error: 'Error sending email'
			}
			
			$(this_.el.application_form_selector).submit(function(event) {
				$(this_.el.form_response_selector).removeClass("color-green color-red").html("").hide();
				event.preventDefault();
			});
			
			$(this_.el.application_form_selector).validate({
				rules: {
					name: {
						required: true,
						maxlength: 50,
					},
					email: {
						required: true,
						email: true,
					},
					message: {
						required: true,
						maxlength: 1000,
					},
				},
				messages: messages_values,
				focusInvalid: false,
				submitHandler: function(form) {
					$(this_.el.form_submit_selector).prop('disabled', true);
					$(this_.el.form_submit_selector).addClass('btn-preloader');
					$(this_.el.form_submit_selector).children(".btn__content").text('Sending...');
					
					$.ajax({ 
						url: $(this_.el.application_form_selector).attr("action"),
						type: 'POST',
						dataType: "json",
						cache: false,
						data: $(form).serialize(),
						success: function (data) {
							console.log(data);
							if (data.success == true) {
								$(this_.el.form_response_selector).html(response_text.success).addClass("color-green");
							}
							else {
								$(this_.el.form_response_selector).html(response_text.error).addClass("color-red");
								console.log(data.ErrorInfo);
							}
						},
						error: function (data) {
							console.log(data);
							if (data.hasOwnProperty("responseJSON")) {
								$(form).find(this_.el.form_response_selector).html(data.responseJSON.message).addClass("color-red");
								console.log("error: " + data.responseJSON.message);
							} else {
								$(form).find(this_.el.form_response_selector).html('Error status '+data.status+', statusText '+data.statusText).addClass("color-red");
								console.log(data.responseText);
							}
						},
						complete: function () {
							$(this_.el.form_response_selector).show();
							$(this_.el.form_submit_selector).prop('disabled', false);
							$(this_.el.form_submit_selector).removeClass("btn-preloader");
							$(this_.el.form_submit_selector).children(".btn__content").text('Send');
						},
					});
					
				}
			});
			
		}, // applicationForm
    };
    new module;
};



$(document).ready(function(){
	new WOW().init(); // for animation
	App.Other();
	App.HeaderMenuMobile();
	App.FullPage();
	App.FormOrder();
	App.FormContact();
});
