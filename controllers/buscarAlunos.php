<?php
    session_start();

    $nome = ($_POST['nome']);
    require_once('../models/ClassAlunos.php');
    $objAlunos = new ClassAlunos();
    $objAlunos->setNome($nome);
    $queryResp = $objAlunos->BuscaAlunos($nome);

    echo json_encode($queryResp);
?>