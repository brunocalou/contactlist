angular.module('contactList')
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/',{
    templateUrl: '/view/contactlist.html',
    controller: 'contactListCtrl',
    resolve: {
      contacts: function(contactAPI) {
        return contactAPI.getLocalContacts();
      }
    }
  })
  .when('/contact/:id',{
    templateUrl: '/view/contact.html',
    controller: 'contactCtrl',
    resolve: {
      contact: function(contactAPI, $route) {
        contactAPI.setCurrentContact($route.current.params.id);
        return angular.copy(contactAPI.current_contact);
      }
    }
  })
  .when('/contact',{
    templateUrl: '/view/contact.html',
    controller: 'contactCtrl',
    resolve: {
      contact: function() {
        return {
          'img': '/img/profile.png'
        };
      }
    }
  }).otherwise({
    redirectTo: "/"
  });
  $locationProvider.html5Mode(true);
});
