// this code will be executed after page load
(function() {
  $ = jQuery;

  $('.c-product-list__item.o-grid__item').each(function(){
    $product = $(this);
    $a = $product.find('a.c-product__image-link')

    $product.find('h3').append('<div class="rating"></div>');
    $product.find('h3 .rating').load(
      $a.attr('href') + ' .c-top-position__rating'
    )
  })

})();
