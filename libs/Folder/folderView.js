var Backbone  = require('backbone'),
    PhotoView = require('./photoView'), 

    FolderView = Backbone.Marionette.CompositeView.extend({
        childView: PhotoView,
        
        childViewContainer : '@ui.container',
        
        ui : {
            container : 'photos',
            addBtn    : '.add'
		},
		
		events: {
            'click @ui.addBtn' : 'onAddClick'
		},
		
		initialize: function() {
			FolderView.__super__.initialize.apply(this, arguments);

			this.listenTo(this, 'photo:saved', this.onPhotoSaved);
			this.listenTo(this, 'photo:error', this.onPhotoError);
		},
		
		onAddClick: function() {
		    var source = window.prompt('Enter the source of the image:');

		    this.trigger('add:photo', source);
		},
		
		onPhotoSaved: function() {
		    alert('Photo Saved!');
		},
		
		onPhotoError: function() {
		    alert('Photo Save was unsuccessful!');
		}
    });

module.exports = FolderView;