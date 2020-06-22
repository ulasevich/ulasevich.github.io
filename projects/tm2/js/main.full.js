//Глобальный объект App сайта
var App = {
    win: $(window),
	doc: $(document),
	is_mobile: detectmob(), // browser is mobile or not
	ms_ie: /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent), // ie or not
	max_mobile_width: 992,
};

// the definition of mobile browser
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


// Usefull for resize, scroll events
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


function fileBoxesInit(inputs) { // for input file styling
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.parentNode,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 ) // or multiple file selection, input must have the multiple attribute, as well as data-multiple-caption
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



function check_scroll() {
	if($(window).scrollTop() == 0) {
		$('body').addClass('scrollTop');
	} else if($(window).scrollTop() + $(window).height() == $(document).height()) {
		$('body').addClass('scrollBottom');
	}
	else {
		$('body').removeClass('scrollTop scrollBottom');
	}
};



// different functions
App.Other = function () {
	if (App.is_mobile) {
		$('html').addClass('is_mobile');
	}
	
	check_scroll();
	$(document).scroll(function() { 
		check_scroll();
	});
	
	// this is for specific table layout with spaces between rows
	var tr_cell_count = 0;
	$(".default-table tbody tr").each(function() {
		tr_cell_count = $(this).children('td').length;
		$(this).after('<tr class="tr-space"><td colspan="'+tr_cell_count+'"></td></tr>');
	});
	
};


App.Covers = function () {
	function coverBigHeight() {
		$('.cover-big').css('min-height', $(window).height());
	}
	if ($('.cover-big').length) {
		coverBigHeight();
		var debounceTopScreenResize = debounce(function () {
			coverBigHeight();
		}, 250);
		App.win.resize(debounceTopScreenResize);
	}
	App.doc.on('click', '.arrow-link-index', function(){
		var psddingTop = parseInt($('.content-container').css('padding-top'));
		$([document.documentElement, document.body]).animate({
			scrollTop: $(".content").offset().top - $('.header').height() - psddingTop
		}, 1000);
		return false;
	});
	
	function coverSimpleWidth() {
		$('.content .cover').width($(window).outerWidth());
		$('.content .cover').css('marginLeft', -($(window).width() - $('.main-container').width())/2);
	}
	if ($('.content .cover').length) {
		coverSimpleWidth();
		var debounceSimpleCoverResize = debounce(function () {
			coverSimpleWidth();
		}, 250);
		App.win.resize(debounceSimpleCoverResize);
	}
};



// Right menu sidebar
App.Sidebar = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			sidebar_selector: '.sidebar',
			sidebar_open_btn_selector: '.mainmenu-btn',
			sidebar_close_btn_selector: '.sidebar-close',
			menu_group_selector: '.sidebar-menu-group',
			menu_heading_selector: '.s-menu-heading',
			sidebar_open_class: 'sidebar-open',
			group_open_class: 'group-open',
		},
		render: function () {
            this_ = this;
			this_.sidebarInit();
            this_.sidebarSwipe();
			this_.sidebarClose();
			this_.sidebarMenu();
        },
		sidebarInit: function () {
			App.doc.on('click', this_.el.sidebar_open_btn_selector, function(){
				if (!$('body').hasClass(this_.el.sidebar_open_class)) {
					this_.sidebarOpen();
				} else {
					this_.sidebarClose();
				}
				return false;
			});
			App.doc.on('click', this_.el.sidebar_close_btn_selector, function(){
				this_.sidebarClose();
				return false;
			});	
			$('.sidebar').niceScroll({
				cursorcolor: "#854DFF",
				cursorborder: "none",
				cursorwidth: "8px",
				cursorborderradius: "0",
				autohidemode: true,
				hidecursordelay: 1000,
				zindex: 10
			});
		},
        sidebarClose: function () {
			$('body').removeClass(this_.el.sidebar_open_class);
        },
		sidebarOpen: function () {
			$('body').addClass(this_.el.sidebar_open_class);
        },
        sidebarSwipe: function () {
            if (typeof ($.fn.swipe) === 'undefined') { // jquery.touchSwipe.min.js
                return;
            }
            $(this_.el.sidebar_selector).swipe({
                excludedElements: 'button, input, select, textarea, .noSwipe',
                swipeRight: function (event, direction, distance, duration, fingerCount) {
					this_.sidebarClose();
                },
            });
        },
		sidebarMenu: function () {
			App.doc.on('click', this_.el.menu_heading_selector, function(){
				if (!$(this).parent(this_.el.menu_group_selector).hasClass(this_.el.group_open_class)) {
					$(this).parent(this_.el.menu_group_selector).addClass(this_.el.group_open_class);
				} else {
					$(this).parent(this_.el.menu_group_selector).removeClass(this_.el.group_open_class);
				}
				setTimeout('$(".sidebar").getNiceScroll().resize();', 500); // for nicescroll
				return false;
			});
		},	
    };
    new module;
};


