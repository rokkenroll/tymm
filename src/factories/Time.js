(function() {

	"use strict";

	angular.module("app")

		.factory("Time", function(API) {

			var _time = {};

			_time.getTime = function(success, fail){
				API.get(
					"Processing/serverTime",
					function(data, response) {
						success(data);
						_time = (data);
					},
					function(error, response) {
						if(error.status == 404) { return fail('Time not found!'); }
						if(error.status == 500) { return fail('Internal server error!'); }

						fail(error.message);
					}
				);
			};

			return _time;
		})
})();
