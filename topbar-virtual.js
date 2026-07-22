$(function() {
  // ===========================
  // ISOTOPE FILTERS - SEPARATE PER SECTION
  // ===========================

  // Initialize Isotope for each section separately
  var workGrid = $('#work-grid').isotope({ itemSelector: '.grid-item', percentPosition: true });
  var achievementsGrid = $('#achievements-grid').isotope({ itemSelector: '.grid-item', percentPosition: true });
  var certGrid = $('#certifications-grid').isotope({ itemSelector: '.grid-item', percentPosition: true });

  // WORK FILTER
  $('#work-filters').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $('#work-filters button').removeClass('selected');
    $(this).addClass('selected');
    workGrid.isotope({ filter: filterValue });
  });

  // ACHIEVEMENTS FILTER
  $('#achievements-filters').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $('#achievements-filters button').removeClass('selected');
    $(this).addClass('selected');
    achievementsGrid.isotope({ filter: filterValue });
  });

  // CERTIFICATIONS FILTER
  $('#certifications-filters').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $('#certifications-filters button').removeClass('selected');
    $(this).addClass('selected');
    certGrid.isotope({ filter: filterValue });
  });

  // ===========================
  // TESTIMONIAL CAROUSEL
  // ===========================
  $('.testi-carousel').owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    items: 1,
  });

  // ===========================
  // UI COMPONENTS
  // ===========================
  $('.vg-select').niceSelect();
  $('[data-toggle="tooltip"]').tooltip();
  new WOW().init();

  // ===========================
  // BACK TO TOP BUTTON
  // ===========================
  var backTop = $(".btn-back_to_top");
  $(window).scroll(function() {
    if($(document).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    } else if($(document).scrollTop() < 400) {
      backTop.css('visibility', 'hidden');
    }
  });
  backTop.click(function() {
    $('html').animate({ scrollTop: 0 }, 1000);
    return false;
  });

  // ===========================
  // TOGGLE SELECTED BUTTONS
  // ===========================
  $.fn.toggleSelected = function(options) {
    var defaults = $.extend({
      classes: 'selected',
      itemSelector: this.children(),
    });

    return this.each(function() {
      var o = defaults;
      var sel = o.itemSelector;
      sel.click(function() {
        var self = $(this);
        self.addClass(o.classes);
        self.siblings().removeClass(o.classes);
      });
    });
  };
  $('[data-toggle="selected"]').toggleSelected();
});


// ===========================
// STICKY NAVIGATION
// ===========================
$(document).ready(function () {
  var sticky = {
    $sticky: $('.sticky'),
    offsets: [],
    targets: [],
    stickyTop: null,

    set: function () {
      var self = this;
      var windowTop = Math.floor($(window).scrollTop());
      self.offsets = [];
      self.targets = [];
      self.stickyTop = self.$sticky.data('offset') ?
        self.$sticky.css('position', 'absolute').data('offset') :
        self.$sticky.css('position', 'absolute').offset().top;

      self.$sticky.find('a').map(function () {
        var $el = $(this),
        href = $el.data('target') || $el.attr('href'),
        $href = /^#./.test(href) && $(href);
        return $href && $href.length && $href.is(':visible') ? [[$href[0].getBoundingClientRect().top + windowTop, href]] : null;
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0]);
        self.targets.push(this[1]);
      });
    },

    update: function () {
      var self = this;
      var windowTop = Math.floor($(window).scrollTop());
      var $stickyLinks = self.$sticky.find('.navbar-nav .nav-item').removeClass('active');
      var stickyPosition = 'fixed';
      var currentIndex = 0;

      if ($(window).width() < 800 || $(window).height() < 500 || self.stickyTop > windowTop) {
        stickyPosition = 'absolute';
        self.$sticky.removeClass('floating');
      } else {
        for (var i = self.offsets.length; i--;) {
          if (windowTop >= self.offsets[i] - 2 && (self.offsets[i + 1] === undefined || windowTop <= self.offsets[i + 1] + 2)) {
            currentIndex = i;
            break;
          }
        }
      }

      self.$sticky.css({ 'position': stickyPosition });

      if(stickyPosition == 'absolute') {
        self.$sticky.removeClass('floating');
      } else {
        self.$sticky.addClass('floating');
      }

      $stickyLinks.eq(currentIndex).addClass('active');
    },

    init: function () {
      var self = this;
      $(window).on('resize', function () {
        self.set();
        self.update();
      });
      $(window).on('scroll', function () {
        self.update();
      });
      $(window).trigger('resize');
    }
  }

  if($('.navbar').hasClass('sticky')) {
    sticky.init();
  }
});


// ===========================
// SIDEPANEL, COLOR SWITCH, PAGE SCROLLING
// ===========================
$(document).ready(function() {
  $('#sideel').click(function() {
    $(this).parents('.config').toggleClass('active');
  });

  $('body').data('bodyClassList', '');

  $('.color-item').click(function() {
    var cls = $(this).data('class');
    $('body').attr('class', $('body').data('bodyClassList'));
    $('body').addClass(cls);
  });

  $('#change-page').on('change', function() {
    var url = $(this).val() + '.html';
    if($(this).val()) {
      window.location.assign(url);
    }
  });

  $('[data-animate="scrolling"]').each(function() {
    var self = $(this);
    var target = $(this).data('target') ? $(this).data('target') : $(this).attr('href');
    self.click(function(e) {
      $('body, html').animate({ scrollTop: $(target).offset().top }, 1000);
      return false;
    });
  });
});


// ===========================
// COUNTER SECTION
// ===========================
$(document).ready(function() {
  var counterInit = function() {
    if ( $('.section-counter').length > 0 ) {
      $('.section-counter').waypoint( function( direction ) {
        if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
          $('.number').each(function(){
            var $this = $(this),
              num = $this.data('number');
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step
              }, 5000
            );
          });
        }
      }, { offset: '95%' });
    }

    // Example progress bar animation (kept from your file)
    const progressBar = document.querySelector('.progress-bar');
    function updateProgressBar(percent) {
      progressBar.style.width = `${percent}%`;
      progressBar.setAttribute('aria-valuenow', percent);
      progressBar.textContent = `${percent}%`;
    }
    updateProgressBar(95);
  }
  counterInit();
});
