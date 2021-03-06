(function () {
	'use strict';

	var core = angular.module('app.core');

	var configuracaoREST = {
		demanda: 'demanda/',
		pessoa: 'pessoa/',
		tipoDemanda: 'tipo-demanda/',
		// url: 'http://localhost/mathias/server/'
		url: 'http://sistema.mathiasbertram.com.br/server/'
	};

	var datepicker = {
	    dateFormat: 'dd/mm/yy',
	    dayNames: ['Domingo', 'Segunda', 'Terça','Quarta', 'Quinta', 'Sexta','Sábado'],
	    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
	    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua','Qui', 'Sex', 'Sáb', 'Dom'],
	    monthNames: ['Janeiro', 'Fevereiro', 'Março','Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro','Outubro', 'Novembro', 'Dezembro'],
	    monthNamesShort: ['Jan', 'Fev', 'Mar','Abr', 'Mai', 'Jun','Jul', 'Ago', 'Set','Out', 'Nov', 'Dez'],
	    nextText: 'Próximo',
	    prevText: 'Anterior',
	    maxDate: "-0D"
	};

	var datepickerSemLimite = {
	    dateFormat: 'dd/mm/yy',
	    dayNames: ['Domingo', 'Segunda', 'Terça','Quarta', 'Quinta', 'Sexta','Sábado'],
	    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
	    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua','Qui', 'Sex', 'Sáb', 'Dom'],
	    monthNames: ['Janeiro', 'Fevereiro', 'Março','Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro','Outubro', 'Novembro', 'Dezembro'],
	    monthNamesShort: ['Jan', 'Fev', 'Mar','Abr', 'Mai', 'Jun','Jul', 'Ago', 'Set','Out', 'Nov', 'Dez'],
	    nextText: 'Próximo',
	    prevText: 'Anterior'
	};

	var datatables = {
		ptbr: {
		    "sEmptyTable": "Nenhum registro encontrado",
		    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
		    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
		    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
		    "sInfoPostFix": "",
		    "sInfoThousands": ".",
		    "sLengthMenu": "_MENU_ resultados por página",
		    "sLoadingRecords": "Carregando...",
		    "sProcessing": "Processando...",
		    "sZeroRecords": "Nenhum registro encontrado",
		    "sSearch": "Pesquisar",
		    "oPaginate": {
		        "sNext": "Próximo",
		        "sPrevious": "Anterior",
		        "sFirst": "Primeiro",
		        "sLast": "Último"
		    },
		    "oAria": {
		        "sSortAscending": ": Ordenar colunas de forma ascendente",
		        "sSortDescending": ": Ordenar colunas de forma descendente"
		    }
		}
	};

	core.constant('configuracaoREST', configuracaoREST);
	core.constant('toastr', toastr);
	core.constant('datatables', datatables);
	core.constant('datepicker', datepicker);
	core.constant('datepickerSemLimite', datepickerSemLimite);
})();