var assert = require('chai').assert,
	sinon = require('sinon'),
	fauxServer = require('backbone-faux-server'),

	ChatController = require('../../libs/Folder/folderController'),

	testContent = require('./content/testcontent.html'),
	testUtils = require('../setup_utils');

suite('chatController', function() {
	setup(function() {
		testUtils.loadTestContent(testContent);

		this.sinonSandbox = sinon.sandbox.create();
		this.sinonSandbox.spy(FolderController.prototype, 'addPhoto');

		this.folderController = new FolderController();

		this.folderView = this.folderController.folderView;
		// Collection
		this.photos = this.folderController.photos;
	});

	teardown(function() {
		this.folderView.remove();
		this.sinonSandbox.restore();
	});

	test('add photo event', function() {
		this.folderView.trigger('add:photo');
		assert.isTrue(this.folderController.addPhoto.calledOnce);
	});

	test('add photo success', function() {
		fauxServer.addRoute('save photo', '/folder/photos', 'POST', function(context) {
			context.data.id = 15;
			return context.data;
		});

		var spy = sinon.spy();
		this.folderView.on('photo:saved', spy);

		this.folderController.addPhoto('http://www.johndoe.hu/x.jpg');

		assert.isTrue(spy.calledOnce);
		assert.lengthOf(this.photos.models, 1);
	});

	test('add photo error', function() {
		var spy = sinon.spy();
		this.folderView.on('photo:error', spy);

		this.folderController.addPhoto('invalidfilename');

		assert.isTrue(spy.calledOnce);
		assert.lengthOf(this.photos.models, 0);
	});
});