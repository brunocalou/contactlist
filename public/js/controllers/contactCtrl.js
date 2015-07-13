angular.module("contactList")
.controller("contactCtrl", function($scope, $routeParams, $location, contactAPI, contact) {
  $scope.params = $routeParams;

  $scope.contact = contact;

  //MUST SAVE THE RECEIVED CONTACT ON THE CONTACT VARIABLE (BECAUSE
  //WE DONT HAVE THE CONTACT ID)

  $scope.save = function() {
    if($scope.contact.id) {
      console.log("Update");
      contactAPI.updateContact($scope.contact);
    } else {
      console.log("Save new");
      contactAPI.addContact($scope.contact);
    }
    $location.path("/");
    console.log($scope.contact);
  };

  $scope.cancel = function() {
    console.log("Cancel");
    $location.path("/");
  };

  $scope.delete = function() {
    console.log("Delete");
    contactAPI.deleteContact($scope.contact);
    $location.path("/");
  };
});
