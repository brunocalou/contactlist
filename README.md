# contactlist
Contact List application for the Advanced Programming class at UFRJ

![contactlist](https://cloud.githubusercontent.com/assets/5948318/8790080/dc1bc152-2f1f-11e5-9a4f-a0009fc0fe27.png)

It's hosted at https://pacontactlist.herokuapp.com/

## Build and run
### Prerequisites
* [Nodejs](https://nodejs.org/)

After installing the prerequisites, open the terminal and follow the steps:
```bash
> cd <my project folder>
> node server.js
```
Open your browser and go to localhost:3000


### Local database
If you want to use a local database, install the [Mongodb](https://www.mongodb.org/), open the terminal and follow the steps

```bash
> cd <your database location>
> mkdir data
> mongod --dbpath data
```
Keep the terminal working and open another one
```bash
> mongo
> use contactdb
> exit
```

Go to <your project folder>/routes/contacts.js, comment the connect line and uncomment the next line, like this
```javascript
// MongoClient.connect('mongodb://bruno:abracadabra@ds047632.mongolab.com:47632/heroku_krg0l65z', function (err, database) {
MongoClient.connect('mongodb://localhost:27017/contactdb', function(err, get_db) {
```
After that, run the server

