var assert = require('chai').assert,
	sinon = require('sinon'),
	_ = require('underscore'),
	fauxServer = require('backbone-faux-server'),

	testUtils = require('../setup_utils'),

	Photo = require('../../libs/Folder/photo'),
	PhotoView = require('../../libs/Folder/photoView');

suite('photoView', function() {
	setup(function() {
		this.sandbox = testUtils.loadTestContent('');

		//spy event handlers
		this.sinonSandbox = sinon.sandbox.create();
		this.sinonSandbox.spy(PhotoView.prototype, 'onClick');
		this.sinonSandbox.spy(Photo.prototype, 'destroy');

		this.photo = new Photo();
		this.photoView = new PhotoView({
			model : this.photo
		});
		this.photoView.$el.appendTo(this.sandbox);
	});

	teardown(function() {
		this.photo.destroy();
		this.sinonSandbox.restore();
	});

	test('photoView renders default', function() {
		this.photoView.render();
		var photoItem = this.sandbox.find('li');
		assert.lengthOf(photoItem, 1);
		assert.strictEqual(photoItem.html(), this.photoView.template(this.photo.attributes));
	});

	test('photoView can destroys', function() {
		this.photoView.render();
		this.photoView.remove();
		var photoItem = this.sandbox.find('li');
		assert.lengthOf(photoItem, 0);
		assert.strictEqual(this.sandbox.html(), '');
	});

	test('photoItem renders photo', function() {
		this.photo.set({
			source : 'http://www.test.hu/test.png'
		});
		this.photoView.render();
		var photoItem = this.sandbox.find('li');
		assert.lengthOf(photoItem, 1);
		assert.strictEqual(photoItem.html(), this.photoView.template(this.photo.attributes));
	});

	test('photoView renders sent photo', function(done) {
		//set server
		fauxServer.addRoute('save photo', this.photo.url, 'POST', function(context) {
			context.data.id = 1;
			return context.data;
		});

		//change message
		this.photo.set({
			source : 'http://www.test.hu/test.png'
		});
		this.photoView.render();

		var photoItem = this.sandbox.find('li');
		assert.lengthOf(photoItem, 1);

		this.photo.save(null, { success: function() {
            assert.strictEqual(photoItem.html(), this.photoView.template(this.photo.attributes));
			assert.isTrue(photoItem.hasClass('sent'));
			done();
		} });
	});

	test('click destroys model', function() {
		this.photoView.render();
		this.photoView.$el.click();

		assert.isTrue(this.photoView.onClick.calledOnce);
		assert.isTrue(this.photo.destroy.calledOnce);
	});
});