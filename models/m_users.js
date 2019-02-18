
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Promise = Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const schema = new Schema({
    name: { type: String, required: true },
    email: {type: String, unique: true, required: true},
    avatar: { type: String, default: ''},
    gender: { type: String, default: ''},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    status: {type: String, default: 'enabled'}
})

schema.index({
    name: 1
})

schema.pre('save', function (callback) {

    this.updated_at = Date.now()

    callback()
})

module.exports = mongoose.model('User', schema)
