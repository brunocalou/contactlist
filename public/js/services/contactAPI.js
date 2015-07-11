angular.module('contactList').service('contactAPI', function($http, config) {
  var contacts = [{
    'id': '0',
    'name': 'Alves',
    'tel': '992056272',
    'img': '/img/profile.png'
  }, {
    'id': '1',
    'name': 'Bruno Calou',
    'tel': '24256214',
    'img': '/img/profile.png'
  }, {
    'id': '2',
    'name': 'Bruno Alves',
    'tel': '992094993',
    'img': '/img/profile.png'
  }, {
    'id': '3',
    'name': 'Calou',
    'tel': '992056121',
    'img': '/img/profile.png'
  }, {
    'id': '4',
    'name': 'Mayara',
    'tel': '992094993',
    'img': '/img/profile.png'
  }];


  this.current_contact = {};

  this.getLocalContacts = function() {
    return contacts;
  };

  this.getContacts = function() {
    var response = $http.get(config.baseURL + '/contacts/');
    response.success(function(data, status) {
      if (status == 200) {
        contacts = data;
      }
    });
    return response;
  };

  this.getContact = function(contact) {
    return $http.get(config.baseURL + '/contacts/' + contact.id);
  };

  this.addContact = function(contact) {
    // var response = $http.post(config.baseURL + '/contacts/', contact);
    // response.success(function(data, status) {
      // if (status == 200) {
      console.log(contact);
      contact.img = "/img/profile.png";
      contact.id = Math.random() * 100 + 10;
        contacts.push(contact);
      // }
    // });
    // return response;
  };

  this.updateContact = function(contact) {
    // var response = $http.put(config.baseURL + '/contacts/' + contact.id, contact);
    // response.success(function(data, status) {
    //   if (status == 200) {
        //If it was ok, add the book the the list
        // $scope.books.push(response.data);
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].id == contact.id) {
            contacts[i] = contact;
            break;
          }
        }
    //   }
    // });
    // return response;
  };

  this.deleteContact = function(contact) {
    ///////////////////////////////////////////
    //  MUST IMPLEMENT THE ERROR ON THE SERVER
    ///////////////////////////////////////////

    // var response = $http.delete(config.baseURL + '/contacts/' + contact.id);
    // response.success(function(data, status) {
    //   if (status == 200) {
    //     if (!data.error) {

            for (var i = 0; i < contacts.length; i++) {
              if (contacts[i].id == contact.id) {
                contacts.splice(i, 1);
                break;
              }
            }
    //     }
    //   }
    // });
    // return response;
  };

  //Get all the contacts
  this.getContacts();
});
