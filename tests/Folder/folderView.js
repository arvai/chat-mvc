
var assert = require('chai').assert,
	sinon = require('sinon'),

	ChatView = require('../../libs/Folder/folderView'),

	testContent = require('./content/testcontent.html'),
	testUtils = require('../setup_utils');

suite('folderView', function() {
	setup(function() {
		testUtils.loadTestContent(testContent);

		//spy event handlers
		this.sinonSandbox = sinon.sandbox.create();
		this.sinonSandbox.spy(FolderView.prototype, 'onAddClick');
		this.sinonSandbox.spy(FolderView.prototype, 'onPhotoSaved');
		this.sinonSandbox.spy(FolderView.prototype, 'onPhotoError');

		this.folderView = new FolderView({
			el : '.folder'
		}).render();
	});

	teardown(function() {
		this.folderView.remove();
		this.sinonSandbox.restore();
	});

	test('photo save', function() {
		var handlerSpy = sinon.spy();

		this.folderView.on('photo:saved', handlerSpy);

		assert.isTrue(this.folderView.onAddClick.calledOnce);
		assert.isTrue(handlerSpy.calledOnce);
	});

	test('photo saved', function() {
		this.folderView.trigger('photo:saved');

		assert.isTrue(this.folderView.onPhotoSaved.calledOnce);
	});

	test('message error', function() {
		this.folderView.trigger('photo:error');

		assert.isTrue(this.folderView.onPhotoError.calledOnce);
	});
});