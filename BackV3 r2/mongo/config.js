const mongoose = require('mongoose');
require('dotenv').config()

var user = process.env.MONGO_USERNAME
var pass = process.env.MONGO_PASSWORD
var url = process.env.MONGO_URL
var db = process.env.MONGO_DB

mongoose.connect(`mongodb://${user}:${pass}@${url}/${db}?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('[db] conectada con exito')
    })
    .catch(err => console.log('[db] ', err));

module.exports = mongoose;