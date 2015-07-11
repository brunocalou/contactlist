angular.module("contactList")
.controller("contactCtrl", function($scope, $routeParams, contactAPI) {
  $scope.params = $routeParams;

  $scope.contact = angular.copy(contactAPI.current_contact);
  // $scope.contact.id = $routeParams;

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
    console.log($scope.contact);
  };

  $scope.cancel = function() {
    console.log("Cancel");
  };

  $scope.delete = function() {
    console.log("Delete");
    contactAPI.deleteContact($scope.contact);
    // console.log($scope.contact);
  };
});
