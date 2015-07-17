var mongo = require('mongodb'),
    ObjectId = require('mongodb').ObjectID,
    MongoClient = require('mongodb').MongoClient,
    db = '';


// Connect to the server
MongoClient.connect('mongodb://test:test@ds061721.mongolab.com:61721/heroku_gt4wxlmn', function(err, database) {
// MongoClient.connect('mongodb://localhost:27017/contactdb', function(err, get_db) {
  if(!err) {
    console.log("Connected to the database");
    db = database;
    db.collection('contacts', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'contacts' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });

  } else {
    console.log(err);
  }
});

exports.findById = function(req, res) {
    var id = {'_id': new ObjectId(req.params.id)};
    console.log('Retrieving contact: ' + req.params.id);
    db.collection('contacts', function(err, collection) {
        collection.findOne(id, function(err, item) {
            if(err) {
                console.log('Error retrieving contact' + err);
                res.send({'error': err});
            } else {
                console.log('Success');
                res.send(item);
            }
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('contacts', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addcontact = function(req, res) {
    var contact = req.body;
    console.log("Adding contact");
    db.collection('contacts', function(err, collection) {
        collection.insertOne(contact, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error adding contact' + err);
                res.send({'error': err});
            } else {
              console.log('Success');
              res.send({'_id':  result.ops[0]._id});
            }
        });
    });
};

exports.updatecontact = function(req, res) {
    var id = req.params.id;
    var contact = req.body;
    if(contact._id !== undefined) {
        delete contact._id;
    }

    console.log('Updating contact: ' + id);

    db.collection('contacts', function(err, collection) {
        collection.updateOne({'_id':new ObjectId(id)}, contact, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating contact: ' + err);
                res.send({'error': err});
            } else {
                console.log('Success');
                res.send({'_id': id});
            }
        });
    });
};

exports.deletecontact = function(req, res) {
    var id = req.params.id;
    console.log('Deleting contact: ' + id);
    db.collection('contacts', function(err, collection) {
        collection.deleteOne({'_id':new ObjectId(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error': err});
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
var populateDB = function() {

    var contacts  = [{
    'name': 'Alves',
    'tel': '99999-8888',
    'img': '/img/profile.png'
  }, {
    'name': 'Bruno Calou',
    'tel': '9999-9999',
    'img': '/img/profile.png'
  }, {
    'name': 'Bruno Alves',
    'tel': '9999-7777',
    'img': '/img/profile.png'
  }, {
    'name': 'Calou',
    'tel': '9999-8855',
    'img': '/img/profile.png'
  }, {
    'name': 'Mayara',
    'tel': '9999-5566',
    'img': '/img/profile.png'
  }];

    db.collection('contacts', function(err, collection) {
        collection.insert(contacts, {safe:true}, function(err, result) {});
    });

};
