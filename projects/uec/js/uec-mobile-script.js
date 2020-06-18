$(document).ready(function() {
	
	$(".open-list + .list-item-content").show();
	/* Для раздела "Вопросы-ответы" */
	$(document).on('click', '.list-title', function() {
		if ( $(this).hasClass("open-list") ) { $(this).siblings(".list-item-content").slideUp(); $(this).removeClass("open-list"); }
		else { $(this).siblings(".list-item-content").slideDown(); $(this).addClass("open-list"); }
		return false;
	});
			
});
