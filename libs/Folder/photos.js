var Backbone = require('backbone'),
    // Model
	Photo    = require('./photo'),

    Photos = Backbone.Collection.extend({
    	model : Photo
    });

module.exports = Photos;