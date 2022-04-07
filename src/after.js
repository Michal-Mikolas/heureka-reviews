// this code will be executed after page load
(function() {

  //
  // Init
  //
  $ = jQuery;


  //
  // Functions
  //
  var refreshProductData = function($product) {
    var score = $product.find('.c-top-position__rating .c-rating-widget__value').text().replace(/[^\d]/g, '') * 1;
    var amount = $product.find('.c-top-position__rating .c-pipe-list__item.e-link').text().replace(/[^\d]/g, '') * 1;
    var shops = $product.find('.c-product__shops').text().replace(/[^\d]/g, '') * 1;

    $product.attr('data-reviews-score', score);
    $product.attr('data-reviews-amount', amount);
    $product.attr('data-shops', shops);
  };

  var refreshRating = function(){
    $('.c-product-list__item.o-grid__item').each(function(){
      var $product = $(this);

      if ($product.find('h3 .rating').length) {
        return;
      }

      $a = $product.find('a.c-product__image-link')

      $product.find('h3').append('<div class="rating"></div>');
      $product.find('h3 .rating').load(
        $a.attr('href') + ' .c-top-position__rating', 
        function(){ refreshProductData($product); }
      )

      refreshProductData($product);  // support for list view
    })
  };

  var isListLoaded = function(){
    return ($('.is-fetching').length == 0) || ($('.c-product-list__item.o-grid__item').length == 0);
  }

  var refreshRatingManager = function(){
    if (!isListLoaded()) {
      setTimeout(refreshRatingManager, 1000);

    } else {
      refreshRating();

      $('.c-pagination a').click(function(){
        setTimeout(refreshRatingManager, 3000);
      });
    }
  };

  var sortProducts = function($link){
    $('.c-subtabs__item').removeClass('is-active');
    $link.addClass('is-active');

    var $products = $('.c-product-list__item');
    $products.sort(function(a, b){
      return $(b).data($link.data('sort-by')) - $(a).data($link.data('sort-by'));
    });
    $(".c-product-list__items").html($products);
  };


  //
  // Do the job
  //

  // Add stars summary
  refreshRatingManager();
  
  // Add new sort features
  $('.c-subtabs__list').append('\
    <li class="c-subtabs__item">\
      <a rel="nofollow" class="c-subtabs__link sort-by" data-sort-by="reviews-score" href="#">\
        <span>Nejvíce hvězdiček</span>\
      </a>\
    </li>\
    <li class="c-subtabs__item">\
      <a rel="nofollow" class="c-subtabs__link sort-by" data-sort-by="reviews-amount" href="#">\
        <span>Největší počet hodnocení</span>\
      </a>\
    </li>\
    <li class="c-subtabs__item">\
      <a rel="nofollow" class="c-subtabs__link sort-by" data-sort-by="shops" href="#">\
        <span>Nejvíce obchodů</span>\
      </a>\
    </li>\
  ');

  $('.c-subtabs__item .sort-by').click(function(e){
    sortProducts($(this));
    e.preventDefault();
  });

})();
