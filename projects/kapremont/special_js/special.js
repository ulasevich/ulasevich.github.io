var App={win:$(window),doc:$(document),max_mobile_width:1024,is_mobile:detectmob(),ms_ie:/(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent)};function detectmob(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}function debounce(o,i,s){var a;return function(){var e=this,t=arguments,n=s&&!a;clearTimeout(a),a=setTimeout(function(){a=null,s||o.apply(e,t)},i),n&&o.apply(e,t)}}function fileBoxesInit(e){Array.prototype.forEach.call(e,function(e){var n=e.parentNode,o=n.innerHTML;e.addEventListener("change",function(e){var t="";(t=this.files&&1<this.files.length?(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):e.target.value.split("\\").pop())?n.querySelector("span").innerHTML=t:n.innerHTML=o}),e.addEventListener("focus",function(){e.classList.add("has-focus")}),e.addEventListener("blur",function(){e.classList.remove("has-focus")})})}App.Share=function(){var e="Фонд МКД",t="toolbar=0,status=0,width=626,height=436";App.doc.on("click",".js-link--share",function(){switch($(this).data("share-type")){case"facebook":url="http://www.facebook.com/sharer.php?s=100",url+="&p[title]="+encodeURIComponent(e),url+="&p[url]="+encodeURIComponent($(this).data("share-url")),window.open(url,"",t);break;case"vkontakte":url="http://vkontakte.ru/share.php?",url+="url="+encodeURIComponent($(this).data("share-url")),url+="&title="+encodeURIComponent(e),url+="&noparse=true",window.open(url,"",t);break;case"twitter":url="http://twitter.com/share?",url+="text="+encodeURIComponent(e),url+="&url="+encodeURIComponent($(this).data("share-url")),url+="&counturl="+encodeURIComponent($(this).data("share-url")),window.open(url,"",t);break;case"odnoklassniki":url="http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1",url+="&st.comments="+encodeURIComponent(e),url+="&st._surl="+encodeURIComponent($(this).data("share-url")),window.open(url,"",t)}return!1})},App.Forms=function(){function e(){this.render()}var t;e.prototype={el:{datepicker_selector:".js-datepicker",datepicker_time_selector:".js-datepicker-time"},render:function(){(t=this).datepickerInit(),t.selectBox(),App.ms_ie||t.checkBox(),t.fileBoxes(),t.copyBlock(),t.Alerts()},datepickerInit:function(){if(void 0!==$.fn.pikaday){var e={previousMonth:"Предыдущий месяц",nextMonth:"Следующий месяц",months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],weekdays:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],weekdaysShort:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]};$(t.el.datepicker_time_selector).pikaday({firstDay:1,format:"DD.MM.YYYY HH:mm",yearRange:[1950,2005],use24hour:!0,showSeconds:!1,i18n:e}),$(t.el.datepicker_selector).pikaday({firstDay:1,format:"DD.MM.YYYY",yearRange:[1950,2005],showTime:!1,i18n:e})}else console.info("required pikaday.js (для выбора даты)")},selectBox:function(){$(".select-block").append('<span class="arr"></span>')},checkBox:function(){App.doc.on("change",'input[type="checkbox"]',function(){$('input[type="checkbox"]').attr("disabled",!0),setTimeout(function(){$('input[type="checkbox"]').removeAttr("disabled")},1e3)})},fileBoxes:function(){fileBoxesInit($(".inputfile"))},copyBlock:function(){App.doc.on("click",".js--copy-block",function(){var e=$(this).parent("div").prev(".copy-block").removeClass("copy-block").clone().hide();e.find("input").val(""),e.find(".file-box span").text(""),e.addClass("copy-block").insertBefore($(this).parent("div")).slideDown(),fileBoxesInit(e.find(".inputfile"))}),App.doc.on("click",".js--delete-block",function(){var e=$(this).parents(".additional-block");e.slideUp(function(){e.remove()})})},Alerts:function(){0<$(".alert.show").length&&$("body, html").animate({scrollTop:$(".alert").first().offset().top-140},500)}},new e},App.Media=function(){$("video, audio").mediaelementplayer({})},App.Special=function(){$(document).on("click",".font-link",function(e){return $(this).addClass("selected").siblings().removeClass("selected"),$("body").removeClass("spec-font-small spec-font-normal spec-font-big").addClass($(this).data("font-class")),$.cookie("spec-font",$(this).data("font-class"),{expires:1,path:"/"}),!1}),$(document).on("click",".color-link",function(e){return $(this).addClass("selected").siblings().removeClass("selected"),$("body").removeClass("spec-color-white spec-color-black spec-color-blue spec-color-brown").addClass($(this).data("color-class")),$.cookie("spec-color",$(this).data("color-class"),{expires:1,path:"/"}),!1}),$(".content p, .content div, .content span, .content font, .content b, .content strong, .content br, .content ul, .content ol, .content li, .content a").removeAttr("style"),$('input[type="checkbox"].spec-img-checkbox').change(function(){$(this).is(":checked")?($("body").removeClass($(this).data("img-class")),$.cookie("spec-img",$(this).data("img-class"),{expires:1,path:"/"})):($("body").addClass($(this).data("img-class")),$.cookie("spec-img","",{expires:1,path:"/"}))})},App.Print=function(){App.doc.on("click",".js-link--print",function(){return window.print?window.print():alert("Ваш браузер не поддерживает js-функцию печати. Нажмите Ctrl+P"),!1})},$(document).ready(function(){App.Share(),App.Forms(),App.Media(),App.Special(),App.Print()});