(function () {

	'use strict';

	angular
		.module('app.login')
		.controller('Login', Login);

	Login.$inject = ['loginRest', 'controllerUtils', 'AuthToken'];

	function Login(loginRest, controllerUtils, AuthToken) {
		var vm = this;

		vm.logar = logar;
		vm.usuario = {};

		function logar(formulario) {
			loginRest.logar(vm.usuario).then(success).catch(error);

			function error(response) {
				controllerUtils.feed(controllerUtils.messageType.ERROR, 'Ocorreu um erro ao entrar no sistema.');
			}

			function success(response) {
				controllerUtils.feedMessage(response);
				if (response.data.status == 'true') {
					AuthToken.setar(response.data.data.token);
					controllerUtils.$location.path('/');
				}
			}
		}
	}

})();