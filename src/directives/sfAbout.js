(function() {

	"use strict";

	angular.module("app.directives")

	.directive("sfAbout", function() {
		return {
			restrict: "E",
			scope: {
				id: "=",
				title: "=?",
				text: "=?",
				redirect: "=?",
				editing: "=?",
				owner: "=?",
				type: "="
			},
			bindToController: true,
			controller: function($state, API) {
				var self = this;

				self.redirect = !!self.redirect;
				
				self.editing = !!self.editing;
				
				var type = self.type;

				self.previousText = null;
				
				self.edit = function() {
					if(self.redirect) {
						return $state.go("profile-about");
					}
					window.Intercom('trackEvent', 'edit about on ' + self.intercomType());
					self.editing = true;

					self.previousText = self.text;
				};

				self.saving = false;
				
				self.intercomType = function() {
					var _type = self.type.toLowerCase();
					return _type.substring(0, _type.length - 1);
				};

				self.save = function() {
					if(self.saving) { return; }

					self.saving = true;

					API.put(
						type + "/" + self.id,
						{
							about: self.text
						},
						function(data, response) {
							self.saving = false;
							self.editing = false;

							self.text = data.about;
						},
						function(error, response) {
							self.saving = false;

							if(error.status == 404) { return console.error("Profile not found!"); }
							if(error.status == 500) { return console.error("Internal server error!"); }
							
							console.error(error.message);

							// TODO: display error message
						}
					);
				};

				self.cancel = function() {
					self.editing = false;

					self.text = self.previousText;
				};

				self.menuElements = [
					{
						title: "Edit",
						location: "menu",
						visible: function() {
							return !self.editing;
						},
						action: self.edit
					},
					{
						title: "Save",
						location: "bottom",
						visible: function() {
							return self.editing;
						},
						action: self.save
					},
					{
						title: "Cancel",
						location: "bottom",
						visible: function() {
							return self.editing;
						},
						action: self.cancel
					}
				];

				if(self.editing) {
					self.previousText = self.text;
				}
			},
			controllerAs: "sfAboutController",
			templateUrl: "src/directives/sf-about.html"
		};
	});

})();
