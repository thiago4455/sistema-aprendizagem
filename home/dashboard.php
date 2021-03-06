<!doctype html>
<html lang="pt-br">

<?php session_start(); ?>
<head>
    <title>Senai - Sistema FIEMG</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="assets/icons/favicon.ico" />

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Fontes -->
    <link rel="stylesheet" href="../fonts/fontes.css">

    <!-- Dashboard.css -->
    <link rel="stylesheet" href="css/dashboard.css"> 

</head>

<body>

    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card-dash">
                    <div class="card-body">
                        <div class="card-info">
                            <h1 style="color: #d85252c9">Ciclos Criados</h1>
                            <h2 id="info-ciclos">0</h2>
                        </div>
                        <img src="../assets/img/ciclos-min.png" alt="Ciclos Criados">
                    </div>
                    <a style="background: #d85252c9" href="ciclos.php" class="card-bottom" data-value="<?php echo $_SESSION['tipoLog']!='admin'?'nav-alunos':'nav-ciclos';?>">VEJA MAIS</a>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card-dash">
                    <div class="card-body">
                        <div class="card-info">
                            <h1 style="color: #ff5722c9">Alunos Cadastrados</h1>
                            <h2 id="info-alunosCadastrados">0</h2>
                        </div>
                        <img src="../assets/img/alunos-min.png" alt="Alunos Cadastrados">
                    </div>
                    <a style="background: #ff5722c9"  href="alunos.php" class="card-bottom" data-value="nav-alunos">VEJA MAIS</a>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card-dash">
                    <div class="card-body">
                        <div class="card-info">
                            <h1 style="color: #ffc107c9">Funcionários Cadastrados</h1>
                            <h2 id="info-funcCadastrados">0</h2>
                        </div>
                        <img src="../assets/img/funcionarios-min.png" alt="Funcionarios Cadastrados">
                    </div>
                    <a style="background: #ffc107c9"  href="funcionarios.php" class="card-bottom" data-value="nav-funcionarios">VEJA MAIS</a>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card-dash">
                    <div class="card-body">
                        <div class="card-info">
                            <h1 style="color: #4caf50c9">Empresas Cadastradas</h1>
                            <h2 id="info-empCadastrados">0</h2>
                        </div>
                        <img src="../assets/img/empresas-min.png" alt="Empresas Cadastrados">
                    </div>
                    <a style="background: #4caf50c9"  href="empresas.php" class="card-bottom" data-value="nav-empresas">VEJA MAIS</a>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card-dash">
                    <div class="card-body">
                        <div class="card-info">
                            <h1 style="color: #009688c9">Alunos Encaminhados</h1>
                            <h2 id="info-alunosEncaminhados">0</h2>
                        </div>
                        <img src="../assets/img/encaminhados-min.png" alt="Alunos Encaminhados">
                    </div>
                    <a style="background: #009688c9"  href="encaminhados.php" class="card-bottom" data-value="nav-encaminhados">VEJA MAIS</a>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card-dash">
                    <div class="card-body">
                        <div class="card-info">
                            <h1 style="color: #00bcd4c9">Relatórios Gerados</h1>
                            <h2 id="info-relatorios">0</h2>
                        </div>
                        <img src="../assets/img/relatorio-min.png" alt="Relatorios gerados">
                    </div>
                    <a style="background: #00bcd4c9"  href="relatorios.php" class="card-bottom" data-value="nav-relatorios">VEJA MAIS</a>
                </div>
            </div>
        </div>
    </div>


    <script
        src="https://code.jquery.com/jquery-3.4.0.min.js"
        integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>

    <script src="../js/jquery.mask.min.js"></script>
    <script src="../js/dashboard.js"></script>

</body>

</html>