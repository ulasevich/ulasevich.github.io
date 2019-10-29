$(document).ready(function(){
	
	$(".chosen-select").chosen({max_selected_options: 5, disable_search_threshold: 12});
	
	// Закрытие формы авторизации или открытого select (".k-select") (если открыта)	
	$(document).mouseup(function (e) {
		if ( ($(".auth-form").has(e.target).length === 0) || ($(e.target).attr("class")=="h-auth-close") ) {
			$(".auth-form").hide();
		}
		if ($(".k-select-box").has(e.target).length === 0) {
			$(".k-select-box").hide();
		}
	});
	
	// появление формы авторизации
	$(".auth-btn").live("click", function() {
		$(".auth-form").show();
	});
	
	// открытие стилизованного списка при нажатии
	$(".k-select-text").live("click", function() {
		$(this).siblings(".k-select-box").show();
	});
	
	
	//инициализация стилизованного списка
	function select_replacement(select_one) { // замена нативного селект на стилизованный
		var select_options = '';
		var select_id = '';
		if (select_one.attr("id")) { select_id = select_one.attr("id");}
		var selected = '';
		var option_id = '';
		
		select_one.children("option").each(function() {
			selected = '';
			option_id = '';
			if ($(this).attr("selected")) { selected = ' class="selected"'; }
			if ($(this).attr("id")) { option_id = ' id="'+ $(this).attr("id") +'"'; }
			select_options += '<li data-li-value="'+ $(this).val() +'" ' + selected + option_id + '>'+ $(this).text() +'</li>';
		});
		
		select_one.replaceWith('<span class="'+ select_one.attr("class") +'"><span class="w-select-text"></span><input class="w-select-value" type="hidden" name="" value=""><div class="w-select-box"><div class="w-select-scroll"><ul>' + select_options + '</ul></div></div></span>');
	}
	$( "select.k-select" ).each(function() {
		select_replacement($(this));
	});
	
	$( ".k-select" ).each(function() {
		$(this).children(".k-select-text").text( $(this).children(".k-select-text").siblings(".k-select-box").find("li.selected").text() );
		$(this).children(".k-select-value").val( $(this).children(".k-select-value").siblings(".k-select-box").find("li.selected").attr("data-li-value") );
		if ( $(this).find("li").length > 5) { $(this).children('.k-select-box').height($('.k-select-scroll li').height()*5); }
		else { $(this).children('.k-select-box').height( $('.k-select-scroll li').height()*$(this).find("li").length); }
	});
	var select_scroll_api = $('.k-select-scroll').jScrollPane({showArrows:true, verticalGutter:0, horizontalGutter:0}).data('jsp');
	$('.k-select-box').hide();
	$(".k-select li").live("click", function() {
		$(this).siblings(".selected").removeClass("selected");
		$($(this).addClass("selected").parentsUntil(".k-select").get(4)).siblings(".k-select-value").val( $(this).attr("data-li-value") ).trigger('change').siblings(".k-select-text").text( $(this).text() );
		$('.k-select-box').hide();
	});
	//инициализация стилизованного списка
	
	
	$('.k-select-value').change(function(){
		// alert( $(this).val() );
		// событие change работает благодаря .trigger('change')
		
	})
	
// для примера обновления списка k-select	
//	var i=10;
//	$("#add-item").live("click", function() {
//		$("#qqq ul").append("<li data-li-value='"+ i++ +"'>"+ i +"</li>");
//		
//		if ( $("#qqq").find("li").length > 5) { $("#qqq").children('.k-select-box').height($('.k-select-scroll li').height()*5); }
//		else { $("#qqq").children('.k-select-box').height( $('.k-select-scroll li').height()*$("#qqq").find("li").length); }
//		$('.k-select-box').show();
//		select_scroll_api.reinitialise();
//		$('.k-select-box').hide();
//	});


	
	
	//инициализация стилизованного скроллинга
	$( ".k-content-scroll img.comment-avatar" ).each(function() {
		$(this).attr("height", 30 ); //для хрома должна быть указана высота для работы jScrollPane
	});
	$('.k-content-scroll').jScrollPane({showArrows:true, verticalGutter:0, horizontalGutter:0, autoReinitialise: true});
	
	//всплывающие подсказки (панель авторизованного пользователя)
	$(".tip-link").on('mouseover', function(e){
		$(".p-b-tip span").text("");
		if ( $(this).children("span").text() ) { $(".p-b-tip").show().children("span").text( $(this).children("span").text() ); }
		var offset = $(this).position();
	    var x = offset.left;
	    var y = offset.top;
		var addon = 0;
		if ($(this).hasClass("p-b-section")) {addon = 41;}
		$(".p-b-tip").css("left", x-(($(".p-b-tip").width() - ($(this).width()+addon))/2));
		$(".p-b-tip").css("top", y+46);
		//$("#qqq").text( $(".p-b-tip").width() );
		//$("#eee").text( ($(".p-b-tip").width() - ($(this).width()+41))/2 );
	});
	$(".tip-link").on('mouseout', function(e){
		$(".p-b-tip").hide();
	});
	
	//появление формы комментария при клике на кнопку "Ответить"
	$(".comment-btn-open").live("click", function() {
		$(this).parents(".comment-author").siblings(".comment-form").slideDown();
		$(this).hide();
	});
	$(".comment-btn-close").live("click", function() {
		$(this).parents(".comment-form").slideUp();
		$(this).parents(".comment-form").siblings(".comment-author").children(".comment-btn-open").show();
	});
	
	//аккордион ("Краснотека")
	$(".accordion-link").live("click", function() {
		$(this).parents(".gray-item").next(".accordion-block").slideDown();
		return false;
	});
	
	// всплывающее меню в шапке
	var distance = 10;
	var time = 250;
	var hideDelay = 500;
	var hideDelayTimer = null;
	var beingShown = false;
	var shown = false;
	var trigger = $('.h-more-link', this);
	var info = $('.h-more-menu', this).css('opacity', 0).css('display', 'none');
	$([trigger.get(0), info.get(0)]).mouseover(function () {
		if (hideDelayTimer) clearTimeout(hideDelayTimer);
		if (beingShown || shown) {
			// don't trigger the animation again
			return;
		} else {
			// reset position of info box
			beingShown = true;

			info.css({
				//top: 207,
				//left: -33,
				display: 'block'
			}).animate({
				//top: '-=' + distance + 'px',
				opacity: 1
			}, time, 'swing', function() {
				beingShown = false;
				shown = true;
			});
			trigger.addClass("active");
		}
		return false;
		
	}).mouseout(function () {
		if (hideDelayTimer) clearTimeout(hideDelayTimer);
		hideDelayTimer = setTimeout(function () {
			hideDelayTimer = null;
			info.animate({
				//top: '-=' + distance + 'px',
				opacity: 0
			}, time, 'swing', function () {
				shown = false;
				info.css('display', 'none');
			});
			trigger.removeClass("active");

		}, hideDelay);

		return false;
	});
	// всплывающее меню в шапке
	
	$(".lightbox").live("click", function() {
		//$("#jquery-overlay").css("height", $(".wrapper").height()+"px !important" );
		//alert($(".wrapper").height());
	});
	
	
});
