angular.module('contactList').service('contactAPI', function ($http, config, $filter) {
  var
    contacts = [],
    loadedContacts = false,
    i = 0;

  this.current_contact = {};

  this.setCurrentContact = function (id) {
    for (i = 0; i < contacts.length; i += 1) {
      if (contacts[i]._id === id) {
        this.current_contact = contacts[i];
        break;
      }
    }
  };

  this.loadedContacts = function () {
    return loadedContacts;
  };

  this.getLocalContacts = function () {
    return contacts;
  };

  this.getContacts = function () {
    var response = $http.get(config.baseURL + '/contacts/');
    response.success(function (data, status) {
      if (status == 200) {
        //        contacts = data;
        contacts = $filter('orderBy')(data, 'name');
        loadedContacts = true;
      }
    });
    return response;
  };

  this.getContact = function (contact) {
    return $http.get(config.baseURL + '/contacts/' + contact._id);
  };

  this.addContact = function (contact) {
    var response = $http.post(config.baseURL + '/contacts/', contact);
    response.success(function (data, status) {
      if (status == 200) {
        contact._id = data._id;
        contacts.push(contact);
        contacts = $filter('orderBy')(contacts, 'name');
      }
    });
    return response;
  };

  this.updateContact = function (contact) {
    var response = $http.put(config.baseURL + '/contacts/' + contact._id, contact);
    response.success(function (data, status) {
      if (status == 200) {
        //        If it was ok, add the contact the the list
        for (i = 0; i < contacts.length; i++) {
          if (contacts[i]._id == contact._id) {
            contacts[i] = contact;
            contacts = $filter('orderBy')(contacts, 'name');
            break;
          }
        }
      }
    });
    return response;
  };

  this.deleteContact = function (contact) {
    var response = $http.delete(config.baseURL + '/contacts/' + contact._id);
    response.success(function (data, status) {
      if (status == 200) {
        if (!data.error) {

          for (i = 0; i < contacts.length; i++) {
            if (contacts[i]._id == contact._id) {
              contacts.splice(i, 1);
              contacts = $filter('orderBy')(contacts, 'name');
              break;
            }
          }
        }
      }
    });
    return response;
  };

  //Get all the contacts
//  this.getContacts();
});
