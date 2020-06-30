//Глобальный объект App сайта
var App = {
    win: $(window),
	doc: $(document),
	is_mobile: detectmob(), // браузер мобильный или нет
	ms_ie: /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent), // Браузер - ie или нет
	max_mobile_width: 992, // максимальная ширина, при которой применяется стили и функционал для портативных устройств
	wheeling: false, // нужно для корреткной работы параллакса при скроллинге
	currentX: '',
	currentY: '',
	current_lang: $('body').attr('lang')
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
			h_menu_selector: '.site-menu',
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
				body: '.virtracker-fullpage',
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
		
		
	$('#virtracker-fullpage').fullpage({ // 
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
		
		
};



App.RemoveMainPreloader = function () {
	$('.preloader').fadeOut("slow");
};



var messages_values = {
	country: {
		required: "Please enter the country name",
		maxlength: "Maximum of 50 characters",
	},
	organization: {
		required: "Please enter name of the organization",
		maxlength: "Maximum of 100 characters",
	},
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
	success_short: 'Thanks!',
	success: 'Thanks! We will contact you.',
	error: 'Error sending email'
};

var close_popup_text = 'Close';



// утановка нужного набора сообщения в зависимости от языка
App.Translations = function () {
	switch(App.current_lang){
        case "id":
            messages_values = {
				country: {
					required: "Silakan masukkan nama negara",
					maxlength: "Maksimal 50 karakter",
				},
				organization: {
					required: "Silakan masukkan nama organisasi",
					maxlength: "Maksimal 100 karakter",
				},
				name: {
					required: "Mohon perkenalkan diri Anda",
					maxlength: "Maksimal 50 karakter",
				},
				email: {
					required: "Masukkan alamat email Anda",
					email: "Masukkan alamat yang benar",
				},
				message: {
					required: "Masukkan pesan Anda",
					maxlength: "Maksimal 1000 karakter",
				},
			};
			response_text = {
				success_short: 'Terima kasih!',
				success: 'Terima kasih! Kami akan menghubungi Anda.',
				error: 'Kesalahan mengirim email'
			};
			close_popup_text = 'Menutup';
        break;
        case "pt":
            messages_values = {
				country: {
					required: "Digite o nome do país",
					maxlength: "Máximo de 50 caracteres",
				},
				organization: {
					required: "Digite o nome da organização",
					maxlength: "Máximo de 100 caracteres",
				},
				name: {
					required: "Apresente-se, por favor",
					maxlength: "Máximo de 50 caracteres",
				},
				email: {
					required: "Insira o seu endereço de email",
					email: "Digite o endereço correto",
				},
				message: {
					required: "Digite sua mensagem",
					maxlength: "Máximo de 1000 caracteres",
				},
			};
			response_text = {
				success_short: 'Obrigado!',
				success: 'Obrigado! Nós entraremos em contato com você.',
				error: 'Erro ao enviar email'
			};
			close_popup_text = 'Fechar';
        break;
		case "tr":
            messages_values = {
				country: {
					required: "Lütfen ülke adını girin",
					maxlength: "En fazla 50 karakter",
				},
				organization: {
					required: "Lütfen kuruluşun adını girin",
					maxlength: "En fazla 100 karakter",
				},
				name: {
					required: "Lütfen kendini tanıt",
					maxlength: "En fazla 50 karakter",
				},
				email: {
					required: "E-posta adresinizi giriniz",
					email: "Doğru adresi girin",
				},
				message: {
					required: "Mesajınızı giriniz",
					maxlength: "En fazla 1000 karakter",
				},
			};
			response_text = {
				success_short: 'Teşekkürler!',
				success: 'Teşekkürler! Sizinle iletişime geçeceğiz.',
				error: 'E-posta gönderilirken hata oluştu'
			};
			close_popup_text = 'Kapat';
        break;
		case "ru":
            messages_values = {
				country: {
					required: "Пожалуйста, введите название страны",
					maxlength: "Максимум 50 символов",
				},
				organization: {
					required: "Пожалуйста, введите название организации",
					maxlength: "Максимум 100 символов",
				},
				name: {
					required: "Пожалуйста, представьтесь",
					maxlength: "Максимум 50 символов",
				},
				email: {
					required: "Введите ваш адрес электронной почты",
					email: "Введите правильный адрес",
				},
				message: {
					required: "Введите ваше сообщение",
					maxlength: "Максимум 1000 символов",
				},
			};
			response_text = {
				success_short: 'Спасибо!',
				success: 'Спасибо! Мы свяжемся с вами.',
				error: 'Ошибка при отправке электронной почты'
			};
			close_popup_text = 'Закрыть';
        break;
    }
};



// Popups
App.Popups = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
		},
		render: function () {
            this_ = this;
			this_.popupForm();
        },
		popupForm: function () { // всплывающие окна для форм
			$('.js-popup').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',
				tClose: close_popup_text,
				
				fixedContentPos: false,
				fixedBgPos: true,
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in',
				autoFocusLast: false,
		
				callbacks: {
					beforeOpen: function() {
						if($(window).width() < 992) {
							this.st.focus = false;
						} else {
							this.st.focus = '#name';
						}
						//$('html').addClass('page-blurred');
					},
					beforeClose: function() {
						//$('html').removeClass('page-blurred');
					}
				},
			});
		},
    };
    new module;
};



