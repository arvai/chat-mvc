var Backbone  = require('backbone'),

    PhotoView = Backbone.Marionette.ItemView.extend({
        
        tagName: 'li',
        
        template: _.template('<%= src %>'),
        
        events: {
            'click' : 'onClick'
        },

        initialize: function() {
			PhotoView.__super__.initialize.apply(this, arguments);

			this.listenTo(this.model, 'change', this.render);
        },

        onClick: function() {
            this.model.destroy();
        },

		onRender : function() {
			this.$el.addClass('sent');
		}
    });
    
module.exports = PhotoView;