const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

DB_USERNAME = "mongouser"
DB_PASSWORD = "kzQQ69At2A627d35"
CONNECTION_STRING = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.e7sum.mongodb.net/board`

// Connect to mongodb instance
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Instantiate express app
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public'));
// Initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log('Ready to Go!');
});