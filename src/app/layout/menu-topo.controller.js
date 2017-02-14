(function () {
	'use strict';

	angular
		.module('app.layout')
		.controller('MenuTopoController', MenuTopoController);

	MenuTopoController.$inject = ['AuthToken', 'controllerUtils'];

	function MenuTopoController(AuthToken, controllerUtils) {
		var vm = this;
		vm.isLogged = isLogged;
		vm.sair = sair;

		function isLogged() {
			return !!AuthToken.ler();
		}

		function sair() {
			AuthToken.remover();
			controllerUtils.$location.path('/login');
		}
	}
	
})();