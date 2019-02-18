
const mongoose = require('mongoose')

const config = require('../config')

module.exports = {

    connect() {

        mongoose.set('useCreateIndex', true);
        mongoose.connect(config.db.connection, { 
            useNewUrlParser: true 
        })
        .then(db => console.log('Database Helper: Db is connected'))
        .catch(err => console.log('Database Helper: Error', err))
    }
}