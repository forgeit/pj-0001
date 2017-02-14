(function () {
	'use strict';

	angular
		.module('app.layout')
		.controller('MenuTopoController', MenuTopoController);

	MenuTopoController.$inject = ['AuthToken'];

	function MenuTopoController(AuthToken) {
		var vm = this;
		vm.isLogged = isLogged;

		function isLogged() {
			return !!AuthToken.ler();
		}
	}
	
})();