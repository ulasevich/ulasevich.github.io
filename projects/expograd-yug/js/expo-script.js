﻿function detectmob(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}function debounce(s,r,i){var o;return function(){var e=this,t=arguments,a=i&&!o;clearTimeout(o),o=setTimeout(function(){o=null,i||s.apply(e,t)},r),a&&s.apply(e,t)}}ExpoIndexMap=function(){if(void 0!==$.fn.mapster){function e(){this.render()}e.prototype={el:{map_img_selector:".footer-expo-scheme-img",area_selector:".expo-scheme-area",marker_class:"expo-scheme-area-marker",marker_selector:".expo-scheme-area-marker",area_z_index:$("area").length+5,id:"id",id:"id"},render:function(){$(this.el.map_img_selector).length&&(this_=this,this_.InitMap(),this_.ResizeMap())},InitMap:function(){var t=[];$(this_.el.area_selector).each(function(){var e=new Object;e.key=$(this).data("group"),e.render_highlight={},e.render_highlight.strokeColor=$(this).data("stroke-color"),e.render_select={},e.render_select.strokeColor=$(this).data("stroke-color"),t.push(e)}),$(this.el.map_img_selector).mapster({clickNavigate:!detectmob(),singleSelect:!0,mapKey:"data-group",render_highlight:{fillColor:"ffffff",stroke:!0,strokeColor:"1e0e00",strokeWidth:3,fillOpacity:.3},render_select:{fillColor:"ffffff",stroke:!0,strokeWidth:3,fillOpacity:.3},showToolTip:!0,toolTipClose:["area-mouseout"],areas:t,onStateChange:function(e){"select"==e.state&&($("."+e.key).hasClass("selected")?$("."+e.key).removeClass("selected"):$("."+e.key).addClass("selected")),1==e.selected?$("."+e.key).addClass("show"):$(this_.el.marker_selector).removeClass("show")}}),$(this_.el.area_selector).each(function(){var e=$(this).data("tooltip-x"),t=$(this).data("tooltip-y");$('<div class="'+this_.el.marker_class+" "+$(this).data("area")+" "+$(this).data("group")+'"></div>').insertBefore($("#expo-scheme-poly")),$("."+$(this).data("area")).css("left",e+"%").css("top",t+"%").css("z-index",this_.el.area_z_index--),$("."+$(this).data("area")).append($('<div class="area-marker-text animated zoomIn">'+$(this).data("title")+' <a class="area-marker-link" href="'+$(this).attr("href")+'">Подробнее</a></div>')),$("."+$(this).data("area")).append($('<div class="area-marker-hover animated fadeIn" style="background-color: #'+$(this).data("stroke-color")+'"></div>')),1==$(this).data("tip-left")&&$("."+$(this).data("area")).addClass("marker-left-tip")}),detectmob()&&($(this_.el.marker_selector).addClass("mobile-marker"),$(this_.el.map_img_selector).css("z-index","auto"))},ResizeMap:function(){function s(){var e=parseInt($(this_.el.map_img_selector).height())+parseInt($(".f-inside").height());$(".main-page .footer").css("margin-top","-"+e+"px").css("height",e+"px"),$(".main-page .middle").css("padding-bottom",e+"px")}var e=debounce(function(){s();var e=$(this_.el.map_img_selector),t=e.width(),a=e.height();e.mapster("resize",t,a,0)},250);$(this_.el.map_img_selector).load(function(){s()}),s(),$(window).resize(e),$(window).trigger("resize")}},new e}else console.log("required jquery.imagemapster(.min).js")},$(document).ready(function(){$("#l-slides").length&&$("#l-slides").cycle({fx:"fade",speed:1e3,timeout:6e3,next:"#l-s-next",prev:"#l-s-prev"}),$(".chosen-select").length&&$(".chosen-select").chosen({max_selected_options:5,disable_search_threshold:12}),ExpoIndexMap()});