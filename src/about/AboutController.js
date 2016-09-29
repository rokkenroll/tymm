(function() {

	"use strict";

	angular.module("app.about", ["ngMaterial", "ui.router"])

	.config(function($stateProvider) {
		$stateProvider.state("about", {
			url: "/about",
			templateUrl: "src/about/about.html",
			controller: "AboutController",
			controllerAs: "aboutController"
		});
	})

	.controller("AboutController", function() {
		var self = this;
	});

})();
