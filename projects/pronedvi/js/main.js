var App={win:$(window),doc:$(document),is_mobile:detectmob(),ms_ie:/(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent),header_height:0,middle_height:0,max_mobile_width:768};function detectmob(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}function debounce(a,r,s){var l;return function(){var e=this,t=arguments,o=s&&!l;clearTimeout(l),l=setTimeout(function(){l=null,s||a.apply(e,t)},r),o&&a.apply(e,t)}}function fileBoxesInit(e){Array.prototype.forEach.call(e,function(e){var t=e.parentNode,o=t.innerHTML;e.addEventListener("change",function(e){(this.files&&1<this.files.length?(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):e.target.value.split("\\").pop())||(t.innerHTML=o)}),e.addEventListener("focus",function(){e.classList.add("has-focus")}),e.addEventListener("blur",function(){e.classList.remove("has-focus")})})}function setCursorPosition(e,t){if(t.focus(),t.setSelectionRange)t.setSelectionRange(e,e);else if(t.createTextRange){var o=t.createTextRange();o.collapse(!0),o.moveEnd("character",e),o.moveStart("character",e),o.select()}}function mask(e){var t="+7 (___) ___-__-__",o=0,a=t.replace(/\D/g,""),r=this.value.replace(/\D/g,"");a.length>=r.length&&(r=a),this.value=t.replace(/./g,function(e){return/[_\d]/.test(e)&&o<r.length?r.charAt(o++):o>=r.length?"":e}),"blur"==e.type?2==this.value.length&&(this.value=""):setCursorPosition(this.value.length,this)}function isValidEmailAddress(e){return new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i).test(e)}App.InputMasks=function(){Array.prototype.forEach.call(document.querySelectorAll(".js--phone:not(.masked)"),function(e,t){e.classList.add("masked"),e.addEventListener("input",mask,!1),e.addEventListener("focus",mask,!1),e.addEventListener("blur",mask,!1),e.focus(),e.blur()}),Array.prototype.forEach.call(document.querySelectorAll(".js--float-number:not(.masked)"),function(e,t){e.classList.add("masked");new IMask(e,{mask:Number,thousandsSeparator:"",radix:".",mapToRadix:[","]})}),Array.prototype.forEach.call(document.querySelectorAll(".js--int-number:not(.masked)"),function(e,t){e.classList.add("masked");new IMask(e,{mask:Number,thousandsSeparator:"",scale:0})}),Array.prototype.forEach.call(document.querySelectorAll(".js--price-number:not(.masked)"),function(e,t){e.classList.add("masked");new IMask(e,{mask:Number,thousandsSeparator:" ",scale:0})}),Array.prototype.forEach.call(document.querySelectorAll(".js--year:not(.masked)"),function(e,t){e.classList.add("masked");new IMask(e,{mask:Number,thousandsSeparator:"",scale:0})}),Array.prototype.forEach.call(document.querySelectorAll(".js--time:not(.masked)"),function(e,t){e.classList.add("masked");new IMask(e,{mask:"HH:MM",groups:{HH:new IMask.MaskedPattern.Group.Range([1,23]),MM:new IMask.MaskedPattern.Group.Range([1,59])}})}),Array.prototype.forEach.call(document.querySelectorAll(".js--time-seconds:not(.masked)"),function(e,t){e.classList.add("masked");new IMask(e,{mask:"HH:MM:SS",groups:{HH:new IMask.MaskedPattern.Group.Range([1,23]),MM:new IMask.MaskedPattern.Group.Range([1,59]),SS:new IMask.MaskedPattern.Group.Range([1,59])}})}),Array.prototype.forEach.call(document.querySelectorAll(".js--type-time:not(.masked)"),function(e,t){e.classList.add("masked"),$(e).on("change",function(){$(e).attr("value",$(e).val())})})},App.Forms=function(){function e(){this.render()}var t;e.prototype={el:{},render:function(){(t=this).resetForms(),t.fileBoxes()},checkBox:function(){App.doc.on("change",'input[type="checkbox"]',function(){$('input[type="checkbox"]').attr("disabled",!0),setTimeout(function(){$('input[type="checkbox"]').removeAttr("disabled")},1e3)})},resetForms:function(){App.doc.on("click",'[type="reset"]',function(){$(this).parents("form").find("select[multiple]").multiselect("deselectAll",!1),$(this).parents("form").find("select[multiple]").multiselect("updateButtonText")})},fileBoxes:function(){fileBoxesInit($(".inputfile"))}},new e},App.Selects=function(){$(".select:not(.decorated)").append('<i class="fas fa-angle-down"></i>').addClass("decorated"),$(".select select:not([multiple]):not([data-toggle]):not(.image-select)").chosen({disable_search_threshold:20,no_results_text:"Ничего не найдено"}),$(".select select.image-select").chosenImage({disable_search_threshold:20,no_results_text:"Ничего не найдено"}),$("select[multiple]").multiselect({buttonClass:"",nonSelectedText:"...",allSelectedText:"Все",selectAllText:" Выбрать все",nSelectedText:"выбрано",includeSelectAllOption:!0})},App.showPreloader=function(e){e?$(e).append('<div class="preloader"></div>'):$("body").append('<div class="preloader preloader--full"></div>')},App.removePreloader=function(e){$(".preloader").fadeOut(200,function(){$(this).remove()})},App.Sliders=function(e){},App.Filtr=function(e){function t(){this.render()}var o;t.prototype={el:{map_filtr_selector:".map-filtr-section",map_filtr_form_selector:".map-filtr-col-form",map_filtr_results_selector:".map-filtr-col-results",map_filtr_scroll_selector:".map-filtr-scroll",map_filtr_scroll_height:0,map_filtr_submit_selector:".map-filtr-col-form .btn--entire"},render:function(){o=this,$(o.el.map_filtr_selector).length&&(o.mapFiltrInit(),o.mapFiltrResize(),o.MapScrolling())},mapFiltrInit:function(){var e=debounce(function(){App.win.width()>App.max_mobile_width&&o.mapFiltrResize()},100);App.win.resize(e)},mapFiltrResize:function(){App.header_height=$(".header").outerHeight(),App.middle_height=$(window).outerHeight()-App.header_height,o.el.map_filtr_scroll_height=App.middle_height-$(o.el.map_filtr_submit_selector).outerHeight(),$(o.el.map_filtr_form_selector).height(App.middle_height),$(o.el.map_filtr_results_selector).height(App.middle_height),$(o.el.map_filtr_scroll_selector).height(o.el.map_filtr_scroll_height)},MapScrolling:function(){App.AddScrolling(o.el.map_filtr_scroll_selector)}},new t},App.ExtraFunctions=function(e){function t(){this.render()}var o;t.prototype={el:{},render:function(){(o=this).popOvers(),o.dropDowns(),o.dropDownsSelect(),o.filtersToggle(),o.chatScrolling(),o.textareaAutoheight(),o.chessPagesScrolling(),o.chessMainScrolling()},popOvers:function(){$('[data-toggle="tooltip"]').tooltip(),$('[data-toggle="popover"]').popover(),$(".catalog__item-status-bookmark").popover({placement:"top",html:!0,template:'<div class="popover favorite-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',content:function(){return $(this).hasClass("active")?'<i class="fas fa-minus"></i> Удалено из закладок':'<i class="fas fa-plus"></i> Добавлено в закладки'}}),$(".catalog__item-status-bookmark").each(function(e){$(this).attr("title",$(this).attr("data-original-title"))})},dropDowns:function(){$(document).on("click",".filtr-col-btn .dropdown-filtr",function(e){e.stopPropagation()})},dropDownsSelect:function(){$(document).on("mousedown","#dropdownObjectFiltr",function(e){e.preventDefault()})},filtersToggle:function(){$(document).on("click",".js--widthToggle",function(e){var t=$(this),o=$($(this).data("target"));t.prop("disabled",!0),o.hasClass("show")?o.animate({width:"toggle"},0,function(){o.removeClass("show"),t.prop("disabled",!1)}):o.animate({width:"toggle"},0,function(){o.addClass("show"),t.prop("disabled",!1)})})},chatScrolling:function(){$(".chat-block__discuss-scroll").length&&(App.AddScrolling(".chat-block__discuss-scroll"),$(".chat-block__discuss-scroll").scrollTop($(".chat-block__discuss-scroll").get(0).scrollHeight,-1))},textareaAutoheight:function(){function e(){var e=this;setTimeout(function(){e.style.cssText="height:auto; padding:0",e.style.cssText="height:"+e.scrollHeight+"px"},0)}for(var t=document.querySelectorAll(".js--textarea-autoheight"),o=0;o<t.length;o++)t[o].addEventListener("keydown",e)},chessPagesScrolling:function(){$(".chess-pages__scroll").length&&$(".chess-pages__scroll").niceScroll({cursorcolor:"#7a965a",cursorborder:"none",cursorwidth:"3px",cursorborderradius:"3px",horizrailenabled:!0,railvalign:"bottom",preservenativescrolling:!1,autohidemode:"leave"})},chessMainScrolling:function(){$(".chess-main__scroll").length&&$(".chess-main__scroll").niceScroll({cursorcolor:"#7a965a",cursorborder:"none",cursorwidth:"5px",cursorborderradius:"5px",horizrailenabled:!0,railvalign:"bottom",preservenativescrolling:!1,autohidemode:"leave",background:"#f8f9f9"})}},new t},App.RemoveScrolling=function(e){$(e).getNiceScroll().remove()},App.AddScrolling=function(e){$(e).niceScroll({cursorcolor:"#d6d7d9",cursorborder:"none",cursorwidth:"4px",cursorborderradius:"4px",railpadding:{top:0,right:1,left:0,bottom:0}})},App.DatePickers=function(){$(".js--datepicker:not(.decorated)").after('<i class="far fa-calendar green"></i>').addClass("decorated"),$(".js--datepicker.decorated").flatpickr({dateFormat:"d.m.Y"}),$(".js--timepicker:not(.decorated)").after('<i class="far fa-clock green"></i>').addClass("decorated"),$(".js--timepicker.decorated").flatpickr({enableTime:!0,noCalendar:!0,dateFormat:"H:i",time_24hr:!0})},App.DutyPopovers=function(){$(".calendar-line-day .calendar-line").popover({placement:"top",html:!0,trigger:"hover",template:'<div class="popover duty-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',content:function(){return'<img src="'+$(this).data("duty-photo")+'" ><div class="duty-popover__text">'+$(this).data("duty-name")+'<br><div class="duty-time gray">'+$(this).data("duty-type")+" <b>·</b> "+$(this).data("duty-time")+"</div></div>"}})},App.ChessPopovers=function(){$(".chess-apartment-link, .chess-apartment-cell").popover({placement:"auto",container:"body",html:!0,trigger:"hover",template:'<div class="popover chess-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',content:function(){var e=this;return"<p>"+$(e).data("chess-type")+'</p><p class="align-center"><img src="'+$(e).data("chess-photo")+'" ></p><div class="chess-popover__text">Площадь: '+$(e).data("chess-area")+" м<sup>2</sup> <br>Кухня: "+$(e).data("chess-kitchen")+" м<sup>2</sup> <br>Цена: "+$(e).data("chess-price")+" руб. <br></div>"}})},App.DesableLabel=function(e){$(e).popover({placement:"top",html:!0,trigger:"hover",template:'<div class="popover label-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',content:function(){return $(this).data("text")}}),$(e).addClass("label-disabled").find("input").attr("disabled",!0).attr("checked",!1)},App.EnableLabel=function(e){$(e).popover("dispose"),$(e).removeClass("label-disabled").find("input").attr("disabled",!1)},App.StackableTables=function(){$(".data-table table:not(.stacktable)").stacktable()},$(document).ready(function(){App.Forms(),App.InputMasks(),App.Selects(),App.Sliders(),App.Filtr(),App.ExtraFunctions(),flatpickr.localize(flatpickr.l10ns.ru),flatpickr.l10ns.default.firstDayOfWeek=1,App.DatePickers(),App.StackableTables()});