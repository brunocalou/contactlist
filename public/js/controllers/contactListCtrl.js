angular.module('contactList')
  .controller('contactListCtrl', function($scope, $location, contacts) {

    $scope.contacts = contacts;

    //Holds the last first character used on the contact list
    $scope.separator = '';
    $scope.validateSeparator = function (name) {
      var first_letter = name.charAt(0).toUpperCase();
      if($scope.separator != first_letter) {
        $scope.separator = first_letter;
        return true;
      }
      return false;
    };

    $scope.editContact = function(contact) {
      $location.path("/contact/" + contact.id);
    };

    $scope.addContact = function() {
      $location.path("/contact/");
    };
  });
