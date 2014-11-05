var Backbone = require('backbone'),

    Photo = Backbone.Model.extend({
        
        pattern: '((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))',
        
        url: '/folder/photo',
        
        defaults: {
            id: null,
            src: ''
        },
        
        validate: function(obj) {
            if (_.isUndefined(obj)) {
                return false;
            }
            if (typeof obj.src !== 'undefined') {
                return false;
            }
            if (!obj.src.match(this.pattern)) {
                return false;
            }
            var extensionStartIndex = obj.src.lastIndexOf('.'),
                extension = obj.src.slice(extensionStartIndex);
            
            if (extension !== '.jpg' && extension !== '.png') {
                return false;
            }
            
            return true;
        }
    });