(function () {
	'use strict';

	angular 
		.module('app.demanda')
		.controller('DemandaLista', DemandaLista);

	DemandaLista.$inject = [
		'$scope', 
		'demandaRest', 
		'tabelaUtils', 
		'controllerUtils'];

	function DemandaLista($scope, dataservice, tabelaUtils, controllerUtils) {
		/* jshint validthis: true */
		var vm = this;
		vm.tabela = {};
		vm.instancia = {};

		iniciar();

		function iniciar() {
			montarTabela();
		}

		function montarTabela() {
			criarOpcoesTabela();

			function carregarObjeto(aData) {
				controllerUtils.$location.path('nova-demanda/' + aData.id_pessoa);
				$scope.$apply();
			}

			function criarColunasTabela() {
				vm.tabela.colunas = tabelaUtils.criarColunas([
					['titulo', 'Título'], 
					['solicitante', 'Solicitante'], 
					['dt_criacao', 'Data de Criação'], 
					['prazo_final', 'Prazo de Entrega'], 
					['situacao', 'Situação Atual'], 
					['id_demanda', 'Ações', tabelaUtils.criarBotaoPadrao]
				]);
			}

			function criarOpcoesTabela() {
				vm.tabela.opcoes = tabelaUtils.criarTabela(ajax, vm, remover, 'data', carregarObjeto);
				criarColunasTabela();

				function ajax(data, callback, settings) {
					dataservice.buscarTodos(tabelaUtils.criarParametrosGet(data)).then(success).catch(error);

					function error(response) {
						controllerUtils.feed(controllerUtils.messageType.ERROR, 'Ocorreu um erro ao carregar a lista.');
					}

					function success(response) {
						callback(controllerUtils.getData(response, 'datatables'));
					}
				}
			}

			function remover(aData) {
				dataservice.remover(aData.id_pessoa).then(success).catch(error);

				function error(response) {
					controllerUtils.feed(controllerUtils.messageType.ERROR, 'Ocorreu um erro ao remover.');
				}

				function success(response) {
					controllerUtils.feedMessage(response);
					if (response.data.status == 'true') {
						tabelaUtils.recarregarDados(vm.instancia);
					}
				}
			}
		}
	}
})();