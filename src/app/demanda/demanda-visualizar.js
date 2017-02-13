(function () {

	'use strict';

	angular.module('app.demanda')
		.controller('DemandaVisualizar', DemandaVisualizar);

	DemandaVisualizar.$inject = [
		'controllerUtils',
		'$scope',
		'FileUploader',
		'configuracaoREST',
		'demandaRest',
		'pessoaRest',
		'situacaoRest'];

	function DemandaVisualizar(controllerUtils, $scope, FileUploader, configuracaoREST, demandaRest, pessoaRest, situacaoRest) {
		/* jshint validthis: true */
		var vm = this;

		vm.demanda = {};
		vm.destinatarioList = [];
		vm.situacaoList = [];
		vm.habilitarDesabilitar = habilitarDesabilitar;

		iniciar();

		function carregar() {
			return demandaRest.buscar(controllerUtils.$routeParams.id).then(success).catch(error);

			function error(response) {
				return controllerUtils.promise.criar(false, []);
			}

			function success(response) {
				var array = controllerUtils.getData(response, 'DemandaDto');
				return controllerUtils.promise.criar(true, array);
			}
		}

		function carregarDestinatarios() {
			return pessoaRest.buscarCombo().then(success).catch(error);

			function error(response) {
				return controllerUtils.promise.criar(false, []);
			}

			function success(response) {
				var array = controllerUtils.getData(response, 'ArrayList');
				return controllerUtils.promise.criar(true, array);
			}
		}

		function carregarSituacao() {
			return situacaoRest.buscarCombo().then(success).catch(error);

			function error(response) {
				return controllerUtils.promise.criar(false, []);
			}

			function success(response) {
				var array = controllerUtils.getData(response, 'ArrayList');
				return controllerUtils.promise.criar(true, array);
			}
		}

		function habilitarDesabilitar() {
			vm.uploadHabilitado = !vm.uploadHabilitado;
		}

		function inicializarObjetos(values) {
			if (values[0].exec) {
				vm.demanda = values[0].objeto;
			} else {
				controllerUtils.feed(controllerUtils.messageType.ERROR, 'Ocorreu um erro ao carregar a demanda.');	
			}

			if (values[1].exec) {
				vm.destinatarioList = values[1].objeto;
			} else {
				controllerUtils.feed(controllerUtils.messageType.ERROR, 'Ocorreu um erro ao carregar os destinatários.');	
			}

			if (values[2].exec) {
				vm.situacaoList = values[2].objeto;
			} else {
				controllerUtils.feed(controllerUtils.messageType.ERROR, 'Ocorreu um erro ao carregar as situações');	
			}
		}

		function iniciar() {
			var promises = [];

			promises.push(carregar());
			promises.push(carregarDestinatarios());
			promises.push(carregarSituacao());

			return controllerUtils.ready(promises).then(function (values) {
				inicializarObjetos(values);
			});	
		}

		function voltar() {
			controllerUtils.$location.path('demanda');
		}
	}

})();