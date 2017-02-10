<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demanda extends CI_Controller {

	public function buscarTodos() {
		$lista = $this->DemandaModel->buscarTodosNativo();
		print_r(json_encode(array('data' => array ('datatables' => $lista ? $lista : array()))));
	}

	public function salvar() {
		$data = $this->security->xss_clean($this->input->raw_input_stream);
		$demanda = json_decode($data);
		$demandaModel = array();
		$demandaModel['dt_criacao'] = date('Y-m-d');
		$demandaModel['id_situacao'] = 1;// Demanda iniciada

		if ($demanda->titulo) {
			$demandaModel['titulo'] = strtoupper($demanda->titulo);
		} else {
			print_r(json_encode($this->gerarRetorno(FALSE, "O campo título é obrigatório.")));
			die();
		}

		if ($demanda->solicitante) {
			$demandaModel['id_solicitante'] = strtoupper($demanda->solicitante);
		} else {
			print_r(json_encode($this->gerarRetorno(FALSE, "O campo solicitante é obrigatório.")));
			die();
		}

		if (isset($demanda->descricao)) {
			if ($demanda->descricao) {
				$demandaModel['descricao'] = strtoupper($demanda->descricao);
			}
		}

		if ($demanda->tipoDemanda) {
			$demandaModel['id_tipo_demanda'] = strtoupper($demanda->tipoDemanda);
		} else {
			print_r(json_encode($this->gerarRetorno(FALSE, "O campo tipo de demanda é obrigatório.")));
			die();
		}		

		if ($demanda->dtContato) {
			$demandaModel['dt_contato'] = $demanda->dtContato;
		} else {
			print_r(json_encode($this->gerarRetorno(FALSE, "O campo data de contato é obrigatório.")));
			die();
		}		

		if (isset($demanda->prazoFinal)) {
			if ($demanda->prazoFinal) {
				$demandaModel['prazo_final'] = $demanda->prazoFinal;
			}
		}
		
		$novosArquivos = array();

		if (isset($demanda->arquivos)) {
			if (count($demanda->arquivos) > 0) {
				$arquivosTemporarios = $demanda->arquivos;
				$temporario = "../arquivos/tmp/";
				$diretorio = "../arquivos/demanda/";

				foreach ($arquivosTemporarios as $key => $value) {
					if (!file_exists($temporario . $value)) {
						print_r(json_encode($this->gerarRetorno(FALSE, "Ocorreu um erro ao efetuar o upload.")));
						die();
					} else {
						$novoDiretorio = $diretorio . date('Ymd');
						if (!file_exists($novoDiretorio)) {
							if (!mkdir($novoDiretorio)) {
								print_r(json_encode($this->gerarRetorno(FALSE, "Ocorreu um erro ao criar o diretório.")));
								die();
							}
						}

						if (!is_dir($novoDiretorio)) {
							print_r(json_encode($this->gerarRetorno(FALSE, "Ocorreu um erro ao criar o diretório.")));
							die();
						}

						$novo = $novoDiretorio . "/" . date('YmdHis-') . rand(1001, 9999) . "-" . $value;
						if (!copy($temporario . $value, $novo)) {
							print_r(json_encode($this->gerarRetorno(FALSE, "Ocorreu um erro ao efetuar o upload.")));
							die();	
						}	

						$novosArquivos[] = $novo;
					}
				}
			}
		}

		$this->db->trans_begin();
		$idDemanda = $this->DemandaModel->inserirRetornaId($demandaModel);

		if (count($novosArquivos) > 0) {
			foreach ($novosArquivos as $key => $value) {
				$demandaArquivoModel = array();
				$demandaArquivoModel['id_demanda'] = $idDemanda;
				$demandaArquivoModel['arquivo'] = $value;
				$this->DemandaArquivoModel->inserir($demandaArquivoModel);
			}
		}

		if ($this->db->trans_status() === FALSE){
			$this->db->trans_rollback();
			print_r(json_encode($this->gerarRetorno(FALSE, "Ocorreu um erro ao registrar a nova demanda.")));
		} else {
			$this->db->trans_commit();
			print_r(json_encode($this->gerarRetorno(TRUE, "A demanda foi registrada com sucesso.")));
		}
	}

	private function gerarRetorno($response, $mensagem) {
		$message = array();
		$message[] = $response == TRUE ? 
			array('tipo' => 'success', 'mensagem' => $mensagem) : 
			array('tipo' => 'error', 'mensagem' => $mensagem);

		$array = array(
			'message' => $message,
			'status' => $response == TRUE ? 'true' : 'false'
		);

		return $array;
	}
	
}