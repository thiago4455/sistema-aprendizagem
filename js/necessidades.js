$(document).ready(function() {

    ListarNecessidades();

    function ListarNecessidades() {
        $.ajax({
            url: '../controllers/listarNecessidades.php',
            dataType: 'json',
            success: function (msg) {
                if (msg == 'Not found') {
                    $('.table-responsive').css('display', 'none');
                    $('#div-not-found').css('display', 'flex');
                    $('#msg-notFound').text('Nenhuma Necessidade Cadastrada');
                }
                else {
                    $('.table-responsive').css('display', 'table');
                    $('#div-not-found').css('display', 'none');
                    
                }
                $('#lds').css('display', 'none');
            },
            error: function (err) {
                
            }
        });
    }

    $('#btn-modal-cadastrar').click(function() {

            $('#ipt-tipoContrato').html('');
            $('#ipt-codEmpresa').html('');
            $('#ipt-ciclos').html('');
            $('#btn-cadastrar').text('Buscando Informações...')
            $('#btn-cadastrar').prop('disabled', true)
            $('#alert-success').css('display','none')
            $('#alert-error').css('display','none')
        $.ajax({
            url: '../controllers/listarEmpresasSelecionadas.php',
            type: 'GET',
            dataType: 'json',
            success: function (msg) {
            
                if (msg == 'ERRO') {
                    setTimeout(() => {
                        $('.modal-cadastrar').modal('hide')
                    }, 250);
                    $('#modal-erro-empresa').modal('show');
                } else {
                    $.each(msg, function (key, value) {
                        $('#ipt-codEmpresa').append('<option value=' + value.codEmpresa + '>' + value.codEmpresa + '</option>')
                    });

                    $.ajax({
                        url: '../controllers/listarContratos.php',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            $.each(data, function (key, value) {
                                $('#ipt-tipoContrato').append('<option value=' + value.nomeContrato + '>' + (value.nomeContrato).replace("_"," ") + '</option>')
                            });

                            $('#btn-cadastrar').text('Cadastrar Necessidade')
                            $('#btn-cadastrar').prop('disabled', false)
                        },
                        error: function (err) {
                            console.log(err)
                        }
                        
                    })

                    $.ajax({
                        url: '../controllers/listarCiclos.php',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            console.log(data)
                            $.each(data, function (key, value) {
                                $('#ipt-ciclo').append('<option value=' + value.Semestre + '>' + (value.Semestre).replace('.', '/') + '</option>')
                            });

                            $('#btn-cadastrar').text('Cadastrar Necessidade')
                            $('#btn-cadastrar').prop('disabled', false)
                        },
                        error: function (err) {
                            console.log(err)
                        }
                        
                    })
        
                }
            },
            error: function (err) {
                console.log(err)
            }
            
        })
    })

    $('#ipt-descricao').keyup(function() {
        $('#span-descricao').text('Faltam: ' + (500 - $(this).val().length) + ' caracteres.')
    })

    $('#btn-erro-cadastarEmpresa').click(() => {
        window.location.href = 'empresas.php';
    })

    $('#btn-cadastrar').click(function(){
        var codEmpresa = $('#ipt-codEmpresa').val();
        var ciclo = $('#ipt-ciclo').val();
        var tipoContrato = $('#ipt-tipoContrato').val();
        var quantidade = $('#ipt-quantidade').val();
        var descricao = $('#ipt-descricao').val();
        $('#alert-success').css('display','none')
        $('#alert-error').css('display','none')
        if(!codEmpresa || !ciclo || !tipoContrato || !quantidade || !descricao){
            $('#alert-error').css('display','block')
            $('#error-msg').html('Preencha todos os campos corretamente!')
        }
        else{
            $.ajax({
                url: '../controllers/inserirNecessidade.php',
                dataType: 'json',
                data: {
                    'codEmpresa':codEmpresa,
                    'tipoContrato':tipoContrato,
                    'quantidade':quantidade,
                    'ciclo':ciclo,
                    'descricao':descricao,
                },
                type: 'POST',
                success: function (msg) {
                    $('#alert-success').css('display','block')
                },
                error: function (err) {
                    $('#alert-error').css('display','block')
                    $('#error-msg').html(err)
                }
            })
        }
    });
})

