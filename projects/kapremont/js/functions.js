// Функции (серверная часть)
// -------------------------

$(document).ready(function(){
	
	// Новости
	$(document).on('click', '.js-link--news', function(){
		var selectors = {
			wrapper: '#newsItemForm .modal-body-wrapper',
			content: '#newsItemForm .modal-body'
		};
		
		// нужно, чтобы анимация сработала
		$(selectors.wrapper).height($(selectors.content).outerHeight());
		 
		$(selectors.wrapper).addClass('status--loading');
		
		$.ajax({ 
			url: 'ajax_news_test.php',
			type: 'POST',
			dataType: "json",
			data: $(this).data('id'),
			success: function (data) {
				$(selectors.content).html(data.content);
				App.Media();
			},
			error: function (data) {
				$(selectors.content).html('<div class="alert alert-danger" role="alert">Ошибка соединения</div>');
			},
			complete: function () {
				// нужно, чтобы анимация сработала при изменении контента
				setTimeout(function() {
					$(selectors.wrapper).height($(selectors.content).outerHeight());
					$(selectors.wrapper).removeClass('status--loading'); // когда окончательно обновили контент
				}, 1000);
				setTimeout(function() {
					$(selectors.wrapper).height('auto');
				}, 2000);
			},
		});
		return false;
	});
	
});