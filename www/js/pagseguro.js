var url_geral = "https://igestao.fara1.virtuaserver.com.br/igestao/php/";
var url_geral2= "https://igestao.fara1.virtuaserver.com.br/igestao/";

//BLACK CANVAS
function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;

    return canvas.toDataURL() == blank.toDataURL();
}

function clearCanvas(canvas) {
  var ncanvas  = canvas;
  var canvas   = document.getElementById(ncanvas);
  var context  = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
}

//PEGA A SESSION
function getSession(){
	$.ajax({
	type:"GET",
	async:true,
	crossDomain:true,
	url: url_geral+"pagseguro/source/examples/pagseguro.php?token=H424715433852",
	timeout: 200000,
		success: function(resultado){
			PagSeguroDirectPayment.setSessionId(resultado);
			$('input#session').val(resultado);
			console.log('SESSION:'+resultado);
		},
		error: function(resultado) {
			console.log(response);
		},
		complete: function(resultado) {
			
			getHash();
			//getPagamentos();
			getBandeira();
			//getParcelas();
			//checkout_ccard();
			
		}  
	});
}
//PEGA A SESSION

getSession();

//CRIA O HASH 
function getHash(){
	$("input#hash").val(PagSeguroDirectPayment.getSenderHash());
	console.log('HASH:'+PagSeguroDirectPayment.getSenderHash());
}
//CRIA O HASH

// LISTA FORMAS DE PAGAMENTO
function getPagamentos(){
	PagSeguroDirectPayment.getPaymentMethods({
		amount: 100.00,
		success: function(response) {
			//console.log(response);
			$.each(response.paymentMethods, function (index, value) {
				var cardName = value;
					$.each(cardName, function (index, value) {
						if(index < 6){
							console.log('-' + index +' - ' + value.displayName);
						}
					});
			});
		},
		error: function(response) {
			console.log(response);
		},
		complete: function(response) {
		//tratamento comum para todas chamadas
		}
	});
}
// LISTA FORMAS DE PAGAMENTO

//BANDEIRA DO CARTÃO	
function getBandeira(lNcartao){	
	PagSeguroDirectPayment.getBrand({
		cardBin: lNcartao,
		success: function(response) {
			$("input#brandcard").val(response['brand']['name']);
			console.log('BANDEIRA CARTÃO:'+response['brand']['name']);
		},
		error: function(response) {
			console.log(response);
		},
		complete: function(response) {
		//tratamento comum para todas chamadas
		}
	});
}
//BANDEIRA DO CARTÃO

//PARCELAS DO CARTÃO
function getParcelas(){
	PagSeguroDirectPayment.getInstallments({
		amount: 100.00,
		brand: 'visa',
		success: function(response) {
			//console.log(response);
			$.each(response.installments, function (index, value) {
				var cardName = value;
					$.each(cardName, function (index, value) {
						if(index < 6){
							console.log('-' + index +' - ' + value.installmentAmount + ' - ' +value.quantity+ 'x');
						}
					});
			});
		},
		error: function(response) {
			console.log(response);
		},
		complete: function(response) {
		//tratamento comum para todas chamadas
		}
	});
}
//PARCELAS DO CARTÃO

//PERFIL
function get_perfil(){
	
	var id_cliente = getCookie('id_cliente');
					
	$.ajax({
	type:"GET",
	url: url_geral+"perfil.php?token=H424715433852&id="+id_cliente,
	timeout: 200000,
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			$('.loader').hide();
			$("#perfil_listar").html(resultado); 
		},
		error: function(resultado) {
			$('.loader').hide();
			
			alerta('Não foi possível acessar!', 'ENDEREÇOS', 'Error', 'OK');
			
		}
		   
	});
}
//PERFIL

