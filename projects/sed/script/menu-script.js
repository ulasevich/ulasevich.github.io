//script for print link ".h-print"
//function printBlock()
//{
//	productDesc = $('.content').html();
//	$('body').addClass('printSelected');
//	$('body').append('<div class="printSelection">' + productDesc + '</div>');
//	$('.receipt_title').css('display', 'block');
//	window.print();    
//	window.setTimeout(pageCleaner, 0); 
//	return false;
//}

//add style to select


function pageCleaner()
{
	$('body').removeClass('printSelected');
	$('.printSelection').remove();
	$('.receipt_title').css('display', 'none');
}
//script for print link ".h-print"


$(document).ready(function() {
		
	var menu_width = 0;
	
	$(".m-second-level a").each(function() { 
		menu_width += $(this).width();
		if ( $(".m-second-level").width() < menu_width ) {
			$(this).addClass("extra");
		}
	});
	
	$("a.extra").each(function() { 
		$(this).appendTo(".extra-links");
	});
	
	if ($(".extra-links a").length > 0) { $(".menu-more-trigger").show(); }
	
	
	//header menu additional
	//$('.class').each(function () {
		var time = 250;
		var hideDelay = 500;

		var hideDelayTimer = null;

		var beingShown = false;
		var shown = false;
		var trigger = $('.menu-more-trigger', this);
		var info = $('.extra-links', this).css('opacity', 0).css('display', 'none');


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
					opacity: 0
				}, time, 'swing', function () {
					shown = false;
					info.css('display', 'none');
				});
				trigger.removeClass("active");

			}, hideDelay);

			return false;
		});
		
	//});
	//$('.class').each(function () {
									
	
});
