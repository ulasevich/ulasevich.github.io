$(document).ready(function(){	
	$(".inDialog").colorbox({inline:true, opacity:0.4});	
	
    $('input[name="reg_autologin"]').on('ifChanged', function(){
        $('#manual-login').toggle(!this.checked);
    });
	
	
	//--- для уведомлений корзины и списка сравнения ---//
	$("body").append(
        '<div class="shop-tip shop-tip-red shop-tip-add-cart">Товар добавлен в корзину</div>'+
        '<div class="shop-tip shop-tip-blue shop-tip-add-compare">Товар добавлен в список сравнения</div>'+
        '<div class="shop-tip shop-tip-blue shop-tip-remove-compare">Товар удалён из список сравнения</div>'
	);
	//добавление товара в корзину
	var tip_timer; //таймер плашки-уведомления корзины
	$( document ).on( "click", ".addToCart", function( e ) {
		clearTimeout(tip_timer);
		$('.shop-tip').css("opacity", 0);
		$('.shop-tip-add-cart').fadeTo( 400, 1, function() {
			hide_basket_tip();
		});
	});
	//добавление товара в таблицу сравнения
	var basket_btn_tip_timer; //таймер плашки-уведомления корзины
	$( document ).on( "click", ".compare", function( e ) {
		clearTimeout(tip_timer);
		$('.shop-tip').css("opacity", 0);
		if ($(this).hasClass("inCompare")) {
			$('.shop-tip-remove-compare').fadeTo( 400, 1, function() {
				hide_basket_tip();
			});
		} else {
			$('.shop-tip-add-compare').fadeTo( 400, 1, function() {
				hide_basket_tip();
			});
		}
	});
	function hide_basket_tip() {
		tip_timer = setTimeout(function() {
			$('.shop-tip').fadeTo( 400, 0, function() { } );
		}, 2000);
	}
	//--- для уведомлений корзины и списка сравнения ---//
	
	
				
});	

