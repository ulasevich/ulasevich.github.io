//Глобальный объект (панель) для разделов портфолио
var Panel = {
    win: $(window),
	doc: $(document),
	is_mobile: detectmob(), // браузер мобильный или нет
	ms_ie: /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent), // Браузер - ie или нет
};


/* Spell chat */
/*Плагин для модуля чата */
(function( $ ) {
	
	var defaults = {
		content_height: null,
		content_width: null,
		class_status_opened: 'uas-panel--opened',
	};
	
	var panel_data = {
	};
	
	var this_
	
	var methods = {
		init : function( ) {						
			return this.each(function(){
				this_ = this;
				
				$.getJSON('info.json').done(function(data){
					panel_data = data;
					console.log(panel_data);
					methods.build.call(this_);
				})
				.fail(function(jqxhr){
					console.info('error reading json file');
					console.log(jqxhr);
				});
			});			
		},
		build : function( options ) {
			var settings = $.extend({ // опции оформления
				color: "black",
				backgroundColor: "white",
				svg_icon_close: '<svg class="spchat-svg-icon" enable-background="new 0 0 32 32" height="32px" id="Слой_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Cancel"><path clip-rule="evenodd" d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16   c8.836,0,16-7.163,16-16C32,7.163,24.836,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14   C30,23.732,23.732,30,16,30z"/><path clip-rule="evenodd" d="M22.729,21.271l-5.268-5.269l5.238-5.195   c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.39-1.034-0.39-1.428,0l-5.231,5.188l-5.309-5.31c-0.394-0.396-1.034-0.396-1.428,0   c-0.394,0.395-0.394,1.037,0,1.432l5.301,5.302l-5.331,5.287c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.429,0   l5.324-5.28l5.276,5.276c0.394,0.396,1.034,0.396,1.428,0C23.123,22.308,23.123,21.667,22.729,21.271z"/></g><g/><g/><g/><g/><g/><g/></svg>',
				svg_icon_show: '<svg class="spchat-svg-icon" enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z"/></svg>',
			}, options );
			
			console.log(panel_data);
			
			$(this).addClass('uas-panel');
			
			$(this).append(
				'<div class="uas-panel-wrapper">\
					<div class="uas-panel-side">\
						<div class="uas-panel-side-btn uas-panel-show">'+settings.svg_icon_show+'</div>\
						<div class="uas-panel-side-btn uas-panel-close">'+settings.svg_icon_close+'</div>\
					</div>\
					<div class="uas-panel-content">\
						<p>'+panel_data.title+'<br/>\
						Год: '+panel_data.year+'</p>\
						<p>\
						'+panel_data.description+'\
						</p>\
						<p><a href="#">&larr; Ссылка на портфолио</a></p>\
					</div>\
				</div>'
			);
			
			$(this).find('.uas-panel-show').on( "click", function() {
				methods.show_panel.call(this_);
			});
			
			$(this).find('.uas-panel-close').on( "click", function() {
				methods.hide_panel.call(this_);
			});
		},
		destroy : function( ) {
		},
		show_panel : function(el) {
			if ($(this).hasClass(defaults.class_status_opened)) {
				return false;
			} else {
				$(this).addClass(defaults.class_status_opened);
			}
		},
		hide_panel : function(el) {
			if ($(this).hasClass(defaults.class_status_opened)) {
				$(this).removeClass(defaults.class_status_opened);
			} else {
				return false;
			}
		},
		update : function( content ) {
			//
		}
	};
	
	$.fn.uasPanel = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод ' +  method + ' не существует в jQuery.uasPanel' );
		} 
    };
	
})( jQuery );



var Panel_el;


$(document).ready(function(){
	$('body').append('<div id="uas-portfolio-panel"></div>');
	
	Panel_el = $( "#uas-portfolio-panel" ).uasPanel({
		//color: "white"
	});
	
	console.log(Panel_el);
});
