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

  var filterProducts = function($link){
    var min_score = $('input[name=reviews_score_min]').val() * 1;
    var min_amount = $('input[name=reviews_amount_min]').val() * 1;
    var min_shops = $('input[name=reviews_shops_min]').val() * 1;

    $('.c-product-list__item').each(function(){
      $p = $(this);
      if ($p.data('reviews-score') >= min_score
        && $p.data('reviews-amount') >= min_amount
        && $p.data('shops') >= min_shops
      ) {
        $p.show();

      } else {
        $p.hide();
      }
    });
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

  // Add new filter features
  $('.l-sidebar__filters.c-section-list').prepend('\
    <li class="c-filter c-section-list__item">\
      <form>\
        <div class="c-form-cell">\
          <label for="search-query-input" class="c-form-cell__label c-filter__title">\
            Heureka Reviews\
          </label>\
          \
          <div class="c-form-cell__input c-search-filter">\
            <div class="c-search-filter__cell">\
              <input class="e-input c-search-filter__input e-input--small" name="reviews_score_min" type="search" placeholder="Hodnocení min. %">\
            </div>\
            <button type="submit" class="e-button e-button--simple c-range-filter__button reviews_filter"><span>Ok</span></button>\
          </div>\
          \
          <div class="c-form-cell__input c-search-filter">\
            <div class="c-search-filter__cell">\
              <input class="e-input c-search-filter__input e-input--small" name="reviews_amount_min" type="search" placeholder="Počet hodnocení min.">\
            </div>\
            <button type="submit" class="e-button e-button--simple c-range-filter__button reviews_filter"><span>Ok</span></button>\
          </div>\
          \
          <div class="c-form-cell__input c-search-filter">\
            <div class="c-search-filter__cell">\
              <input class="e-input c-search-filter__input e-input--small" name="reviews_shops_min" type="search" placeholder="Počet obchodů min.">\
            </div>\
            <button type="submit" class="e-button e-button--simple c-range-filter__button reviews_filter"><span>Ok</span></button>\
          </div>\
          \
        </div>\
      </form>\
    </li>\
  ');

  $('.l-sidebar__filters.c-section-list button.reviews_filter').click(function(e){
    filterProducts($(this));
    e.preventDefault();
  });

})();
