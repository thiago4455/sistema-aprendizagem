<?php
class ClassLogin {

    private $email;
    private $senha;

    function getEmail() {
        return $this->email;
    }

    function getSenha() {
        return $this->senha;
    }

    function setEmail($email) {
        $this->email = $email;
    }

    function setSenha($senha) {
        $this->senha = $senha;
    }

    public function Login($objLogin) {
        require_once('ConexaoClass.php');
        $objConexao = new ConexaoClass("localhost", "root", "root", "dbaprendizagem");

        $email = $objLogin->getEmail();
        $senha = $objLogin->getSenha();
        try {
            $tableLogin = $objConexao->selecionarDados("SELECT * FROM Func WHERE emailFunc = '$email' AND senhaFunc = '$senha'");

            if($tableLogin === "ERRO") {          
                return 'Incorrect login';             
            }
            else {
                return $tableLogin;
            }
        }
        catch(Exception $err) {
            return "Problem System";
        }

    }
}