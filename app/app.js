var app = angular.module('tmoproject', ['ngRoute','ngAnimate','ui.bootstrap','credit-cards']);

app.config(function($routeProvider)
{
    console.log('Inside router =================');

      $routeProvider
      .when('/welcome', {
        templateUrl:  'views/welcome.html',
        controller: 'WelcomeController'
      }).when('/search',{
          templateUrl:  'views/search.html',
          controller: 'SearchController'
      }).when('/baseService',{
          templateUrl:  'views/baseService.html',
          controller: 'Hello'
      }).when('/searchProducts',{
          templateUrl:  'views/products.html',
          controller: 'ProductController'
      }).when('/searchAccessories',{
          templateUrl:  'views/accessories.html',
          controller: 'AccessoryController'
      }).when('/cart',{
          templateUrl:  'views/cart.html',
          controller: 'CartController'
      }).when('/personalInfo',{
          templateUrl:  'views/personalInfo.html',
          controller: 'PersonalInfoController'
      }).when('/shippingInfo',{
          templateUrl:  'views/shippingInfo.html',
          controller: 'ShippingInfoController'
      }).when('/searchItems',{
          templateUrl:  'views/searchItems.html',
          controller: 'searchController'
      }).when('/creditInfo',{
          templateUrl:  'views/creditInfo.html',
          controller: 'CreditController'
      }).when('/orderConfirm',{
          templateUrl:  'views/orderInfo.html',
          controller: 'OrderInfoController'
      }).otherwise({
        redirectTo: '/welcome'
      });
});

app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();
  });
});

