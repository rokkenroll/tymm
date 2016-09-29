(function() {

	"use strict";

	angular.module("app")

	.filter("parseDate", function(Utilities) {
		return Utilities.parseDate;
	});

})();
