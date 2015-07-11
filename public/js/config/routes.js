angular.module('contactList')
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/',{
    templateUrl: '/view/contactlist.html',
    controller: 'contactListCtrl'
  })
  .when('/contact/:id',{
    templateUrl: '/view/contact.html',
    controller: 'contactCtrl',
  })
  .when('/contact',{
    templateUrl: '/view/contact.html',
    controller: 'contactCtrl'
  });
  $locationProvider.html5Mode(true);
});
