var Backbone = require('backbone'),
    // Collection
    Photos = require('./photos'),

	folderController = Backbone.Marionette.Controller.extend({
	    
	    initialize: function() {
			this.photos = new Photos();

			this.photoView = new PhotoView({
				el         : '.folder',
				collection : this.photos
			}).render();
			
	        this.listenTo(this.folderView, 'add:photo', this.addPhoto);
	    },
	    
	    addPhoto: function(source) {
	        var collection = this.photos.add({ src: source }, {validate: true});
	        
	        if (collection) {
	            collection.save();
	            return this.photoView.trigger('photo:saved');
	        }
	        return this.photoView.trigger('photo:error');
	    }
	});
	
	module.exports = folderController;