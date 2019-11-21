// Função única que fará a transação
function getEndereco() {
		// Se o campo CEP não estiver vazio
		if($.trim($("#lCep").val()) != ""){
			$.getScript("http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+$("#lCep").val(), function(){

				if(resultadoCEP["resultado"]){

					$("#lEndereco").val(unescape(resultadoCEP["tipo_logradouro"])+" "+unescape(resultadoCEP["logradouro"]));
					$("#lBairro").val(unescape(resultadoCEP["bairro"]));
					$("#lEstado").val(unescape(resultadoCEP["uf"]));
					$("#lCidade").val(unescape(resultadoCEP["cidade"]));
					$("#numero").focus();
					
				}else{
					alerta('Endereço não encontrado!', 'title', 'Error', 'OK');
				}
			});				
		}			
}