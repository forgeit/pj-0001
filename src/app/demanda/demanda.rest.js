(function () {
	'use strict';

	angular
		.module('app.demanda')
		.factory('demandaRest', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST', '$httpParamSerializer'];

	function dataservice($http, $location, $q, configuracaoREST, $httpParamSerializer) {
		var service = {
			buscar: buscar,
			buscarTodos: buscarTodos,
			buscarArquivosPorDemandaFluxo: buscarArquivosPorDemandaFluxo,
			salvar: salvar,
			salvarFluxo: salvarFluxo
		};

		return service;

		function buscarArquivosPorDemandaFluxo(data) {
			return $http.get(configuracaoREST.url + 'demanda-fluxo/buscar-arquivos/' + data);
		}

		function buscar(data) {
			return $http.get(configuracaoREST.url + configuracaoREST.demanda + 'buscar/' + data);
		}

		function buscarTodos(data) {
			return $http.get(configuracaoREST.url + configuracaoREST.demanda);
		}

		function salvar(data) {
			return $http.post(configuracaoREST.url + configuracaoREST.demanda + 'salvar', data);
		}

		function salvarFluxo(data, id) {
			return $http.post(configuracaoREST.url + 'demanda-fluxo/salvar/' + id, data);
		}
	}
})();