// this code will be executed after page load
(function() {
  //
  // Init
  //
  $ = jQuery;

  //
  // Functions
  //
  refreshRating = function(){
    $('.c-product-list__item.o-grid__item').each(function(){
      $product = $(this);

      if ($product.find('h3 .rating').length) {
        return;
      }

      $a = $product.find('a.c-product__image-link')

      $product.find('h3').append('<div class="rating"></div>');
      $product.find('h3 .rating').load(
        $a.attr('href') + ' .c-top-position__rating'
      )
    })
  };

  isListLoaded = function(){
    return ($('.is-fetching').length == 0) || ($('.c-product-list__item.o-grid__item').length == 0);
  }

  refreshRatingManager = function(){
    if (!isListLoaded()) {
      setTimeout(refreshRatingManager, 1000);

    } else {
      refreshRating();

      $('.c-pagination a').click(function(){
        setTimeout(refreshRatingManager, 3000);
      });
    }
  };

  //
  // Do the job
  //
  refreshRatingManager();

})();