// Demo form
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
			
			$(this_.el.application_form_selector).submit(function(event) {
				$(this_.el.form_response_selector).removeClass("color-green color-red").html("&nbsp;").slideUp("fast");
				event.preventDefault();
			});
			
			$(this_.el.application_form_selector).validate({
				rules: {
					country: {
						required: true,
						maxlength: 50,
					},
					organization: {
						required: true,
						maxlength: 100,
					},
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
				showErrors: function(errorMap, errorList) {
					//console.log(errorList);
					if (errorList.length>0) {
						$(this_.el.form_submit_selector).prop('disabled', true);
					} else {
						$(this_.el.form_submit_selector).prop('disabled', false);
					}
					this.defaultShowErrors();
					/*if ($(this_.el.application_form_selector).find('label.error:visible').length) {
						$("body,html").animate( { scrollTop: $("label.error:visible").offset().top-100 }, 800 );
					}*/
				},
				submitHandler: function(form) {
					$(this_.el.form_submit_selector).prop('disabled', true);
					$(this_.el.form_submit_selector).addClass('btn-preloader');
					
					$.ajax({ 
						url: $(this_.el.application_form_selector).attr("action"),
						type: 'POST',
						dataType: "json",
						cache: false,
						data: $(form).serialize(),
						success: function (data) {
							console.log(data);
							if (data.success == true) {
								$(this_.el.form_response_selector).html(response_text.success_short).addClass("color-green");
								$('#link-demo-web').attr('href', data.demo_web);
								$('#link-demo-file').attr('href', data.demo_file);
								$('.demo-links').show();
								setTimeout( function(){$('.demo-links').addClass('demo-links-show')}, 1000);
							}
							else {
								$(this_.el.form_response_selector).html(response_text.error).addClass("color-red");
								console.log(data.ErrorInfo);
							}
						},
						error: function (data) {
							console.log(data);
							$(this_.el.form_response_selector).html(response_text.error).addClass("color-red");
							if (data.hasOwnProperty("responseJSON")) {
								$(form).find(this_.el.form_response_selector).html(data.responseJSON.message).addClass("color-red");
								console.log("error: " + data.responseJSON.message);
							} else {
								//$(this_.el.form_response_selector).html('Error: '+data.status+'; Status: '+data.statusText).addClass("color-red");
								console.log('Error: '+data.status);
								console.log('Status: '+data.statusText);
							}
						},
						complete: function () {
							$(this_.el.form_response_selector).slideDown("fast");
							$(this_.el.form_submit_selector).prop('disabled', false).removeClass("btn-preloader");
							if ($(this_.el.form_response_selector).is(":visible")) {
								$("body,html").animate( { scrollTop: $(this_.el.form_response_selector).offset().top-100 }, 800 );
							}
							update_captcha_tokens();
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
			
			$(this_.el.application_form_selector).submit(function(event) {
				$(this_.el.form_response_selector).removeClass("color-green color-red").html("&nbsp;").slideUp("fast");
				event.preventDefault();
			});
			
			$(this_.el.application_form_selector).validate({
				rules: {
					country: {
						required: true,
						maxlength: 50,
					},
					organization: {
						required: true,
						maxlength: 100,
					},
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
				showErrors: function(errorMap, errorList) {
					//console.log(errorList);
					if (errorList.length>0) {
						$(this_.el.form_submit_selector).prop('disabled', true);
					} else {
						$(this_.el.form_submit_selector).prop('disabled', false);
					}
					this.defaultShowErrors();
					if ($(this_.el.application_form_selector).find('label.error:visible').length) {
						$("body,html").animate( { scrollTop: $("label.error:visible").offset().top-100 }, 800 );
					}
				},
				submitHandler: function(form) {
					$(this_.el.form_submit_selector).prop('disabled', true);
					$(this_.el.form_submit_selector).addClass('btn-preloader');
					
					$.ajax({ 
						url: $(this_.el.application_form_selector).attr("action"),
						type: 'POST',
						dataType: "json",
						cache: false,
						data: $(form).serialize(),
						success: function (data) {
							//console.log(data);
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
							$(this_.el.form_response_selector).html(response_text.error).addClass("color-red");
							if (data.hasOwnProperty("responseJSON")) {
								$(form).find(this_.el.form_response_selector).html(data.responseJSON.message).addClass("color-red");
								console.log("error: " + data.responseJSON.message);
							} else {
								//$(this_.el.form_response_selector).html('Error: '+data.status+'; Status: '+data.statusText).addClass("color-red");
								console.log('Error: '+data.status);
								console.log('Status: '+data.statusText);
							}
						},
						complete: function () {
							$(this_.el.form_response_selector).slideDown("fast");
							$(this_.el.form_submit_selector).prop('disabled', false).removeClass("btn-preloader");
							if ($(this_.el.form_response_selector).is(":visible")) {
								$("body,html").animate( { scrollTop: $(this_.el.form_response_selector).offset().top-100 }, 800 );
							}
							update_captcha_tokens();
						},
					});
					
				}
			});
			
		}, // applicationForm
    };
    new module;
};


// переключение языков
App.Lang = function () {
	
	$('#site-lang option[value='+App.current_lang+']').attr('selected','selected');
	
	$('#site-lang').on('change', function(){
		var lang = $(this).val();
		console.log(lang);
		
		if (lang==App.current_lang) {
			return false;
		}
		
		var page = '/projects/covid-tracker/';
		if (lang!="en") {
			page = '/projects/covid-tracker/index-'+lang+'.html';
		}
		window.location.href = page; // redirect
	});
	
};


function update_captcha_tokens() {
	grecaptcha.ready(function() {
		grecaptcha.execute('6Ld5zPkUAAAAAO-7N4XtyLZIDcT2hjJPVcafq2QR', {action: 'order'}).then(function(token) {
			document.getElementById('g-recaptcha-response-order').value=token;
		});
	});
	grecaptcha.ready(function() {
		grecaptcha.execute('6Ld5zPkUAAAAAO-7N4XtyLZIDcT2hjJPVcafq2QR', {action: 'contact'}).then(function(token) {
			document.getElementById('g-recaptcha-response-contact').value=token;
		});
	});
};


$(document).ready(function(){
	new WOW().init(); // for animation
	//update_captcha_tokens();
	App.Other();
	App.HeaderMenuMobile();
	App.FullPage();
	App.Translations();
	App.Popups();
	App.FormOrder();
	App.FormContact();
	App.Lang();
});
