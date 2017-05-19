! function(e, i, r) {
  "use strict";
  function t() {
    for (var e = [], i = "0123456789abcdef", r = 0; 36 > r; r++) e[r] = i.substr(Math.floor(16 * Math.random()), 1);
    e[14] = "4", e[19] = i.substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-";
    var t = e.join("");
    return t;
  }

  function a() {
    return {
      restrict: "E",
      transclude: !0,
      scope: {
        onReady: "&",
        slidesPerView: "=",
        slidesPerColumn: "=",
        spaceBetween: "=",
        parallax: "=",
        parallaxTransition: "@",
        paginationIsActive: "=",
        paginationClickable: "=",
        showNavButtons: "=",
        showScrollBar: "=",
        loop: "=",
        autoplay: "=",
        initialSlide: "=",
        containerCls: "@",
        wrapperCls: "@",
        paginationCls: "@",
        slideCls: "@",
        direction: "@",
        swiper: "=",
        overrideParameters: "=",
        slidesOffsetAfter: "="
      },
      controller: ["$scope", "$element", "$timeout", function(e, r, a) {
        var n = t();
        console.log(e);
        e.swiper_uuid = n;
        var s = {
          slidesPerView: e.slidesPerView || 1,
          slidesPerColumn: e.slidesPerColumn || 1,
          spaceBetween: e.spaceBetween || 0,
          direction: e.direction || "horizontal",
          loop: e.loop || !1,
          initialSlide: e.initialSlide || 0,
          showNavButtons: e.showNavButtons || !1,
          swiperId: e.swiper_uuid,
          index: e.$id
        };
        i.isUndefined(e.autoplay) || "number" != typeof e.autoplay || (s = i.extend({}, s, {
          autoplay: e.autoplay
        })), e.paginationIsActive === !0 && (s = i.extend({}, s, {
          paginationClickable: e.paginationClickable || !0,
          pagination: "#paginator-" + e.swiper_uuid
        })), e.showNavButtons === !0 && (s.nextButton = "#nextButton-" + e.swiper_uuid, s.prevButton = "#prevButton-" + e.swiper_uuid), e.showScrollBar === !0 && (s.scrollbar = "#scrollBar-" + e.swiper_uuid), e.overrideParameters && (s = i.extend({}, s, e.overrideParameters)), a(function() {
          var t = null;
          i.isObject(e.swiper) ? (e.swiper = new Swiper(r[0].firstChild, s), t = e.swiper) : t = new Swiper(r[0].firstChild, s), i.isUndefined(e.onReady) || e.onReady({
            swiper: t
          })
        })
      }],
      link: function(e, r) {
        var t = e.swiper_uuid,
          a = "paginator-" + t,
          n = "prevButton-" + t,
          s = "nextButton-" + t,
          l = "scrollBar-" + t,
          o = r[0];
        i.element(o.querySelector(".swiper-pagination")).attr("id", a), i.element(o.querySelector(".swiper-button-next")).attr("id", s), i.element(o.querySelector(".swiper-button-prev")).attr("id", n), i.element(r[0].querySelector(".swiper-scrollbar")).attr("id", l)
      },
      template: '<div class="swiper-container {{containerCls}}"><div class="parallax-bg" data-swiper-parallax="{{parallaxTransition}}" ng-show="parallax"></div><div class="swiper-wrapper {{wrapperCls}}" ng-transclude></div><div class="swiper-pagination {{paginationCls}}" ></div><div class="swiper-button-next hide-on-med-and-down" ng-show="showNavButtons"></div><div class="swiper-button-prev hide-on-med-and-down" ng-show="showNavButtons"></div><div class="swiper-scrollbar" ng-show="showScrollBar"></div></div>'
    };
  }

  function n() {
    return {
      restrict: "E",
      require: "^ksSwiperContainer",
      transclude: !0,
      scope: {
        sliderCls: "@"
      },
      template: '<div class="swiper-slide {{sliderCls}}" ng-transclude></div>',
      replace: !0
    };
  }

  i.module("ksSwiper", []).directive("ksSwiperContainer", a).directive("ksSwiperSlide", n);
}(window, angular, void 0);
