/**
 * Created by kangkaisen on 15/11/11.
 */
var mongoose = require('mongoose')
var config = require('../config')
require('./post')

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db_name, err.message)
        process.exit(1)
    }
})

exports.Post = mongoose.model('Post');
