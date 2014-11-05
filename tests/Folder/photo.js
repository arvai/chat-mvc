var assert = require('chai').assert,
	withData = require('mocha-testdata'),
	fauxServer = require('backbone-faux-server'),

	testUtils = require('../setup_utils'),

	Photo = require('../../libs/Folder/photo');

suite('photo', function() {
	    var pattern = Photo.prototype.pattern,
		validSources = [
		    'http://www.johndoe.com/test.png'
		],
		invalidSources = [
            'http://www.johndoe',
            'johndoe.jgp',
            'http://www.johndoe.com/testtest.gif' // Wrong extension
		];

	setup(function() {
		this.photo = new Photo();
	});

	teardown(function() {
	});

	test('test validator without source', function() {
		assert.isFalse(this.photo.validate());
	});

	withData(validSources).test('test validator with valid source', function(testSource) {
		assert.isTrue(this.photo.validate({source : testSource}));
	});

	withData(invalidSources).test('test validator with invalid source', function(testSource) {
		assert.isFalse(this.photo.validate({source : testSource}));
	});

	test('save', function(done) {
		fauxServer.addRoute('save photo', this.photo.url, 'POST', function(context) {
			context.data.id = 15;
			return context.data;
		});

		this.photo.set({
			source : 'http://www.something.com/test.jpg'
		});

		this.photo.save(null, { success : function() {
		    assert.deepEqual(this.message.attributes, { id: 15, source: 'http://www.something.com/test.jpg'});
			done();
		}});
	});
});