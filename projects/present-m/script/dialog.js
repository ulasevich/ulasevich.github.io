$(document).ready(function(){

	$("body").append( $(".dialog") );
	
	$(".dialog").css("top", "200px").css("left", ($(document).width()-800)/2 );

	function dialog_close() {
		$(".dialog").css("display", "none" );
		$(".dialog-overlay").remove();
	}
	
	$(".dialog-link").click(function () {
		$("body").append('<div class="dialog-overlay"></div>');
		$(".dialog-overlay").css("width", $(document).width() ).css("height", $(document).height() );
		$(".dialog").css("display", "block" );
		
		return false;
	});
	
	$(".dialog-overlay").live("click", function() {
		dialog_close();
		return false;
	});
	
	$(".d-close").live("click", function() {
		dialog_close();
		return false;
	});
		
});
