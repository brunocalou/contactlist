angular.module('contactList')
  .controller('contactListCtrl', function($scope, contactAPI) {

    $scope.contacts = contactAPI.getLocalContacts();

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

    $scope.setCurrentContact = function(contact) {
      contactAPI.current_contact = contact;
    };

    console.log(contactAPI.current_contact);
  });
