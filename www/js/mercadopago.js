var mp_public_key = getCookie('mp_public_key');
console.log(mp_public_key);
console.log(url_geral);

Mercadopago.setPublishableKey(''+mp_public_key+''); //INSIRA SUA PUBLIC KEY DISPONÍVEL EM: https://www.mercadopago.com/mlb/account/credentials
    	
	function addEvent(el, eventName, handler){
		if (el.addEventListener) {
			   el.addEventListener(eventName, handler);
		} else {
			el.attachEvent('on' + eventName, function(){
			  handler.call(el);
			});
		}
    };
	
	//BLACK CANVAS
	function isCanvasBlank(canvas) {
		var blank = document.createElement('canvas');
		blank.width = canvas.width;
		blank.height = canvas.height;

		return canvas.toDataURL() == blank.toDataURL();
	}
	
	//CLEAN CANVAS
	function clearCanvas(canvas) {
	  var ncanvas  = canvas;
	  var canvas   = document.getElementById(ncanvas);
	  var context  = canvas.getContext('2d');
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  var w = canvas.width;
	  canvas.width = 1;
	  canvas.width = w;
	}
	
	//TRATA E PEGA O NÚMERO DO CARTÃO
	function getBin() {
        var ccNumber = $("#cardNumber").val();
        return ccNumber.replace(/[ .-]/g, '').slice(0, 6);
    };
	
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
				return false;
			},
			error: function(resultado) {
				$('.loader').hide();
				
				alerta('Não foi possível acessar!', 'ENDEREÇOS', 'Error', 'OK');
				return false;
			}
			   
		});
	}
	//PERFIL
    
	//ENQUANTO DIGITA SE FOR MAIOR QUE
    function guessingPaymentMethod(event) {
        var bin = getBin();
		if (bin.length >= 6) {
			Mercadopago.getPaymentMethod({
				"bin": bin
			}, setPaymentMethodInfo);
		}
    };
    
    function setPaymentMethodInfo(status, response) {
        if (status == 200) {
            console.log(response);
			console.log(response[0].settings[0].card_number.length);
			console.log(response[0].settings[0].security_code.length);
			$("#cardNumber").attr('maxlength',response[0].settings[0].card_number.length);
			$("#securityCode").attr('maxlength',response[0].settings[0].security_code.length);
            $("#paymentMethodId").val(response[0].id);
          
			var img = "<img src='" + response[0].thumbnail + "' align='center' style='margin-left:10px;' ' >";
            $("#bandeira").empty(); $("#bandeira").append(img);
			
            var total = parseFloat(getCookie('total'));
			$("#amount").val(parseFloat(getCookie('total')));
			Mercadopago.getInstallments({ "bin": getBin(), "amount": total }, setInstallmentInfo);
        }
    };
    
	function setInstallmentInfo(status, response) {
		var selectorInstallments = document.querySelector("#installments"),
			fragment = document.createDocumentFragment();

		selectorInstallments.options.length = 0;

		if (response.length > 0) {
			var option = new Option("Escolha uma opção...", '-1'),
				payerCosts = response[0].payer_costs;

			fragment.appendChild(option);
			for (var i = 0; i < payerCosts.length; i++) {
				option = new Option(payerCosts[i].recommended_message || payerCosts[i].installments, payerCosts[i].installments);
				fragment.appendChild(option);
			}
			selectorInstallments.appendChild(fragment);
			selectorInstallments.removeAttribute('disabled');
			$("#installments").val($("#installments option:eq(1)").val());
		}
	};
	
	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', guessingPaymentMethod);
    addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'blur', guessingPaymentMethod);
    doSubmit = false;
	addEvent(document.querySelector('#go'),'click',doPay);
    
    function doPay(event){
    event.preventDefault();
      if(!doSubmit){
          var $form = document.querySelector('#pay');
          //console.log($form);
          Mercadopago.createToken($form, sdkResponseHandler); //A FUNÇÃO "sdkResponseHandler" É DEFINIDA ABAIXO
  
          return false;
      }
    };
    
	//VERIFICA SE O CAMPO EXISTE SE NÃO ELE ADICIONA O CAMPO COM O VALOR
    function sdkResponseHandler(status, response) {
		if (status != 200 && status != 201) {
			//console.log("verify filled data");
			return false;
		}else{
			//console.log(response);
			$("#tokencard").val(response.id);
			return false;
		}
	};

	//SALVA VENDA
	function salva_venda(){
		
		var dados; var blank1 = isCanvasBlank(document.getElementById('queImg'));
		if (!blank1) { var dados  = document.getElementById("queImg").toDataURL(); }
		var dados2; var blank2 = isCanvasBlank(document.getElementById('queImgb'));
		if (!blank2) { var dados2 = document.getElementById("queImgb").toDataURL();}
		
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
		var ncupom     = $("#ncupom").val();
		var vcupom     = $("#vcupom").val();
		
		console.log(ncupom);
		console.log(vcupom);
				
		$.ajax({ type:"POST", dataType:"json", async:true, crossDomain:true,
			url: url_geral+"salvar_img.php",
			data:{"link_pagseguro":link_pagseguro,"cod_pagseguro":cod_pagseguro,"imageData": dados,"imageData2": dados2,"produto": prod, "tira": tira, "id_cliente": id_cliente, "id_evento": id_evento, "endereco":endereco, "tamanho":tamanho, "total":total, "frete":frete, "cupom":ncupom, "vcupom":vcupom, "cor_produto":cor_produto, "cor_fundo":cor_fundo_canvas_save, "token":"H424715433852"},
			timeout: 600000, 
			beforeSend: function(resultado){ $('.loader').show(); },
			success: function(resultado){
				$('.loader').hide();
				if(resultado.erro==1){	
					$("#auto").html(resultado.auto); $("#auto_venda").val(resultado.auto); $("#endereco_ent").html(resultado.endereco);
					activate_page("#finaliza");
					clearCanvas('tcanvas'); clearCanvas('queImg');
					setCookie('id_produto',''); setCookie('preco',''); setCookie('precov',''); setCookie('total',''); setCookie('vcupom',''); setCookie('ncupom','');
					$('.loader').hide();
					return false;
				}else{
					alerta(resultado.dados, 'title', 'Error', 'OK');
					activate_page("#custom");
					return false;
				}
			},
			error: function(resultado) {
				$('.loader').hide();
				alerta('Não foi possível acessar!', 'CONFIRMAR VENDA', 'Error', 'OK');
				activate_page("#custom");
				return false;
			} 
		});
	}

	//SALVA VENDA2
	function salva_venda2(){
			
		var id_cliente    = getCookie('id_cliente');
		var auto          = $('#rauto').val();
		var cod_pagseguro = $("#cod_pagseguro").val();
		var link_pagseguro= $("#link_pagseguro").val();
		var ncupom     = $("#ncupom").val();
		var vcupom     = $("#vcupom").val();
		
		console.log("2: "+ncupom);
		console.log("2: "+vcupom);
				
		$.ajax({ type:"POST", dataType:"json", async:true, crossDomain:true,
			url: url_geral+"salvar_venda.php",
			data:{"link_pagseguro":link_pagseguro,"cod_pagseguro":cod_pagseguro,"id_cliente": id_cliente, "auto": auto, "cupom":ncupom, "vcupom":vcupom, "token":"H424715433852"},
			timeout: 600000, 
			beforeSend: function(resultado){ $('.loader').show(); },
			success: function(resultado){
				$('.loader').hide();
				if(resultado.erro==1){				
					$("#auto").html(resultado.auto); $("#auto_venda").val(resultado.auto); $("#endereco_ent").html(resultado.endereco);
					activate_page("#finaliza");
					$('.loader').hide();
					return false;
				}else{
					alerta(resultado.dados, 'title', 'Error', 'OK');
					activate_page("#custom");
					return false;
				}
			},
			error: function(resultado) {
				$('.loader').hide();
				alerta('Não foi possível acessar!', 'CONFIRMAR VENDA', 'Error', 'OK');
				activate_page("#custom");
				return false;
			}   
		});
	}	
	
	function checkout_ccard(tipo_fim){
	
		if(tipo_fim==1){ var tipo_cartao = $('#tipo_cartao').val();
		}else{ var tipo_cartao = $('#tipo_cartao').val(); }
		
		if(tipo_cartao==0 || tipo_cartao==''){ alerta('Campo obrigatório vazio: FORMA DE PAGAMENTO', 'Alerta', 'Alerta', 'OK'); return false;}
	
		if(tipo_fim==1){
			var lNmcartao  = $('#cardholderName').val();
			var docNumber  = $("#docNumber").val();
			var cardNumber = $('#cardNumber').val();
			var lMesVenc   = $('#cardExpirationMonth').val();
			var lAnoVenc   = $('#cardExpirationYear').val();
			var lCodigoSeg = $('#securityCode').val();
			
			var id_produto  = getCookie('id_produto');			
			var id_endereco = $('input[name=slc_endereco]:checked').val();
			var total       = parseFloat(getCookie('total'));
			var frete       = parseFloat(getCookie('frete'));
			var vcupom      = parseFloat(getCookie('vcupom'));
			
			console.log('Tipo Fim 1: '+vcupom);
			
		}else{
			var lNmcartao  = $('#lNmcartao2').val();
			var lCpf       = $("#lDataNasc2").val();
			var cardNumber   = $('#cardNumber2').val();
			var lMesVenc   = $('#lMesVenc2').val();
			var lAnoVenc   = $('#lAnoVenc2').val();
			var lCodigoSeg = $('#lCodigoSeg2').val();
			
			var id_produto  = $('#rid_produto').val();
			var id_endereco = $('#rid_endereco').val();
			var total       = parseFloat($('#rtotal').val());
			var frete       = parseFloat($('#rfrete').val());
			var vcupom      = parseFloat($('#vcupom').val());
			
			console.log('Tipo Fim 2: '+vcupom);
		}
		
		var id_cliente      = getCookie('id_cliente');
		var email           = getCookie('mail');
						
		if(id_produto==''){ alerta('Campo obrigatório vazio: CÓDIGO DO PRODUTO', 'Alerta', 'Alerta', 'OK'); activate_page("#produtos"); return false; }
		if(id_cliente==''){ alerta('Campo obrigatório vazio: IDENTIFICAÇÃO DO CLIENTE', 'Alerta', 'Alerta', 'OK'); activate_page("#login"); return false; }
		if(id_endereco==''){ alerta('Campo obrigatório vazio: IDENTIFICAÇÃO DO ENDEREÇO', 'Alerta', 'Alerta', 'OK'); activate_page("#endereco"); return false;}
		if(total==''){ alerta('Campo obrigatório vazio: TOTAL DA COMPRA', 'Alerta', 'Alerta', 'OK'); activate_page("#custom"); return false; }
		if(vcupom){
			if(frete){
				var total = parseFloat(vcupom+frete);
			}else{
				var total = parseFloat(vcupom);
			}
		}else{
			if(frete){
				var total = parseFloat(total+frete);
			}else{
				var total = parseFloat(total);
			}
		}
		
		console.log('Total:'+total);
		console.log('Frete:'+frete);
		console.log('Vcupom:'+vcupom);
				
		if(tipo_cartao==1){	
			
			var linkPg = "mercadopago/post_payment.php";
			var token_card      = $("input#tokencard").val();
			var brandcard       = $("input#brandcard").val();
			var paymentMethodId = $("input#paymentMethodId").val();
			
			if(lNmcartao==''){ alerta('Campo obrigatório vazio: NOME DO PROPRIETÁRIO DO CARTÃO', 'Alerta', 'Alerta', 'OK'); return false; }
			if(docNumber==''){ alerta('Campo obrigatório vazio: CPF DO PROPRIETÁRIO DO CARTÃO', 'Alerta', 'Alerta', 'OK'); return false; }
			if(cardNumber==''){ alerta('Campo obrigatório vazio: NÚMERO DO CARTÃO', 'Alerta', 'Alerta', 'OK'); return false; }
			if(lMesVenc==''){ alerta('Campo obrigatório vazio: MÊS DE VENCIMENTO DO CARTÃO', 'Alerta', 'Alerta', 'OK'); return false; }
			if(lAnoVenc==''){ alerta('Campo obrigatório vazio: ANO DE VENCIMENTO DO CARTÃO', 'Alerta', 'Alerta', 'OK'); return false; }
			if(lCodigoSeg==''){ alerta('Campo obrigatório vazio: CÓDIGO DE SEGURANÇA DO CARTÃO', 'Alerta', 'Alerta', 'OK'); return false; }
			if(token_card==''){ alerta('Campo obrigatório vazio: TOKEN DO CARTÃO', 'Alerta', 'Alerta', 'OK'); return false; }
			
			console.log('Cartao de Credito: '+total.toFixed(2));
		
			$.ajax({ type:"POST", dataType:"json", async:true, crossDomain:true,
				url: url_geral+linkPg,
				data: { token_card: token_card, paymentMethodId: paymentMethodId, produto: id_produto, cliente: id_cliente, cpf: docNumber, endereco: id_endereco, total: total.toFixed(2), email: email },
				timeout: 6000000, 
				beforeSend: function(resultado){ $('.loader').show(); },
				complete: function(resultado) {
					console.log('Completo:');
					console.log(resultado.status);
					if(resultado.status==201 || resultado.status==200) {
						obj = jQuery.parseJSON(resultado.responseText);
						console.log(obj);
						var statusLog = obj.response.status;
						console.log(statusLog);					
						if(statusLog!='approved' && tipo_cartao==1){
							$('.loader').hide();
							alerta('Não foi possível realizar o pagamento. Confira os dados do cartão!', 'Alerta', 'Alerta', 'OK');
							activate_page("#perfil");
							get_perfil();
							return false;
						}
						if(tipo_cartao==1 && statusLog=='approved'){ 
							if(tipo_fim==1){ salva_venda(); return false;} else{ salva_venda2(); return false;}
							var lNmcartao  = $('#cardholderName').val();
							$("#docNumber").empty();
							$('#cardNumber').empty();
							$('#cardExpirationMonth').empty();
							$('#cardExpirationYear').empty();
							$('#securityCode').empty();
							return false;
						}
					}
					if(resultado.status!=201 && resultado.status!=200) {
						$('.loader').hide();
						alerta('Não foi possível realizar o pagamento. Confira os dados do cartão!', 'Alerta', 'Alerta', 'OK');						
						return false;
					}
				},
				success: function(resultado){console.log(resultado.status);},
				error: function(resultado) {
					console.log(resultado); console.log(resultado.status); 
					$('.loader').hide(); 
					alerta('Não foi possível realizar o pagamento. Confira os dados, como por exemplo CPF!', 'Alerta', 'Alerta', 'OK'); 
					activate_page("#perfil"); 
					get_perfil();
					return false;
				}
			});
		}else{
			var linkPg = "mercadopago/post_boleto.php"; 
			
			console.log("Boleto: "+total.toFixed(2));
			
			$.ajax({ type:"POST", dataType:"json", async:true, crossDomain:true,
				url: url_geral+linkPg,
				data: { produto: id_produto, cliente: id_cliente, endereco: id_endereco, total: total.toFixed(2), email: email },
				timeout: 6000000, 
				beforeSend: function(resultado){ $('.loader').show(); },
				complete: function(resultado) {
					if(resultado.status==201 || resultado.status==200) {
						obj = jQuery.parseJSON(resultado.responseText);
						console.log(obj);
						$('#link_boleto').html('<a href="'+obj.response.transaction_details.external_resource_url+'" class="button button-full button-dark" target="_blank">ABRIR BOLETO</a>');
						if(tipo_cartao==2){ if(tipo_fim==1){ salva_venda(); return false; }else{ salva_venda2(); return false; }}
						return false;
					}
					if(resultado.status!=201 && resultado.status!=200) {
						$('.loader').hide();
						alerta('Não foi possível realizar o pagamento. Confira os dados do cartão!', 'Alerta', 'Alerta', 'OK');	
						activate_page("#perfil");
						get_perfil();
						return false;
					}
				},
				success: function(resultado){console.log(resultado.status);},
				error: function(resultado) {
					console.log(resultado); console.log(resultado.status); 
					$('.loader').hide(); 
					alerta('Não foi possível realizar o pagamento. Confira os dados, como por exemplo CPF!', 'Alerta', 'Alerta', 'OK'); 
					activate_page("#perfil"); 
					get_perfil();
					return false;
				}
			});
		}
	}
	
	$(document).on("click", "#btn_fim", function(evt){ 									
		$('.cod_pagseguro').html('');
		$('#cod_pagseguro').val('');
		$('.dados_compra').html('');
		
		var tipo_fim = 1;
		checkout_ccard(tipo_fim);
		
		return false;
	});