// Question form
App.SideForm = function () {
    var module = function () {
        this.render();
    },
	this_;

    module.prototype = {
        el: {
			sideform_selector: '.side-form',
			sideform_open_btn_selector: '.side-form-switch',
			sideform_close_btn_selector: '.side-form-close',
			sideform_open_class: 'side-form-open',
			application_form_selector: '.side-form form',
			form_response_selector: '.side-form .form-response',
			form_submit_selector: '.side-form :submit',
			form_status_selector: '.side-form .submit-status',
		},
		render: function () {
            this_ = this;
			this_.sideformInit();
            this_.sideformSwipe();
			this_.sideformClose();
			this_.applicationForm();
        },
		sideformInit: function () {
			App.doc.on('click', this_.el.sideform_open_btn_selector, function(){
				if (!$('body').hasClass(this_.el.sideform_open_class)) {
					this_.sideformOpen();
				} else {
					this_.sideformClose();
				}
				return false;
			});
			App.doc.on('click', this_.el.sideform_close_btn_selector, function(){
				this_.sideformClose();
				return false;
			});	
			$('.side-form__body').niceScroll({
				cursorcolor: "#854DFF",
				cursorborder: "none",
				cursorwidth: "8px",
				cursorborderradius: "0",
				autohidemode: true,
				hidecursordelay: 1000,
				zindex: 10
			});
		},
        sideformClose: function () {
			$('body').removeClass(this_.el.sideform_open_class);
        },
		sideformOpen: function () {
			$('body').addClass(this_.el.sideform_open_class);
        },
        sideformSwipe: function () {
            if (typeof ($.fn.swipe) === 'undefined') { // jquery.touchSwipe.min.js
				console.log('jquery.touchSwipe.min.js is required');
                return;
            }
            $(this_.el.sideform_selector).swipe({
                excludedElements: 'button, input, select, textarea, .noSwipe',
                swipeRight: function (event, direction, distance, duration, fingerCount) {
					this_.sideformClose();
                },
            });
        },
		applicationForm: function () { // validation and sending form
			var messages_values = {
				form_text_4: {
					required: "Please introduce yourself",
					maxlength: "Maximum of 50 characters",
				},
				form_text_2: {
					required: "Enter your email address",
					email: "Enter the correct address",
				},
				form_textarea_3: {
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
					form_text_4: {
						required: true,
						maxlength: 50,
					},
					form_text_2: {
						required: true,
						email: true,
					},
					form_textarea_3: {
						required: true,
						maxlength: 1000,
					},
				},
				messages: messages_values,
				focusInvalid: false,
				submitHandler: function(form) {
					$(this_.el.form_submit_selector).prop('disabled', true);
					$(this_.el.form_status_selector).text('Sending...');
					
					$.ajax({ 
						url: '/side-form-content.php',
						type: 'POST',
						dataType: "json",
						cache: false,
						data: $(form).serialize(),
						success: function (data) {
							console.log(data);
							console.log(typeof data.success);
							if (data.success == true) {
								$(this_.el.form_response_selector).html('Thanks! We will contact you.').addClass("color-green");
							}
							else {
								$(this_.el.form_response_selector).html('Error sending email.').addClass("color-red");
								console.log(data.ErrorInfo);
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
							$(this_.el.form_response_selector).show();
							$(this_.el.form_submit_selector).prop('disabled', false);
							$(this_.el.form_status_selector).text('');
						},
					});
					
				}
			});
			
		}, // applicationForm
    };
    new module;
};


App.ResponsiveTables = function () { // make table responsive
	if (typeof ($.fn.stacktable) === 'undefined') {
		console.log('stacktable.js is required');
		return;
	}
	$('.stack-table:not(.stacktable)').stacktable(); // class "stack-table" for simple tables
	$('.card-table:not(.stacktable)').cardtable(); // class "stack-table" for tables with head row
};


// open/close content blocks
App.Accordeons = function () {
	if(window.location.hash && $('.accordion-switch').length) {
		$('.accordion-switch[data-href="'+window.location.hash+'"]').addClass('switch-on');
		$(window.location.hash).addClass('accordion-opened');
		
		$([document.documentElement, document.body]).animate({
			scrollTop: $(window.location.hash).offset().top - 150
		}, 500);
	}
	App.doc.on('click', '.accordion-switch', function(){
		var href = $(this).attr('href')
		if (!$(this).hasClass('switch-on')) {
			$(this).addClass('switch-on');
			$(href).addClass('accordion-opened');
		} else {
			$(this).removeClass('switch-on');
			$(href).removeClass('accordion-opened');
		}
		return false;
	});
};


$(document).ready(function(){
	App.Other();
	App.Covers();
	App.Sidebar();
	App.SideForm();
	App.ResponsiveTables();
	App.Accordeons();
});
