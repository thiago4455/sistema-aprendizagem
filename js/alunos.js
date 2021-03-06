$(window).on('load', () => {
    ''
})
function Visualizar(id){
    let ra = (id.split('-'))[1];
    $.ajax({
        url: '../controllers/buscarAlunos.php',
        dataType: 'json',
        data: {
            'nome': ra,
            'ciclo': $('#cbx-ciclos').val(),
        },
        type: 'POST',
        success: function (msg) {
            if (msg != 'Not found') {
                let aluno = msg[0];
                $('#ipt-nome').val(aluno.Nome);
                $('#ipt-ra').val(aluno.Ra);
                $('#ipt-cpf').val(aluno.Cpf);
                $('#ipt-dataNasc').val(aluno.DataNasc);
                $('#ipt-idade').val(aluno.Idade);
                $('#ipt-sexo').val(aluno.Sexo=='F'?'Feminino':'Masculino');
                $('#ipt-escolaridade').val(aluno.GrauInstrucao);
                $('#ipt-rua').val(aluno.Rua);
                $('#ipt-num').val(aluno.Numero);
                $('#ipt-complemento').val(aluno.Complemento);
                $('#ipt-estado').val(aluno.Estado);
                $('#ipt-bairro').val(aluno.Bairro);
                $('#ipt-cidade').val(aluno.Cidade);
                $('#ipt-cep').val(aluno.Cep);
                $('#ipt-telefone1').val(aluno.Telefone1);
                $('#ipt-telefone2').val(aluno.Telefone2);
                $('#ipt-identidade').val(aluno.Identidade);
                $('#ipt-email').val(aluno.Email);
                $('#ipt-carteiraTrabalho').val(aluno.CarteiraTrabalho);
                $('#ipt-nomePai').val(aluno.NomePai);
                $('#ipt-nomeMae').val(aluno.NomeMae);
                $('#ipt-telefonePai').val(aluno.TelefonePai);
                $('#ipt-telefoneMae').val(aluno.TelefoneMae);
                $('#ipt-nomeCurso').val(aluno.NomeCurso);
                $('#ipt-codTurma').val(aluno.CodTurma);
                $('#ipt-status').val(aluno.Status);
                $('#ipt-semestre').val(aluno.Semestre);
                $('.modal-visualizar').modal('show');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

$(document).ready(() => {
    var alunosSelecionados = [];

    $('#search-avanced').click(function() {
        if($('#busca-avancada').css('display') != 'flex') {
            $('#busca-avancada').css('display', 'flex')
        }
        else {
            $('#busca-avancada').css('display', 'none')
        }
    })

    let age1Previus = $('#age1').val();
    $('#age1').on('keyup', () => {
        if (age1Previus == $('#age2').val()) {
            $('#age2').val($('#age1').val());
        }

        age1Previus = $('#age1').val();
    })

    $('#search-avanced-submit').on('click', () => {
        $.ajax({
            url: '../controllers/buscaAvancada.php',
            data: {
                'nome': $('#nome').val(),
                'ra': $('#ra').val(),
                'idade1': $('#age1').val(),
                'idade2': $('#age2').val(),
                'sexo': $('#sexo').val(),
                'grauInstrucao': $('#grauInstrucao').val(),
                'bairro': $('#bairro').val(),
                'estado': $('#estado').val(),
                'cidade': $('#cidade').val(),
                'cep': $('#cep').val(),
                'telefone': $('#telefone').val(),
                'identidade': $('#identidade').val(),
                'cpf': $('#cpf').val(),
                'email': $('#email').val(),
                'carteiraTrabalho': $('#carteiraTrabalho').val(),
                'nomePai': $('#nomePai').val(),
                'nomeMae': $('#nomeMae').val(),
                'nomeCurso': $('#nomeCurso').val(),
                'codTurma': $('#codTurma').val(),
                'status': $('#status').val(),
                'ciclo': $('#cbx-ciclos').val(),
            },
            type: 'POST',
            dataType: 'json',
            success: function (msg) {
                
                if (msg == 'Not found') {
                    $('#fast-actions').css('display', 'none');
                    $('#tableBody').css('display', 'none');
                    $('#div-not-found').css('display', 'flex');
                    $('#msg-notFound').text('Nenhum aluno cadastrado');
                }
                else {
                    $('#fast-actions').css('display', 'flex');
                    $('#tableBody').css('display', 'table');
                    $('#div-not-found').css('display', 'none');
                    ListarItens(msg)
                }
            },
            error: function (err) {
                
            }
        })
    });

    function Listar(){
        $.ajax({
            url: '../controllers/listarCiclos.php',
            dataType: 'json',
            success: function (msg) {
                if (msg == 'Not found') {
                    $('#fast-actions').css('display', 'none');
                    $('#tableBody').css('display', 'none');
                    $('#div-not-found').css('display', 'flex');
                    $('#msg-notFound').text('Nenhum aluno cadastrado');
                }
                else {
                    $('#cbx-ciclos').text('');
                    msg.forEach((i) => {
                        $('#cbx-ciclos').append(`<option value="${i.Semestre}"> Ciclo - ${i.Semestre}</option>`)
                    })
    
                    $('#fast-actions').css('display', 'flex');
                    $('#tableBody').css('display', 'table');
                    $('#div-not-found').css('display', 'none');
    
                    ListarPorCiclo($('#cbx-ciclos').val())
                }
                $('#lds').css('display', 'none');
            },
            error: function (err) {
                
            }
        });
    }

    Listar();

    $('#cbx-ciclos').on('change', (() => {
        ListarPorCiclo($('#cbx-ciclos').val())
    }));

    $(document).on('change', '#check-todos', function () {
        if (this.checked) {
            alunosSelecionados = []
            $('.check-alunos').prop('checked', true);
            $('.table-row').css('background', '#d8525252')
            $('.check-alunos').each(function (i, element) {
                alunosSelecionados.push(element.id)
            })
        }
        else {
            $('.check-alunos').prop('checked', false);
            $('.table-row').css('background', '#fff')
            alunosSelecionados = []
        }
        if ($(":checkbox:checked").length > 0) {
            $('#btn-encaminhar').text(`Encaminhar Selecionados (${$(":checkbox:checked").length - 1})`);
        } else {
            $('#btn-encaminhar').text('Encaminhar Selecionados');
        }

        VerificarEncaminhar();
    });

    $(document).on('click', '.td-check', function (e) {
        if (e.target !== this)
            return;
        $(this).children().click();
    })

    $(document).on('change', '.check-alunos', function () {
        if (this.checked) {
            $(this).prop('checked', true);
            $(this).parent().parent().css('background', '#d8525252');
            alunosSelecionados.push($(this).attr('id'));
        }
        else {
            $('#check-todos').prop('checked', false);
            $(this).prop('checked', false);
            $(this).parent().parent().css('background', '#fff');
            Pop($(this).attr('id'));
        }
        if ($(".td-check :checkbox:checked").length > 0) {
            $('#btn-encaminhar').text(`Encaminhar Selecionados (${$(".td-check :checkbox:checked").length})`);
        } else {
            $('#btn-encaminhar').text('Encaminhar Selecionados');
        }

        VerificarEncaminhar();
        console.log(alunosSelecionados);
    })

    function Pop(search_term){
        for (var i=alunosSelecionados.length-1; i>=0; i--) {
            if (alunosSelecionados[i] === search_term) {
                alunosSelecionados.splice(i, 1);
                break;
            }
        }
    }

    function VerificarEncaminhar(){
        let desativar = false;
        alunosSelecionados.forEach((id) => {
            if(($("#"+id+" td:nth-child(10)").text() != ' Em Espera ') && ($("#"+id+" td:nth-child(10)").text() != ' Reprovado ')){
                desativar = true;
            }
        })

        $('#btn-encaminhar').attr("disabled", desativar);
    }

    function ListarItens(msg) {
        table.innerHTML = "";
        table.innerHTML = '<tr id="tr-title"><td></td><td>RA</td><td>Nome</td><td>Idade</td><td>Sexo</td><td>Email</td><td>Cidade</td><td>CPF</td><td>Telefone</td><td>Status</td><td></td></tr>';
        for (i = 0; i < msg.length; i++) {
            $('#tableBody').append(`<tr id="${msg[i].Ra}" class="table-row"> <td class="td-check"> <input class="form-check-input check-alunos" type="checkbox" value="" id="${msg[i].Ra}"> </td> <td> ${msg[i].Ra} </td> <td style="min-width: 300px"> ${msg[i].Nome} </td> <td> ${msg[i].Idade} </td> <td> ${msg[i].Sexo} </td> <td> ${msg[i].Email} </td> <td> ${msg[i].Cidade} </td> <td> ${msg[i].Cpf} </td> <td> ${msg[i].Telefone1} </td> <td> ${msg[i].Status} </td><td class="btnR" id="btn-${msg[i].Ra}" class="btn-editar" onclick="Visualizar(this.id)"><button><i class="fas fa-eye"></i></td></tr>`)
        }
    }


    let table = document.getElementById('tableBody');

    function ListarPorCiclo(ciclo) {
        $.ajax({
            url: '../controllers/listarAlunos.php',
            dataType: 'json',
            data: {
                'ciclo': ciclo,
            },
            type: 'POST',
            success: function (msg) {
                if(msg == 'Not found') {
                    $('#fast-actions').css('display', 'none');
                    $('#tableBody').css('display', 'none');
                    $('#div-not-found').css('display', 'flex');
                    $('#msg-notFound').text('Nenhum aluno cadastrado');
                }
                else {
                    $('#lds').css('display', 'none');
                    $('#fast-actions').css('display', 'flex');
                    $('#tableBody').css('display', 'table');
                    $('#div-not-found').css('display', 'none');
                    ListarItens(msg);
                }
                
            },
            error: function (err) {
                
            }
        });
    }

    $('#inputSearch').keyup(function () {
        $.ajax({
            url: '../controllers/buscarAlunos.php',
            dataType: 'json',
            data: {
                'nome': $('#inputSearch').val(),
                'ciclo': $('#cbx-ciclos').val(),
            },
            type: 'POST',
            success: function (msg) {
                if (msg == 'Not found') {
                    $('#fast-actions').css('display', 'none');
                    $('#tableBody').css('display', 'none');
                    $('#div-not-found').css('display', 'flex');
                    $('#msg-notFound').text('Aluno não encontrado');
                }
                else {
                    $('#fast-actions').css('display', 'flex');
                    $('#tableBody').css('display', 'table');
                    $('#div-not-found').css('display', 'none');
                    ListarItens(msg);
                }
            },
            error: function (err) {
                
            }
        });
    })

    $('#btn-encaminhar').click(function () {
        if (alunosSelecionados == "") {
            $('#modal-erro').modal('show');
        }
        else {
            $('#ipt-alunosSelecionados').html('');
            $('#ipt-necessidadeSelecionada').html('');
            $('#modal-encaminhar').modal('show')
            $('#btn-encaminhar-model').text('Buscando Necessidades...')
            $('#btn-encaminhar-model').prop('disabled', true)
            $.ajax({
                url: '../controllers/listarSelecionados.php',
                data: {
                    'alunosSelecionados': alunosSelecionados,
                },
                type: 'POST',
                dataType: 'json',
                success: function (msg) {
                    var i = 0;
                    alunosSelecionados.forEach(element => {
                        $('#ipt-alunosSelecionados').append(element + " - " + msg[i].Nome + "\n")
                        i++;
                    });
                    $('#label-alunosSelecionados').text(`Alunos Selecionados - (${i})`)

                    $.ajax({
                        url: '../controllers/listarNecessidadesValidas.php',
                        type: 'POST',
                        data: {
                            'quantidade':i,
                        },
                        dataType: 'json',
                        success: function (msg) {
                            console.log(msg);
                            if (msg == 'ERRO') {
                                setTimeout(() => {
                                    $('#modal-encaminhar').modal('hide')
                                }, 500);
                                $('#modal-erro-necessidade').modal('show');
                            } else {
                                $.each(msg, function (key, value) {
                                    $('#ipt-necessidadeSelecionada').append(`<option value=${value.id} title="${value.descricao}">${value.codEmpresa} - ${(value.tipoContrato).replace("_"," ")} Restantes: ${value.quantidade}</option>`)
                                });

                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                        
                    })
                    $('#btn-encaminhar-model').text('Encaminhar Alunos')
                    $('#btn-encaminhar-model').prop('disabled', false)
                },
                error: function (err) {
                    
                }
            })

        }
    })

    $('#btn-encaminhar-model').click(function () {
        var id = $('#ipt-necessidadeSelecionada').val();

        $('#btn-encaminhar-model').text('Gerando PDF...')
        $('#btn-encaminhar-model').prop('disabled', true)

        window.location.href = `../controllers/gerarPdfEncaminhar.php?alunosSelecionados=${alunosSelecionados}&necessidade=${id}`;

    })

    $('#btn-erro-cadastarNecessidade').click(() => {
        window.location.href = 'necessidades.php';
    })
})

