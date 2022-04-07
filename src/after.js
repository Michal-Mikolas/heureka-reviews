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
    $('.c-product-list__item.o-grid__item h3 .rating').remove();

    $('.c-product-list__item.o-grid__item').each(function(){
      $product = $(this);
      $a = $product.find('a.c-product__image-link')

      $product.find('h3').append('<div class="rating"></div>');
      $product.find('h3 .rating').load(
        $a.attr('href') + ' .c-top-position__rating'
      )
    })
  };

  isListLoaded = function(){
    return $('.is-fetching').length == 0;
  }
  isRatingLoaded = function(){
    return $('.c-product-list__item.o-grid__item h3 .rating').length > 0;
  }

  refreshRatingManager = function(){
    if (!isListLoaded()) {
      setTimeout(refreshRatingManager, 1000);

    // } else if (isRatingLoaded()) {
    //   return;

    } else {
      refreshRating();

      $('.c-pagination a').click(function(){
        setTimeout(refreshRatingManager, 1000);
      });
    }
  };

  //
  // Do the job
  //
  refreshRatingManager();

})();
