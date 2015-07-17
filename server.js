var express = require('express'),
  contact = require('./routes/contacts'),
  http = require('http'),
  bodyParser = require('body-parser');

var path = require('path');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/contacts', contact.findAll);
app.get('/contacts/:id', contact.findById);
app.post('/contacts', contact.addcontact);
app.put('/contacts/:id', contact.updatecontact);
app.delete('/contacts/:id', contact.deletecontact);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
