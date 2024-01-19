/*global QUnit*/

sap.ui.define([
	"myproject/controller/FirstProject.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FirstProject Controller");

	QUnit.test("I should test the FirstProject controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
