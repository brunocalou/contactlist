angular.module('contactList')
  .controller('contactListCtrl', function ($scope, $location, contactAPI) {

    $scope.contacts = contactAPI.getLocalContacts();

    if (!contactAPI.loadedContacts()) {
      contactAPI.getContacts().success(function () {
        $scope.contacts = contactAPI.getLocalContacts();
      });
    }

    //Holds the last first character used on the contact list
    $scope.separator = '';

    $scope.validateSeparator = function (name) {
      if (name) {
        var first_letter = name.charAt(0).toUpperCase();
        if ($scope.separator !== first_letter) {
          $scope.separator = first_letter;
          return true;
        }
        return false;
      }

    };

    $scope.editContact = function (contact) {
      $location.path("/contact/" + contact._id);
    };

    $scope.addContact = function () {
      $location.path("/contact/");
    };

    //Return if the loading button must be hidden
    $scope.validateLoadingButton = function () {
      return ($scope.contacts.length > 0);
    };

  });
