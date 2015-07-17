var mongo = require('mongodb'),
  ObjectId = require('mongodb').ObjectID,
  MongoClient = require('mongodb').MongoClient,
  db = '';


// Connect to the server
MongoClient.connect('mongodb://bruno:abracadabra@ds047632.mongolab.com:47632/heroku_krg0l65z', function (err, database) {
  // MongoClient.connect('mongodb://localhost:27017/contactdb', function(err, get_db) {
  if (!err) {
    console.log("Connected to the database");
    db = database;
    db.collection('contacts', {
      strict: true
    }, function (err, collection) {
      if (err) {
        console.log("The 'contacts' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });

  } else {
    console.log(err);
  }
});

exports.findById = function (req, res) {
  var id = {
    '_id': new ObjectId(req.params.id)
  };
  console.log('Retrieving contact: ' + req.params.id);
  db.collection('contacts', function (err, collection) {
    collection.findOne(id, function (err, item) {
      if (err) {
        console.log('Error retrieving contact' + err);
        res.send({
          'error': err
        });
      } else {
        console.log('Success');
        res.send(item);
      }
    });
  });
};

exports.findAll = function (req, res) {
  db.collection('contacts', function (err, collection) {
    collection.find().toArray(function (err, items) {
      res.send(items);
    });
  });
};

exports.addcontact = function (req, res) {
  var contact = req.body;
  console.log("Adding contact");
  db.collection('contacts', function (err, collection) {
    collection.insertOne(contact, {
      safe: true
    }, function (err, result) {
      if (err) {
        console.log('Error adding contact' + err);
        res.send({
          'error': err
        });
      } else {
        console.log('Success');
        res.send({
          '_id': result.ops[0]._id
        });
      }
    });
  });
};

exports.updatecontact = function (req, res) {
  var id = req.params.id;
  var contact = req.body;
  if (contact._id !== undefined) {
    delete contact._id;
  }

  console.log('Updating contact: ' + id);

  db.collection('contacts', function (err, collection) {
    collection.updateOne({
      '_id': new ObjectId(id)
    }, contact, {
      safe: true
    }, function (err, result) {
      if (err) {
        console.log('Error updating contact: ' + err);
        res.send({
          'error': err
        });
      } else {
        console.log('Success');
        res.send({
          '_id': id
        });
      }
    });
  });
};

exports.deletecontact = function (req, res) {
  var id = req.params.id;
  console.log('Deleting contact: ' + id);
  db.collection('contacts', function (err, collection) {
    collection.deleteOne({
      '_id': new ObjectId(id)
    }, {
      safe: true
    }, function (err, result) {
      if (err) {
        res.send({
          'error': err
        });
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(result);
      }
    });
  });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {

  var contacts = [{
    'name': 'Black Widow',
    'tel': '99999-9999',
    'img': '/img/samples/black_widow.jpg'
  }, {
    'name': 'Captain America',
    'tel': '99999-9988',
    'img': '/img/samples/captain_america.jpg'
  }, {
    'name': 'Hawk Eye',
    'tel': '99999-9977',
    'img': '/img/samples/hawk_eye.jpg'
  }, {
    'name': 'Hulk',
    'tel': '99999-9966',
    'img': '/img/samples/hulk.jpg'
  }, {
    'name': 'Iron Man',
    'tel': '99999-9955',
    'img': '/img/samples/iron_man.jpg'
  }, {
    'name': 'Nick Fury',
    'tel': '99999-9944',
    'img': '/img/samples/nick_fury.jpg'
  }, {
    'name': 'Thor',
    'tel': '99999-9933',
    'img': '/img/samples/thor.jpg'
  }, ];

  db.collection('contacts', function (err, collection) {
    collection.insert(contacts, {
      safe: true
    }, function (err, result) {});
  });

};
