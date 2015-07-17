angular.module("contactList")
  .controller("contactCtrl", function ($scope, $routeParams, $location, contactAPI, contact) {
    $scope.params = $routeParams;

    $scope.contact = contact;
    $scope.show_errors = false;
    $scope.server = {
      'error': false,
      'status': 0,
      'msg' : ''
    }
    
    var goBack = function () {
      $location.path("/");
    };
  
    var handleResponse = function (data, status) {
      if (status == 200) {
        if (!data.error) {
          goBack();
        } else {
          $scope.server.error = true;
          $scope.server.msg = data.error;
        }
      } else {
        $scope.server.error = true;
        $scope.server.msg = "Failed to reach the server";
      }
      $scope.server.status = status;
    };

    $scope.updateImage = function (file) {
      if (file[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $scope.contact.img = e.target.result;

          //Apply the changes, since it was not made by angular
          $scope.$apply();
        };

        reader.readAsDataURL(file[0]);
      }
    };

    $scope.save = function () {
      if (validateContact()) {
        if ($scope.contact._id) {
          console.log("Update");
          contactAPI.updateContact($scope.contact)
            .error(handleResponse)
            .success(handleResponse);
//          .finally(goBack);
        } else {
          console.log("Save new");
          contactAPI.addContact($scope.contact)
            .error(handleResponse)
            .success(handleResponse);
        }
      }
    };

    $scope.cancel = function () {
      console.log("Cancel");
      goBack();
    };

    $scope.delete = function () {
      console.log("Delete");
      contactAPI.deleteContact($scope.contact)
        .error(handleResponse)
        .success(handleResponse);
    };

    var validateContact = function () {
      // This function is used to start the validation just after the user
      // pressed the save button
      $scope.show_errors = $scope.contactform.$invalid;
      return !($scope.show_errors);
    };
  });