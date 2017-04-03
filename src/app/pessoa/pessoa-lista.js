(function () {
	'use strict';

	angular 
		.module('app.pessoa')
		.controller('PessoaLista', PessoaLista);

	PessoaLista.$inject = [
		'$scope', 
		'pessoaRest', 
		'tabelaUtils', 
		'controllerUtils'];

	function PessoaLista($scope, dataservice, tabelaUtils, controllerUtils) {
		/* jshint validthis: true */
		var vm = this;
		vm.alterarPessoasLista = alterarPessoasLista;
		vm.filtro = null;
		vm.tabela = {};
		vm.tipoPessoaList = [];
		vm.instancia = {};

		iniciar();

		function alterarPessoasLista() {
			tabelaUtils.recarregarDados(vm.instancia);
		}

		function carregarTipoPessoaList() {
			return dataservice.buscarComboTipoPessoa().then(success).catch(error);

			function error(response) {
				return [];
			}

			function success(response) {
				vm.tipoPessoaList = controllerUtils.getData(response, 'ArrayList');
			}
		}

		function iniciar() {
			montarTabela();
			carregarTipoPessoaList();
		}

		function montarTabela() {
			criarOpcoesTabela();

			function carregarObjeto(aData) {
				controllerUtils.$location.path('nova-pessoa/' + aData.id_pessoa);
				$scope.$apply();
			}

			function criarColunasTabela() {
				vm.tabela.colunas = tabelaUtils.criarColunas([
					['nome', 'Nome'], 
					['email', 'E-mail'], 
					['celular', 'Celular'], 
					['tipo', 'Tipo'], 
					['id_pessoa', 'Ações', tabelaUtils.criarBotaoPadrao]
				]);
			}

			function criarOpcoesTabela() {
				vm.tabela.opcoes = tabelaUtils.criarTabela(ajax, vm, remover, 'data', carregarObjeto);
				criarColunasTabela();

				function ajax(data, callback, settings) {
					dataservice.buscarTodos(tabelaUtils.criarParametrosGet(data), vm.filtro).then(success).catch(error);

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