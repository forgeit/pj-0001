<?php

class DemandaFluxoModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'demanda_fluxo';
	}
}