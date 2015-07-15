angular.module("contactList")
.controller("contactCtrl", function($scope, $routeParams, $location, contactAPI, contact) {
  $scope.params = $routeParams;

  $scope.contact = contact;
  $scope.show_errors = false;

  $scope.updateImage = function(file) {
    if (file[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $scope.contact.img = e.target.result;

        //Apply the changes, since it was not made by angular
        $scope.$apply();
      };

      reader.readAsDataURL(file[0]);
    }
  };

  $scope.save = function() {
    if(validateContact()) {
      if($scope.contact.id) {
        console.log("Update");
        contactAPI.updateContact($scope.contact);
      } else {
        console.log("Save new");
        contactAPI.addContact($scope.contact);
      }
      $location.path("/");
      console.log($scope.contact);
    }
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

  var validateContact = function() {
    // This function is used to start the validation just after the user
    // pressed the save button
    $scope.show_errors = $scope.contactform.$invalid;
    return !($scope.show_errors);
  };
});
