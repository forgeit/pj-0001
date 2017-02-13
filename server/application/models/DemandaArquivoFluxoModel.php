<?php

class DemandaArquivoFluxoModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'demanda_arquivo_fluxo';
	}
}