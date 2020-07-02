if(typeof jQuery=='undefined') {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = '/js/jquery-1.12.2.min.js';
    headTag.appendChild(jqTag);
} 

//Глобальный объект (панель) для разделов портфолио
var Panel = {
    win: $(window),
	doc: $(document),
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
					//console.log(panel_data);
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
			}, options );
						
			$(this).addClass('uas-panel');
			
			var panel_data_site = '';
			if (panel_data.site) {
				panel_data_site = '<p>Сайт:<br/><a href="'+panel_data.site+'" target="_blank" rel="nofollow">'+panel_data.site+'</a></p>';
			}
			
			$(this).append(
				'<div class="uas-panel-wrapper">\
					<div class="uas-panel-side">\
						<div class="uas-panel-side-btn uas-panel-show"></div>\
						<div class="uas-panel-side-btn uas-panel-close"></div>\
						<div class="uas-panel-side-text">\
							И<br/>\
							Н<br/>\
							Ф<br/>\
							О<br/>\
						</div>\
					</div>\
					<div class="uas-panel-container">\
						<div class="uas-panel-content">\
							<div class="uas-project-title">'+panel_data.title+'</div>\
							<p>Год: '+panel_data.year+'</p>\
							<p>Выполнено:<br/> '+panel_data.description+'</p>'
							+panel_data_site+'\
							<p><a href="/" class="uas-back-link"><span class="uas-arr">&lsaquo;</span> <span class="uas-back-text">Назад в портфолио</span></a></p>\
						</div>\
					</div>\
				</div>'
			);
			
			/*
			$(this).find('.uas-panel-show').on( "click", function() {
				methods.show_panel.call(this_);
			});
			
			$(this).find('.uas-panel-close').on( "click", function() {
				methods.hide_panel.call(this_);
			});
			*/
			
			$('.uas-panel-side').on( "click", function() {
				methods.switch_panel.call(this_);
			});
		},
		destroy : function( ) {
		},
		switch_panel : function(el) {
			if ($(this).hasClass(defaults.class_status_opened)) {
				$(this).removeClass(defaults.class_status_opened);
			} else {
				$(this).addClass(defaults.class_status_opened);
			}
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
		update : function(content) {
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

function addCSS(filename){
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('link');
	style.href = filename;
	style.type = 'text/css';
	style.rel = 'stylesheet';
	head.append(style);
}

var Panel_el;

$(document).ready(function(){
	addCSS('/css/panel.css');
	$('body').append('<div id="uas-portfolio-panel"></div>');
	Panel_el = $( "#uas-portfolio-panel" ).uasPanel({
		//color: "white"
	});
	//console.log(Panel_el);
});
