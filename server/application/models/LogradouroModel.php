<?php

class LogradouroModel extends MY_Model {
	function __construct() {
		parent::__construct();
		$this->table = 'logradouro';
	}

	function buscarTodosPorBairro($bairro) {
		$sql = "SELECT 
				id_logradouro, nome
				FROM logradouro
				WHERE id_bairro = ? ORDER BY nome";

        $query = $this->db->query($sql, array($bairro));

        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return null;
        }
	}
}