// source --> https://cityu.edu.mo/wp-content/themes/cityu/js/mobile-menu.js 

/**
 * 移动端菜单事件控制
 */

$(document).ready(function(){ 

/**
 * 主菜单
 */
$(".swiper-slide").on("click",".menu-button",function() {
  $(".menu-button").addClass("cross");
  $(".mobile-menu-area").slideDown(200);
});

$(".swiper-slide").on("click", ".cross", function(){
  $(".mobile-menu-area").slideUp(200);
  $(".menu-button").removeClass("cross");
});
// 加上展开箭头
$(".mobile-header-menu .sub-menu").parent().append("<span class='mobile-menu-expand'></span>");


$(".mobile-header-menu .menu-item").on("click", ".mobile-menu-expand", function(event) {
  event.stopPropagation();
  $(this).parent().children(".sub-menu").slideDown(200);
  $(this).parent().children(".mobile-menu-expand").addClass("expanded");
});

$(".mobile-header-menu .menu-item").on("click", ".mobile-menu-expand.expanded", function(event) {
  event.stopPropagation();
  $(this).parent().children(".sub-menu").slideUp(200);
  $(this).parent().children(".mobile-menu-expand").removeClass("expanded");
});


/**
 * 左侧菜单
 */

$(".site-content").on("click",".left-menu-button",function() {
  $(".left-menu-button").addClass("cross");
  $(".site-content .page-menu").slideDown(200);
});

$(".site-content").on("click", ".left-menu-button.cross", function(){
  $(".left-menu-button").removeClass("cross");
  $(".site-content .page-menu").slideUp(200);
});
// 加上展开箭头
$(".site-content .page-menu .sub-menu").parent().append("<span class='mobile-menu-expand'></span>");

// $(".site-content .page-menu").on("click", ".mobile-menu-expand", function(event) {
//   event.stopPropagation();
//   $(this).parent().children(".sub-menu").slideDown(200);
//   $(this).parent().children(".mobile-menu-expand").addClass("expanded");
// });
// $(".site-content .page-menu").on("click", ".mobile-menu-expand.expanded", function(event) {
//   event.stopPropagation();
//   $(this).parent().children(".sub-menu").slideUp(200);
//   $(this).parent().children(".mobile-menu-expand").removeClass("expanded");
// });

});