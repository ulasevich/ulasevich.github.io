$(document).ready(function(){
	
	//стилизация списков
	$(".chosen-select").chosen({max_selected_options: 5, disable_search_threshold: 11});
	
	// появление формы (заказать стенд и т.д.)
	$(".w-f-link").on("click", function() {
		show_overlay();
		var form_id = $( "#"+$(this).attr("data-form")+"-form");
		$( form_id ).appendTo("body").show();
		form_measurements(form_id);
		return false;
	});
	
	//закрытие формы при нажатии на тёмный фон или на кнопку "закрыть"
	$(document).on('click', ".dark-overlay, .w-f-close", function() {
		form_close();
		return false;
	});
	
	$('.white-form, .f-switch').css("visibility", "visible").hide();
	
	$( window ).resize(function() {
		form_measurements($(".white-form:visible"));
	});
	
	//Сначала стилизуем списки chosen, потом прячем (иначе будут некорректно стилизоваться)
	$(".f-hidden").hide();
	
	//Если опция формы стенда нужна, показываем её параметры
	$(".yes-or-not").each(function (i) {
		if ( ( $(this).val() == 0 ) || ( $(this).val() == 'Нет' ) ) { $(this).siblings("div.f-hidden").hide(); }
		else { $(this).siblings("div.f-hidden").show(); }
	});
	$(document).on("change", ".yes-or-not", function() {
		if ( ( $(this).val() == 0 ) || ( $(this).val() == 'Нет' ) ) { $(this).siblings("div.f-hidden").slideUp(); }
		else { $(this).siblings("div.f-hidden").slideDown(); }
	});
	
	//Добавляем дополнительные опции
	$(document).on("click", ".f-add", function() {
		$(this).prev(".f-additional").clone().insertBefore( $(this) );
		$(this).prev(".f-additional").find(".chosen-container").remove();
		$(this).prev(".f-additional").find('.f-switch').show();
		$(this).prev(".f-additional").find("select").show().chosen({max_selected_options: 5, disable_search_threshold: 11});
		$(this).prev(".f-additional").find('.f-switch').hide();
		$(this).prev(".f-additional").hide().slideDown();
		return false;
	});
	
	//Удаляем дополнительные опции
	$(document).on("click", ".f-delete", function() {
		$(this).parent(".f-additional").slideUp( "slow", function() { $(this).remove() } );
		return false;
	});

	// меняем опции при выборе одного из неcкольких вариантов (например, витрины)
	$("select.f-switch").each(function (i) {
		$(this).siblings("div.f-switch ").hide();
		$(this).siblings("div.f-switch-"+$(this).val()).show();
	});
	$(document).on("change", "select.f-switch", function() {
		$(this).siblings("div.f-switch ").slideUp();
		$(this).siblings("div.f-switch-"+$(this).val()).slideDown();
	});
	
	
	// появление поля поиска при нажатии на кнопку
	$(document).on("click", ".h-search-btn", function() {
		if (!$(".h-search-text").hasClass("search-expanded")) {
			$(".h-search-text").animate({width:'200px'}, 500).addClass("search-expanded");
			return false;
		} else if ($(".h-search-text").val()=="") {
			return false;
		}
	});

	
});

function form_measurements(form_id) {
	$(".dark-overlay").css("width", $(window).width()).css("height", $(document).height());
	$(".w-f-content").removeAttr("style");
	
	var form_height = $( form_id ).height();
	var form_top = ($(window).height()-form_height)*0.5;
	if (form_top<0) {
		form_top = $(window).height()*0.1;
		$( form_id ).children(".w-f-content").height($(window).height()*0.8-120);
	}
	else {
		$( form_id ).children(".w-f-content").css("height", "");
	}
	$( form_id ).css("top", form_top);
	$( form_id ).css("margin-left", $( form_id ).width()*(-0.5));
}

//создание тёмного фона
function show_overlay() {
	$('<div class="dark-overlay"></div>').css("width", $(document).width()).css("height", $(document).height()).appendTo("body").show();
}

//закрытие формы и удаление фона
function form_close() {
	$(".white-form").hide();
	$(".dark-overlay").remove();
}

