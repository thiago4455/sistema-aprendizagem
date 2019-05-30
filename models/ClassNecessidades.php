<?php
class ClassNecessidades {

    function getCodEmpresa(){
        return $this->codEmpresa;
    }    
    function getTipoContrato(){
        return $this->tipoContrato;
    }
    function getQuantidade(){
        return $this->quantidade;
    }
    function getCiclo(){
        return $this->ciclo;
    }
    function getDescricao(){
        return $this->descricao;
    }

    function setCodEmpresa($codEmpresa){
        $this->codEmpresa = $codEmpresa;
    }    
    function setTipoContrato($tipoContrato){
        $this->tipoContrato = $tipoContrato;
    }
    function setQuantidade($quantidade){
        $this->quantidade = $quantidade;
    }
    function setCiclo($ciclo){
        $this->ciclo = $ciclo;
    }
    function setDescricao($descricao){
        $this->descricao = $descricao;
    }

    public function RetNecessidades() {
        require_once('ConexaoClass.php');
        $objConexao = new ConexaoClass();
                # MySQL UTF-8
                $objConexao->executarComandoSQL("SET NAMES 'utf8'");
                $objConexao->executarComandoSQL('SET character_set_connection=utf8');
                $objConexao->executarComandoSQL('SET character_set_client=utf8');
                $objConexao->executarComandoSQL('SET character_set_results=utf8');        
        try {
            $tableNecessidades = $objConexao->selecionarDados("SELECT * FROM `Necessidade`;");

            if($tableNecessidades === "ERRO") {
                return 'Not found';             
            }
            else {
                return $tableNecessidades;
            }
        }
        catch(Exception $err) {
            return "Problem System";
        }
    }

    public function InserirNecessidade($objNecessidade){
        require_once('ConexaoClass.php');
        $objConexao = new ConexaoClass();
                # MySQL UTF-8
                $objConexao->executarComandoSQL("SET NAMES 'utf8'");
                $objConexao->executarComandoSQL('SET character_set_connection=utf8');
                $objConexao->executarComandoSQL('SET character_set_client=utf8');
                $objConexao->executarComandoSQL('SET character_set_results=utf8');
                $codEmpresa = $objNecessidade->getCodEmpresa();
                $tipoContrato = $objNecessidade->getTipoContrato();
                $quantidade = $objNecessidade->getQuantidade();
                $ciclo = $objNecessidade->getCiclo();
                $descricao = $objNecessidade->getDescricao();        
        try {
            $query = $objConexao->executarComandoSQL("INSERT INTO `Necessidade` (`codEmpresa`,`tipoContrato`,`quantidade`,`ciclo`,`descricao`) VALUES ('$codEmpresa','$tipoContrato',$quantidade,'$ciclo','$descricao');");
            return $query;
        }
        catch(Exception $err) {
            return $err;
        }
    }
 }
?>