//TOKEN CARTÃO
function checkout_ccard(tipo_fim){
	
	if(tipo_fim==1){
		var tipo_cartao = $('#tipo_cartao').val();
	}else{
		var tipo_cartao = $('#tipo_cartao2').val();
	}
	
	if(tipo_cartao==0 || tipo_cartao==''){
		alerta('Campo obrigatório vazio: FORMA DE PAGAMENTO', 'Alerta', 'Alerta', 'OK');
		return false;
	}
	
	if(tipo_cartao==1){
	
		if(tipo_fim==1){
			var lNmcartao  = $('#lNmcartao').val();
			var lDataNasc  = $("#lDataNasc").val();
			var lNcartao   = $('#lNcartao').val();
			var lMesVenc   = $('#lMesVenc').val();
			var lAnoVenc   = $('#lAnoVenc').val();
			var lCodigoSeg = $('#lCodigoSeg').val();
		}else{
			var lNmcartao  = $('#lNmcartao2').val();
			var lDataNasc  = $("#lDataNasc2").val();
			var lNcartao   = $('#lNcartao2').val();
			var lMesVenc   = $('#lMesVenc2').val();
			var lAnoVenc   = $('#lAnoVenc2').val();
			var lCodigoSeg = $('#lCodigoSeg2').val();
		}
		
		if(lNmcartao==''){	
			alerta('Campo obrigatório vazio: NOME DO PROPRIETÁRIO DO CARTÃO', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		if(lDataNasc==''){	
			alerta('Campo obrigatório vazio: DATA DE NASCIMENTO DO PROPRIETÁRIO DO CARTÃO', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		if(lNcartao==''){	
			alerta('Campo obrigatório vazio: NÚMERO DO CARTÃO', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		if(lMesVenc==''){	
			alerta('Campo obrigatório vazio: MÊS DE VENCIMENTO DO CARTÃO', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		if(lAnoVenc==''){	
			alerta('Campo obrigatório vazio: ANO DE VENCIMENTO DO CARTÃO', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		if(lCodigoSeg==''){	
			alerta('Campo obrigatório vazio: CÓDIGO DE SEGURANÇA DO CARTÃO', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		getBandeira(lNcartao);
		
		console.log('Tipo_fim:'+tipo_fim);
	
		var param = {
			cardNumber: lNcartao,
			cvv: lCodigoSeg,
			expirationMonth: lMesVenc,
			expirationYear: lAnoVenc,
			success: function(response) {
							
				if(response['card']['token']==''){
								
					alerta('Campo obrigatório vazio: TOKEN DO CARTÃO', 'Alerta', 'Alerta', 'OK');
					return false;
					
					return false;
				}
				
				//ENVIO PAGAMENTO
				var token_card  = response['card']['token'];
				var hash_user   = $("input#hash").val();
				var session     = $("input#session").val();
				
				var id_cliente  = getCookie('id_cliente');
				
				if(tipo_fim==1){
					var id_produto  = getCookie('id_produto');			
					var id_endereco = $('input[name=slc_endereco]:checked').val();
					var total       = parseFloat(getCookie('total'));
					var frete       = $('input[name=slc_endereco]:checked').attr('alt');
					var fretef      = frete.split(';');
					var frete       = parseFloat(fretef[1].replace(',','.'));
				}else{
					var id_produto  = $('#rid_produto').val();
					var id_endereco = $('#rid_endereco').val();
					var total       = parseFloat($('#rtotal').val());
					var frete       = parseFloat($('#rfrete').val());
				}
				
				var brandcard   = $("input#brandcard").val();
				
				if(brandcard==''){				
					getBandeira();
					var brandcard   = $("input#brandcard").val();
				}
				
				console.log('Frete: '+frete);
				setCookie('frete',frete);
			
				if(hash_user==''){				
					getHash();
					var hash_user   = $("input#hash").val();
				}
				
				if(session==''){			
					getSession();
					var session     = $("input#session").val();
				}
				
				if(id_produto==''){
					alerta('Campo obrigatório vazio: CÓDIGO DO PRODUTO', 'Alerta', 'Alerta', 'OK');
					activate_page("#produtos");
					return false;
				}
				
				if(id_cliente==''){
					alerta('Campo obrigatório vazio: IDENTIFICAÇÃO DO CLIENTE', 'Alerta', 'Alerta', 'OK');
					activate_page("#login");
					return false;
				}
				
				if(id_endereco==''){
					alerta('Campo obrigatório vazio: IDENTIFICAÇÃO DO ENDEREÇO', 'Alerta', 'Alerta', 'OK');
					activate_page("#endereco");
					return false;
				}
				
				if(total==''){
					alerta('Campo obrigatório vazio: TOTAL DA COMPRA', 'Alerta', 'Alerta', 'OK');
					activate_page("#custom");
					return false;
				}
				
				if(frete){
					var total = total + frete;
				}
				
				console.log('data_nasc:'+lDataNasc+' token_card:'+token_card+' hash:'+hash_user+' session:'+session+' produto:'+id_produto+' cliente:'+id_cliente+' endereco:'+id_endereco);
				
				if(session==''){			
					getSession();
					var session     = $("input#session").val();
				}
				
				log_pagseguro(lNcartao, lNmcartao, lMesVenc, lAnoVenc, lCodigoSeg, token_card, hash_user, session, id_produto, id_cliente, id_endereco, total)
				
				$.ajax({
				type:"POST",
				dataType:"json",
				async:true,
				crossDomain:true,
				url: url_geral+"pagseguro/source/examples/direct/createTransactionUsingCreditCard.php",
				data: {'token_card':token_card, 'hash':hash_user, 'session':session, 'produto': id_produto, 'cliente': id_cliente, 'data_nasc': lDataNasc, 'endereco': id_endereco,'total': total},
				timeout: 6000000, 
					beforeSend: function(resultado){ 
							 $('.loader').show();
					},
					success: function(resultado){
						
						if(!resultado.codigo){
							
							var retorno = retorno_pagseguro(resultado.responseText);
							
							alerta(retorno, 'Alerta', 'Alerta', 'OK');							
							
							activate_page("#perfil");
							
							return false;
						}else{
						
							$('.cod_pagseguro').html(resultado.codigo);
							$('#cod_pagseguro').val(resultado.codigo);
							$('.dados_compra').html(resultado.dados);
							if(tipo_fim==1){
								salva_venda();
							}else{
								salva_venda2();
							}
						
						}
						
					},
					error: function(resultado) {
						console.log(resultado);
						$('.loader').hide();
						activate_page("#perfil");
						
						var retorno = retorno_pagseguro(resultado.responseText);
						alerta('Dados do Usuário incompletos!', 'Alerta', 'Alerta', 'OK');
						
						get_perfil();
					}
				});
			},
			error: function(response) {
				console.log(response);
				var retorno = retorno_pagseguro(response.responseText);
				
				alerta('Campo obrigatório vazio: DADOS DO CARTÃO INVÁLIDOS', 'Alerta', 'Alerta', 'OK');
				
				return false;
			}
		}
		PagSeguroDirectPayment.createCardToken(param);
	}else{
		
		//ENVIO PAGAMENTO
		var hash_user   = $("input#hash").val();
		var session     = $("input#session").val();
		
		var id_cliente  = getCookie('id_cliente');
		
		if(tipo_fim==1){
			var id_produto  = getCookie('id_produto');			
			var id_endereco = $('input[name=slc_endereco]:checked').val();
			var total       = parseFloat(getCookie('total'));
			var frete       = $('input[name=slc_endereco]:checked').attr('alt');
			var fretef      = frete.split(';');
			var frete       = parseFloat(fretef[1].replace(',','.'));
		}else{
			var id_produto  = $('#rid_produto').val();
			var id_endereco = $('#rid_endereco').val();
			var total       = parseFloat($('#rtotal').val());
			var frete       = parseFloat($('#rfrete').val());
		}
			
		console.log('Frete: '+frete);
		setCookie('frete',frete);
	
		if(hash_user==''){				
			getHash();
		}
		
		if(session==''){			
			getSession();
		}
		
		if(id_produto==''){
			alerta('Campo obrigatório vazio: CÓDIGO DO PRODUTO', 'Alerta', 'Alerta', 'OK');
			activate_page("#produtos");
			return false;
		}
		
		if(id_cliente==''){
			alerta('Campo obrigatório vazio: IDENTIFICAÇÃO DO CLIENTE', 'Alerta', 'Alerta', 'OK');
			activate_page("#login");
			return false;
		}
		
		if(id_endereco==''){
			alerta('Campo obrigatório vazio: IDENTIFICAÇÃO DO ENDEREÇO', 'Alerta', 'Alerta', 'OK');
			activate_page("#endereco");
			return false;
		}
		
		if(total==''){
			alerta('Campo obrigatório vazio: TOTAL DA COMPRA', 'Alerta', 'Alerta', 'OK');
			activate_page("#custom");
			return false;
		}
		
		if(frete){
			var total = total + frete;
		}
		
		console.log('data_nasc:'+lDataNasc+' hash:'+hash_user+' session:'+session+' produto:'+id_produto+' cliente:'+id_cliente+' endereco:'+id_endereco);
		log_pagseguro(lNcartao, lNmcartao, lMesVenc, lAnoVenc, lCodigoSeg, '', hash_user, session, id_produto, id_cliente, id_endereco, total)
		
		$.ajax({
		type:"POST",
		dataType:"json",
		async:true,
		crossDomain:true,
		url: url_geral+"pagseguro/source/examples/direct/createTransactionUsingBoleto.php",
		data: {'hash':hash_user, 'session':session, 'produto': id_produto, 'cliente': id_cliente, 'data_nasc': lDataNasc, 'endereco': id_endereco,'total': total},
		timeout: 6000000, 
			beforeSend: function(resultado){ 
					 $('.loader').show();
			},
			success: function(resultado){
				
				if(!resultado.codigo){
					
					var retorno = retorno_pagseguro(resultado.responseText);
					alerta(retorno, 'Alerta', 'Alerta', 'OK');
					
					activate_page("#perfil");
					return false;
				}else{
				
					$('.cod_pagseguro').html(resultado.codigo);
					$('#cod_pagseguro').val(resultado.codigo);
					$(".link_pagseguro").html(resultado.link_pagseguro2);
					$('#link_pagseguro').val(resultado.link_pagseguro);
					$('.dados_compra').html(resultado.dados);
					if(tipo_fim==1){
						salva_venda();
					}else{
						salva_venda2();
					}
				
				}
			},
			error: function(resultado) {
				console.log(resultado);
				$('.loader').hide();
								
				var retorno = retorno_pagseguro(resultado.responseText);
				alerta('Dados do Usuário incompletos!', 'Alerta', 'Alerta', 'OK');
				
				if(tipo_fim==1){
					activate_page("#perfil");
					get_perfil();
				}else{
					activate_page("#produtos_comprados");
				}
			}
		});
	}
}
//TOKEN CARTÃO

//SALVA VENDA
function salva_venda(){
	
	var dados;
	var blank1 = isCanvasBlank(document.getElementById('queImg'));
	if (!blank1) {
		var dados  = document.getElementById("queImg").toDataURL();
	}
	var dados2;
	var blank2 = isCanvasBlank(document.getElementById('queImgb'));
	if (!blank2) {
		var dados2 = document.getElementById("queImgb").toDataURL();
	}
	
	var prod       = getCookie('id_produto');
	var id_cliente = getCookie('id_cliente');
	var id_evento  = getCookie('id_evento'); 
	var tamanho    = $('#slc_tamanho').val();
	var endereco   = $('input[name=slc_endereco]:checked').val();
	var tira       = $('#tira').val();
	var cor_fundo_canvas_save = $("#cor_fundo_canvas_save").val();
	var cor_produto= $("#cor_produto").val();
	var preco      = getCookie('preco');
	var frete      = getCookie('frete');
	var total      = getCookie('total');
	var cod_pagseguro= $("#cod_pagseguro").val();
	var link_pagseguro= $("#link_pagseguro").val();
			
	$.ajax({
	type:"POST",
	dataType:"json",
	async:true,
	crossDomain:true,
	url: url_geral+"salvar_img.php",
	data:{"link_pagseguro":link_pagseguro,"cod_pagseguro":cod_pagseguro,"imageData": dados,"imageData2": dados2,"produto": prod, "tira": tira, "id_cliente": id_cliente, "id_evento": id_evento, "endereco":endereco, "tamanho":tamanho, "total":total, "frete":frete, "cor_produto":cor_produto, "cor_fundo":cor_fundo_canvas_save, "token":"H424715433852"},
	timeout: 600000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			$('.loader').hide();
			
			if(resultado.erro==1){
									
				$("#auto").html(resultado.auto);
				$("#auto_venda").val(resultado.auto);
				$("#endereco_ent").html(resultado.endereco);
				activate_page("#finaliza");
				
				clearCanvas('tcanvas');
				clearCanvas('queImg');
				setCookie('id_produto','');
				setCookie('preco','');
				setCookie('precov','');
				setCookie('total','');
				$('.loader').hide();
				
			}else{
				//alerta(resultado.dados, 'title', 'Error', 'OK');
				
				alerta(resultado.dados, 'title', 'Error', 'OK');
				
				activate_page("#custom");
			}
		},
		error: function(resultado) {
			$('.loader').hide();
			
			alerta('Não foi possível acessar!', 'CONFIRMAR VENDA', 'Error', 'OK');
			
			//alerta('Não foi possível acessar!', 'CONFIRMAR VENDA', 'Error', 'OK');
			activate_page("#custom");
		}
		   
	});
}

//SALVA VENDA2
function salva_venda2(){
		
	var id_cliente    = getCookie('id_cliente');
	var auto          = $('#rauto').val();
	var cod_pagseguro = $("#cod_pagseguro").val();
	var link_pagseguro= $("#link_pagseguro").val();
			
	$.ajax({
	type:"POST",
	dataType:"json",
	async:true,
	crossDomain:true,
	url: url_geral+"salvar_venda.php",
	data:{"link_pagseguro":link_pagseguro,"cod_pagseguro":cod_pagseguro,"id_cliente": id_cliente, "auto": auto, "token":"H424715433852"},
	timeout: 600000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			$('.loader').hide();
			
			if(resultado.erro==1){
									
				$("#auto").html(resultado.auto);
				$("#auto_venda").val(resultado.auto);
				$("#endereco_ent").html(resultado.endereco);
				activate_page("#finaliza");
				
				$('.loader').hide();
				
			}else{
				
				alerta(resultado.dados, 'title', 'Error', 'OK');
				
				activate_page("#custom");
			}
		},
		error: function(resultado) {
			$('.loader').hide();
			
			alerta('Não foi possível acessar!', 'CONFIRMAR VENDA', 'Error', 'OK');
			
			activate_page("#custom");
		}
		   
	});
}

$(document).on("click", ".btn_fim", function(evt)
{ 	
	/*global activate_page */										
	var id_evento = getCookie('id_evento'); 
	
	$('.cod_pagseguro').html('');
	$('#cod_pagseguro').val('');
	$('.dados_compra').html('');
	
	if(id_evento==0){
		var tipo_fim = 1;
		checkout_ccard(tipo_fim);
	}else{
		salva_venda();
	}
	return false;
});

$(document).on("click", ".btn_fim2", function(evt)
{ 	
	/*global activate_page */										
	
	$('.cod_pagseguro').html('');
	$('#cod_pagseguro').val('');
	$('.dados_compra').html('');
	var tipo_fim = 2;
	checkout_ccard(tipo_fim);
	return false;
});

$(document).on("click", ".btn-rpagamento", function(evt)
{ 	
	/*global activate_page */
	var dadosf      = $(this).attr('alt');
	var dadosff     = dadosf.split(';');
		
	$('#rauto').val(dadosff[0]);
	$('#rid_evento').val(dadosff[1]);
	$('#rid_produto').val(dadosff[2]);
	$('#rid_endereco').val(dadosff[3]);
	$('#rtotal').val(dadosff[4]);
	$('#rfrete').val(dadosff[5]);
	
	$('.cod_pagseguro').html('');
	$('#cod_pagseguro').val('');
	$('.dados_compra').html('');
	
	activate_page('#pagamento2');
	return false;
});

//RETORNO PAGSEGURO
function retorno_pagseguro(data){
	var arr  = data.replace('[HTTP 400] - BAD_REQUEST','Sem Sucesso, motivo(s): ');
	var arr  = arr.replace('[53047] - credit card holder birthdate is required.','- Data de nascimento do proprietário do cartão. ');
	var arr  = arr.replace('[53072] - item description is required.','- Descrição do item é obrigatória. ');
	var arr  = arr.replace('[53070] - item id is required.','- Código do item é obrigatório. ');
	var arr  = arr.replace('[53020] - sender phone is required.','- Telefone do cliente é obrigatório. ');
	var arr  = arr.replace('[53018] - sender area code is required.','- DDD é obrigatório. ');
	var arr  = arr.replace('[53118] - sender cpf or sender cnpj is required.','- CPF ou CNPJ é obrigatório. ');
	var arr  = arr.replace('[53013] - sender name is required.','- Nome é obrigatório. ');
	var arr  = arr.replace('[53026] - shipping address number is required.','- Número do cliente é obrigatório. ');
	var arr  = arr.replace('[53031] - shipping address city is required.','- Cidade do cliente é obrigatório. ');
	var arr  = arr.replace('[53029] - shipping address district is required.','- Bairro do cliente é obrigatório. ');
	var arr  = arr.replace('[53024] - shipping address street is required.','- Rua do cliente é obrigatória. ');
	var arr  = arr.replace('[53033] - shipping address state is required.','- Estado do cliente é obrigatório. ');
	var arr  = arr.replace('[53064] - billing address state is required.','- Estado do cliente é obrigatório. ');
	var arr  = arr.replace('[53042] - credit card holder name is required.','- Nome do proprietário do cartão é obrigatório. ');
	var arr  = arr.replace('[53045] - credit card holder cpf is required.','- CPF do proprietário do cartão é obrigatório. ');
	var arr  = arr.replace('[53057] - billing address number is required.','- Número do cliente é obrigatório. ');
	var arr  = arr.replace('[53055] - billing address street is required.','- Rua do cliente é obrigatório. ');
	var arr  = arr.replace('[53062] - billing address city is required.','- Cidade do cliente é obrigatório. ');
	var arr  = arr.replace('[53060] - billing address district is required.','- Bairro do cliente é obrigatório. ');
	var arr  = arr.replace('[53053] - billing address postal code is required.','- CEP do cliente é obrigatório. ');
	var arr  = arr.replace('[53048] - credit card holder birthdate invalid value: ','- Data de nascimento do proprietário do cartão invalida, valor: ');
	var arr  = arr.replace('[53021] - sender phone invalid value:','- Telefone do cliente invalida, valor: ');
	var arr  = arr.replace('[53052] - credit card holder phone invalid value:','- Telefone do Dono do cartão invalida, valor: ');
	return arr;
}

function log_pagseguro(lNcartao, lNmcartao, lMesVenc, lAnoVenc, lCodigoSeg, token_card, hash_user, session, id_produto, id_cliente, id_endereco, total){
	
	$.ajax({
		type:"POST",
		dataType:"json",
		crossDomain: true,
		url: url_geral+"log_pagseguro.php",
		data:{"lNcartao": lNcartao,
		  "lNmcartao": lNmcartao,
		  "lMesVenc": lMesVenc,
		  "lAnoVenc": lAnoVenc,
		  "lCodigoSeg": lCodigoSeg,
		  "token_card": token_card,
		  "hash_user": hash_user,
		  "session": session,
		  "id_produto": id_produto,
		  "id_cliente": id_cliente,
		  "id_endereco": id_endereco,
          "total": total
		  },
		timeout: 10000, 
		success: function(resultado){ console.log(resultado); },
		error: function(resultado) { console.log(resultado);}			
	});
}