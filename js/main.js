$(document).ready(function() {

  var myApp = (function () {

    var lastScrollTop = 0;

    var init = function(){
      _setUpListners();
    };

    var _setUpListners = function () { //прослушка событий
      _navPosition();
      $(window).load(_showingUp);
      $('.scroll').click(_scrollingMenu);
      _rehashSubpages();
    };

    var _is_touch_device = function () { // определяем тач устр-во
          return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
      };
      
      var _navPosition = function() {
        if($(window).outerWidth() < 1024 || _is_touch_device())
      {
        $('nav').css('position', 'absolute');
      } 
      else { 
        $(window).on('scroll', _nav_float); 
        if($(this).scrollTop() > 0) $(window).on('load', _nav_float);
      }
      };

      var _nav_float = function (e) { //плавающее исчезающее меню
        e.preventDefault();
        
      var y = $(this).scrollTop();
      var stickyMenuTop = $('.navbar').outerHeight();

      if (y > lastScrollTop ) {
        $('nav').addClass('nav-slideUp').removeClass('nav-slideDown').removeClass('transparent');
      } else {
        $('nav').removeClass('nav-slideUp').addClass('nav-slideDown');
        if(y <= stickyMenuTop) $('nav').addClass('transparent');
      }

      lastScrollTop = y;
    };

    var _showingUp = function() { //всплывающее описание сайта
      $("header h3").addClass('showingUp');
    };

      var _scrollingMenu = function() {
      event.preventDefault();
          url = $(this).attr('href');
          console.log(url);
          console.log(location.pathname);
          distance = $(url).offset().top;
          $('html,body').animate({
              scrollTop: distance
          }, 1500);
          _rehash(url);
          if ($('.navbar-toggle').css('display') != 'none') {
              $(".navbar-collapse").collapse('hide');
          }

    };
  
    
    var _rehash = function (url) {
        currentHash = window.location.hash;
        if (url != currentHash) {
            if (history.pushState) {
                history.pushState(null, null, url);
            } else {
                location.hash = url;
            }
        }
      }

    return {
      init: init
    };

  })();

  myApp.init();

});