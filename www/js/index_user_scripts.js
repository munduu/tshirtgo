var url_geral = "https://igestao.fara1.virtuaserver.com.br/igestao/php/";
var url_geral2= "https://igestao.fara1.virtuaserver.com.br/igestao/";

function alerta(mensagem,titulo1,titulo2,botao){
	$('#aviso').show();
	$('#frase_aviso').show();
	$('#titulo_aviso').show();
	$('#botao_aviso').show();
	$('#frase_aviso').html(mensagem);
	$('#titulo_aviso').html(titulo1);
	$('#botao_aviso').html(botao);
}

/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 
function onPhotoDataSuccess(nomec,imageData,nome) 
{
var myImage = new Image();
var thecanvas = document.getElementById(nome);
var ctx = thecanvas.getContext("2d"); 

	myImage.onload = function() { 
	
	var w = $('#w').val();
	var h = $('#h').val();
		
	ctx.clearRect(0, 0, thecanvas.width, thecanvas.height);
	ctx.drawImage(myImage, 0, 0, w, h);
		
	}     
	myImage.src = document.getElementById(nomec).toDataURL();
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

//console.log(url_geral);

function chama_clips(id_evento){
	var id_evento = id_evento;
	//CLIPS
	$("#lista_clip_dados_cat").empty();
	$.ajax({
	type:"GET",
	dataType:"json",
	url: url_geral+"lista_clip_cat.php?token=H424715433852&id_evento="+id_evento,
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			$('.loader').hide();
			
			var tclips = resultado.result.length;
			
			var x;
			for(x=0; x<tclips; x++){
				
				var nome = resultado.result[x].nome;
				var id   = resultado.result[x].id;
				$("#lista_clip_dados_cat").append('<div style="display:inline-block; padding:5px;"><button id="'+id+'" class="button button-dark btn_cat btn_cat_c">'+nome+'</button></div>');
			}
			$("#lista_clip_dados_cat").append('<div style="clear:both;"></div>');
		},
		error: function(resultado) {
			$('.loader').hide();
			chama_clips(id_evento);
		}
		   
	});
}
//CLIPS

//ENDERECO
function get_endereco(page){
	var page = page;
	$('#enderecos_listar').empty();
	var id_cliente = getCookie('id_cliente');
	var id_produto = getCookie('id_produto');
    //console.log(id_cliente);	
	//console.log(id_produto);
	$.ajax({
	type:"GET",
	async:true,
	cache: false,
	crossDomain:true,
	url: url_geral+"lista_enderecos.php?token=H424715433852&id_cliente="+id_cliente+"&id_produto="+id_produto,
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			//console.log(resultado);
			$('.loader').hide();
			$("#enderecos_listar").html(resultado); 
			if(page){
				activate_page(page);
			}
		},
		error: function(resultado) {
			$('.loader').hide();
			get_endereco(page);
		}
		   
	});
}
//ENDERECO

function cor_produto(id_produto,tamanho){
	$("#cores_fundo_backa").empty();
	//COR PRODUTO
	$.ajax({
	type:"GET",
	dataType:"json",
	url: url_geral+"lista_cores.php?token=H424715433852&id_produto="+id_produto+"&tamanho="+tamanho,
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			$('.loader').hide();
			//console.log('Id produto: '+id_produto+' - tamanho: '+tamanho);
			//console.log(resultado);
			var tbacka = resultado.result.length;
			console.log('Teste: '+tbacka);
			var x;
			for(x=0; x<tbacka; x++){
				
				var id  = resultado.result[x].id;
				var cor = resultado.result[x].cor;
				var titulo = resultado.result[x].titulo;
								
				if(cor=='#FFFFFF'){var bcor = '#333';}else{var bcor = cor;}
				if(cor=='#000000'){var bcort = '#FFF';}else{var bcort = '#000';}
				
				$("#cores_fundo_backa").append('<button class="cores_fundo_back cores_fundo_back_c" value="'+id+'" alt="'+cor+'" style="background-color:'+cor+'; border:1px solid '+bcor+';"><span style="font-size:8px; color:'+bcort+'">'+titulo+'</span></button>');
			}
		},
		error: function(resultado) {
			$('.loader').hide();
			cor_produto(id_produto,tamanho);
		}
		   
	});
}
//COR PRODUTO

function cor_produto_frente(id_produto,tamanho){
	$("#cores_fundo_backa").empty();
	$("#shirtDiv").css({'background-color':'#FFFFFF'});
	$("#cor_produto").val('');
	//COR PRODUTO
	$.ajax({
	type:"GET",
	dataType:"json",
	url: url_geral+"lista_cores.php?token=H424715433852&id_produto="+id_produto+"&tamanho="+tamanho,
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		 $("#cores_fundo_back_frente").empty();
		},
		success: function(resultado){
			$('.loader').hide();
			//console.log('Id produto: '+id_produto+' - tamanho: '+tamanho);
			console.log(resultado);
			var tbacka = resultado.result.length;
			console.log('Teste: '+tbacka);
			var x;
			
			if(tbacka>0){
				$('.cor_se_tiver').show();
			}else{
				$('.cor_se_tiver').hide();
			}
			
			for(x=0; x<tbacka; x++){
				
				var id  = resultado.result[x].id;
				var cor = resultado.result[x].cor;
				var titulo = resultado.result[x].titulo;
								
				if(cor=='#FFFFFF'){var bcor = '#333';}else{var bcor = cor;}
				if(cor=='#000000'){var bcort = '#FFF';}else{var bcort = '#000';}
				
				$("#cores_fundo_back_frente").append('<button class="cores_fundo_back_frente cores_fundo_back_c" value="'+id+'" alt="'+cor+'" style="background-color:'+cor+'; border:1px solid '+bcor+'; -moz-border-radius: 50%;  -webkit-border-radius: 50%; border-radius: 50%; margin:10px;"><span style="font-size:8px; color:'+bcort+'">'+titulo+'</span></button>');
			}
		},
		error: function(resultado) {
			$('.loader').hide();
			cor_produto_frente(id_produto,tamanho);
		}
		   
	});
}
//COR PRODUTO

//DEVICE
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //console.log(device.cordova);
}
//DEVICE

//BLACK CANVAS
function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
	
    return canvas.toDataURL() == blank.toDataURL();
}
//BLACK CANVAS
 function register_event_handlers()
 {
        
	/* button  INICIAR */
    $(document).on("click", ".btn_iniciar", function(evt)
    {
         /*global activate_page */
		
		//EVENTOS
		function lista_eventos_fim(){
			$.ajax({
			type:"GET",
			url: url_geral+"lista_eventos.php?token=H424715433852",
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					$("#slc_eventos").html(resultado);
				},
				error: function(resultado) {
					$('.loader').hide();
					lista_eventos_fim();
				}
				   
			});
		} lista_eventos_fim();
		//EVENTOS

		//PATTERNS
		function lista_patterns_fim(){
			$("#patterns_clips").empty();
			$.ajax({
			type:"GET",
			dataType:"json",
			url: url_geral+"lista_patterns.php?token=H424715433852",
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					
					var tpat = resultado.result.length;
					
					var x;
					for(x=0; x<tpat; x++){
						
						var link_pat = resultado.result[x].links;
						var link_pat_mini = resultado.result[x].links_mini;
						$("#patterns_clips").append('<div style="display:inline-block; padding:5px;"><img class="patternx patternx_c" alt="'+link_pat+'" src="'+link_pat_mini+'"/></div>');
					}
					$("#patterns_clips").append('<div style="clear:both;"></div>');
				},
				error: function(resultado) {
					$('.loader').hide();
					lista_patterns_fim();
				}
				   
			});
		} lista_patterns_fim();
		//PATTERNS
		
		//PATTERNS BG
		function lista_patternsbg_fim(){
			$("#patternsbg_clips").empty();
			$.ajax({
			type:"GET",
			dataType:"json",
			url: url_geral+"lista_patternsbg.php?token=H424715433852",
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					
					var tpat = resultado.result.length;
					
					var x;
					for(x=0; x<tpat; x++){
						
						var link_pat = resultado.result[x].links;
						var link_pat_mini = resultado.result[x].links_mini;
						$("#patternsbg_clips").append('<div style="display:inline-block; padding:5px;"><img class="patternxbg patternxbg_c" alt="'+link_pat+'" src="'+link_pat_mini+'"/></div>');
					}
					$("#patternsbg_clips").append('<div style="clear:both;"></div>');
				},
				error: function(resultado) {
					$('.loader').hide();
					lista_patternsbg_fim();
				}
				   
			});
		} lista_patternsbg_fim();
		//PATTERNS BG
		
		//TIRAS
		function lista_tiras_fim(){
			$("#tiras").empty();
			$.ajax({
			type:"GET",
			dataType:"json",
			url: url_geral+"lista_tiras.php?token=H424715433852",
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					
					var tpat = resultado.result.length;
					
					var x;
					for(x=0; x<tpat; x++){
						
						var id       = resultado.result[x].id;
						var link_pat = resultado.result[x].links;
						var link_pat_mini = resultado.result[x].links_mini;
						$("#tiras").append('<div style="display:inline-block; padding:2px; width:50%;"><img class="tirasbg tirasbg_c" alt="'+link_pat+';'+id+'" src="'+link_pat_mini+'"/></div>');
					}
					$("#tiras").append('<div style="clear:both;"></div>');
				},
				error: function(resultado) {
					$('.loader').hide();
					lista_tiras_fim();
				}
				   
			});
		} lista_tiras_fim();
		//TIRAS
				
		//FONTES
		function lista_fontes_fim(){
			$.ajax({
			type:"GET",
			dataType:"json",
			url: url_geral+"lista_fontes.php?token=H424715433852",
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					var tfontes = resultado.result.length;
					
					var x;
					for(x=0; x<tfontes; x++){
						
						var nome_fonte = resultado.result[x].nome;
						var link_fonte = resultado.result[x].link2;
						$("head").prepend("<style type=\"text/css\">" + 
							"@font-face {\n" +
								"\tfont-family: "+nome_fonte+";\n" + 
								"\tsrc: local('"+link_fonte+"'), url('"+link_fonte+"') format('opentype');\n" + 
							"}\n" + 
								"\tp.myClass {\n" + 
								"\tfont-family: "+nome_fonte+" !important;\n" + 
							"}\n" + 
						"</style>");
						$("#div_fonts").prepend("<div style=\"font-family:'"+nome_fonte+"'\">&nbsp;</div>");
						
					}
					
					$("#lista_fontes").empty();
					
					var y;
					for(y=0; y<tfontes; y++){
								
						var nome_fonte = resultado.result[y].nome;
						$("#lista_fontes").append(
						'<div style="display:inline-block; padding:15px;">'+
							'<a href="#" class="fonte_tipo fonte_tipo_c" alt="'+nome_fonte+'" style="font-family:'+nome_fonte+';">Aa1</a>'+
						'</div>');
					}
				},
				error: function(resultado) {
					$('.loader').hide();
					lista_fontes_fim();
				}
				   
			});
		} lista_fontes_fim();
		//FONTES
		
		//CORES
		function lista_cores_fim(){
			$("#cores_texto").empty();
			$("#cores_fundo").empty();
			$("#cores_fundo_canvas").empty();
			var cores  = "#ffffff;#000000;#E30513;#FFED00;#009640;#009EE3;#302683;#E5007D;#BE1621;#E6332A;#E84E1B;#F39200;#F9B233;#FCEA0F;#DDDC00;#95C11E;#3AA935;#008D36;#006532;#2EAC66;#00A09A;#000000;#36A9E0;#2C2E83;#28225C;#662382;#951B81;#A2195B;#D60A51;#E61D72;#CABB9F;#A4897A;#7A6958;#624E42;#C99D66;#B17E49;#925F36;#7D4E24;#683B10;#422918;#1C1C1B;#3C3C3B;#575756;#6F6F6E;#878786;#9D9C9C;#B2B2B1;#C6C6C5;#DADAD9;#ECECEC";
			var dcores = cores.split(';');
			var tcores = dcores.length;
			var x;
			for(x=0; x<tcores; x++){
				var cores = dcores[x];
				if(cores=='#ffffff'){
					var bcor = '#333';
				}else{
					var bcor = cores;
				}
				$("#cores_texto").append('<button class="cores_texto color_text color_text_c" value="'+cores+'" style="background-color:'+cores+'; border:1px solid '+bcor+';"></button>');
				$("#cores_fundo").append('<button class="cores_fundo color_text2 color_text_c" value="'+cores+'" style="background-color:'+cores+'; border:1px solid '+bcor+';"></button>');
				//$("#cores_fundo_canvas").append('<button class="cores_fundo_canvas color_text_c" value="'+cores+'" style="background-color:'+cores+'; border:1px solid '+bcor+';"></button>');
			}
		} lista_cores_fim();
		//CORES
		 
        activate_page("#eventos"); 
        return false;
    });
	
	 /* button  CAT CLIPS */
    $(document).on("click", ".btn_cat", function(evt)
    {
		var tema = $(this).attr('id');
		$('#lista_clip_dados').empty();
		$('#lista_clip_dados').show();
		$('#lista_clip_dados_cat').hide();
		$(".btn-close-clips-voltar").show();
		
		/*global activate_page */		 	 
        $.ajax({
        type:"GET",
		dataType:"json",
        url: url_geral+"lista_clip.php?token=H424715433852&tema="+tema,
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                
				var tpat = resultado.result.length;
				
				var x;
				for(x=0; x<tpat; x++){
					
					var link_pat = resultado.result[x].links;
					var link_pat_mini = resultado.result[x].links_mini;
					$("#lista_clip_dados").append('<div style="display:inline-block; padding:5px;"><img class="img-polaroid img-polaroid_c" alt="'+link_pat+'" src="'+link_pat_mini+'"/></div>');
				}
				$("#lista_clip_dados").append('<div style="clear:both;"></div>');
            },
			error: function(resultado) {
				$('.loader').hide();
            }
               
        });
        return false;
    });
	
	 /* button  LISTA FONTES */
    $(document).on("click", ".btn_lista_fontes", function(evt)
    {
        $(".fonte_det").show();
		$(".btn-close-fontes").show();
		$("#imageeditor").hide();
        return false;
    });
	
	 /* button  CLIPS */
    $(document).on("click", ".btn-close-clips-voltar", function(evt)
    {
         /*global activate_page */
		 $("#lista_clip_dados_cat").show();
		 $("#lista_clip_dados").hide();
		 $(".btn-close-clips-voltar").hide();
         return false;
    });
	
	 /* button  TIPO EVENTO */
    $(document).on("change", ".tipo_evento", function(evt)
    {
         /*global activate_page */		 	 
        activate_page("#produtos"); 
        return false;
    });
	
	 /* button  CASA */
    $(document).on("click", ".btn_casa", function(evt)
    {
        $("#slc_eventos").val('');
		 
		 /*global activate_page */
        $.ajax({
		type:"GET",
		url: url_geral+"lista_produtos.php?token=H424715433852",
		timeout: 200000, 
			beforeSend: function(resultado){ 
			 $('.loader').show();
			},
			success: function(resultado){
				$('.loader').hide();
				$("#lista_produtos").html(resultado);
				setCookie("id_evento",0);
				chama_clips(0);
				activate_page("#produtos");
			},
			error: function(resultado) {
				$('.loader').hide(); 
			}
			   
		});
			 
         return false;
    });
	
	 /* button  EVENTO */
    $(document).on("click", ".btn_evento", function(evt)
    {
         /*global activate_page */
         $('.btn_evento_lista').fadeToggle( "slow", "linear" );
         return false;
    });
	
     /* button  PRODUTOS COMPRADOS */
    $(document).on("click", ".btn_produtos_comprados", function(evt)
    {
          /*global activate_page */
		var id_cliente = getCookie('id_cliente'); 
		$("#lista_produtos_comprados").empty();
		//console.log('cliente:'+id_cliente);
		$.ajax({
        type:"GET",
        url: url_geral+"lista_produtos_comprados.php?token=H424715433852&id_cliente="+id_cliente,
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                $("#lista_produtos_comprados").html(resultado);
            },
			error: function(resultado) {
				$('.loader').hide();
            }
               
        });
		 
         activate_page("#produtos_comprados"); 
         return false;
    });	
	
	function produtos_comp(){
		var id_cliente = getCookie('id_cliente'); 
		$("#lista_produtos_comprados").empty();
		//console.log('cliente:'+id_cliente);
		$.ajax({
        type:"GET",
        url: url_geral+"lista_produtos_comprados.php?token=H424715433852&id_cliente="+id_cliente,
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                $("#lista_produtos_comprados").html(resultado);
            },
			error: function(resultado) {
				$('.loader').hide();
				produtos_comp();
            }
               
        });
	}

	/* button  CONFIRMA EVENTO */
    $(document).on("click", ".btn_evento_confirma", function(evt)
    {
         /*global activate_page */
		var id_evento  = $("#slc_eventos").val();
		setCookie("id_evento",id_evento);
		
		if(id_evento>0){
		
			$.ajax({
			type:"GET",
			url: url_geral+"lista_produtos.php?token=H424715433852&id_evento="+id_evento,
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					$("#lista_produtos").html(resultado);
					chama_clips(id_evento);
				},
				error: function(resultado) {
					$('.loader').hide();
				}
				   
			});
			 
			 activate_page("#produtos"); 
		}else{
			alerta('Selecione um loja ou clique (Receber em Casa)!', 'EVENTO', 'Evento', 'OK');
		}
         return false;
    });	
	
	 /* button  DETALHADO */
    $(document).on("click", ".btn_produto_detalhado", function(evt)
    {
          /*global activate_page */
		 
		var value_prod = $(this).attr("alt");
		//console.log(value_prod);
		var value_prod = value_prod.split(';');
		
		var id_produto = value_prod[0];
		
		setCookie("id_produto",value_prod[0]);
		setCookie("preco",value_prod[1].replace(',','.'));
		setCookie("precov",value_prod[2].replace(',','.'));
		
		var id_evento  = $("#slc_eventos").val();
				
		//getPageSize();
		
		$.ajax({
        type:"GET",
        url: url_geral+"lista_produtos_detalhado.php?token=H424715433852&id_produto="+id_produto+"&id_evento="+id_evento,
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                $("#produto_detalhado").html(resultado);
            },
			error: function(resultado) {
				$('.loader').hide();
            }
               
        });
		 
        activate_page("#produtos_detalhado"); 
        return false;
    });
	
	$(document).on("change", "#slc_tamanho", function(evt)
    {
		var id_produto = getCookie('id_produto');
		var tamanho    = $('#slc_tamanho').val();
		cor_produto_frente(id_produto,tamanho);
	});
		
	 /* button  CUSTOM */
    $(document).on("click", ".btn_custom", function(evt)
    {
        /*global activate_page */
		var id_produto = getCookie('id_produto');
		var tamanho    = $('#slc_tamanho').val();
		
		$(".ChineloSob").attr('src','');
		
		if(tamanho==0){
			alerta('Campo obrigatório vazio: TAMANHO', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		//BUSCAR COR DOS PRODUTOS
		cor_produto(id_produto,tamanho);
		//console.log(id_produto+tamanho);
				
		$.ajax({
        type:"GET",
        url: url_geral+"lista_produtos_detalhado_img.php?token=H424715433852&id_produto="+id_produto+"&tamanho="+tamanho,
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                $("#produto_detalhado2").html(resultado);
				
				//var id_src     = $("#produto").val();
										
				$("#tcanvas").show();
						
				if(id_produto==7 || id_produto==9 ||  id_produto==15 ||  id_produto==16){
					$("#flip_buttom").show();
					$("#tiras").hide();
					$(".button_tiras_mp").hide();
					$("#tiras_title").hide();
				}
				
				else if(id_produto==8){
					$("#tiras").show();
					$(".tiras_title").show();
					$(".button_tiras_mp").show();
					$("#flip_buttom").hide();
				}
				
				else{
					$("#tiras").hide();
					$(".tiras_title").hide();
					$(".button_tiras_mp").hide();
					$("#flip_buttom").hide();
				}
				
				var value_x = $('option:selected', '#slc_tamanho').attr('alt');
				var value_x = value_x.split(';');
				
				var mtp     = parseFloat(value_x[1]/2);
				var mlp     = parseFloat(value_x[0]/2);
				
				$("#w").val(value_x[0]);
				$("#h").val(value_x[1]);
				
				defineCSS(id_produto,value_x[0],value_x[1],value_x[4],mtp,mlp);
										
				activate_page("#custom"); 
				$("#aviso_foto").show();
				return false;
				
            },
			error: function(resultado) {
				$('.loader').hide();
            },
			complete: function(resultado) {
				if(window.orientation == 0){
					var orient = 'P';
				}else{
					var orient = 'L';
				}								
			}
               
        });
    });
	
	/* button  CADASTRAR */
    $(document).on("click", ".btn_cadastrar", function(evt)
    {
        /*global activate_page */
		var lNome      = $("#lNome").val();
		var lCPF       = $("#lCPF").val();
		var lEmail     = $("#lEmail").val();
		var lDDD       = $("#lDDD").val();
		var lDDD2      = $("#lDDD2").val();
		var lTel       = $("#lTel").val();
		var lCel       = $("#lCel").val();
		var lSenha     = $("#lSenha").val();
		var token_id   = getCookie('token_id');
		
		if(lNome==''){
			alerta('Campo obrigatório vazio: Nome', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		/*if(lCPF==''){
			alerta('Campo obrigatório vazio: CPF', 'Alerta', 'Alerta', 'OK');
			return false;
		}*/
		if(lEmail==''){
			alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lDDD==''){
			alerta('Campo obrigatório vazio: DDD', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lTel==''){
			alerta('Campo obrigatório vazio: Telefone', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lSenha==''){
			alerta('Campo obrigatório vazio: Senha', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		var dados_envia = {"lNome": lNome,"lCPF":lCPF,"lEmail":lEmail,"lTel":lTel,"lCel":lCel,"lSenha":lSenha, "token_id": token_id,"token":"H424715433852"};
			
		$.ajax({
        type:"POST",
		dataType:"json",
        url: url_geral+"cadastrar.php",
		data:{"lNome": lNome,"lCPF":lCPF,"lEmail":lEmail,"lDDD":lDDD,"lDDD2":lDDD2,"lTel":lTel,"lCel":lCel,"lSenha":lSenha,"token":"H424715433852"},
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                if(resultado.error==1){
					activate_page("#mainpage");
				}else{
					alerta(resultado.dados, 'Alerta', 'Sucesso', 'OK');
					activate_page("#login");
				}
            },
			error: function(resultado) {
				$('.loader').hide();
				alerta('Não foi possível acessar!', 'CADASTRAR', 'Error', 'OK');
				activate_page("#perfil");
			}
               
        });
		
        return false;
    });
	
	/* button  CADASTRAR */
    $(document).on("click", ".btn_alterar", function(evt)
    {
        /*global activate_page */
		var lNome      = $("#lNome").val();
		var lCPF       = $("#lCPF").val();
		var lEmail     = $("#lEmail").val();
		var lDDD       = $("#lDDD").val();
		var lDDD2      = $("#lDDD2").val();
		var lTel       = $("#lTel").val();
		var lCel       = $("#lCel").val();
		var lSenha     = $("#lSenha").val();
		var token_id   = getCookie('token_id');
		
		var id_cliente = getCookie('id_cliente');
		
		if(lNome==''){
			alerta('Campo obrigatório vazio: Nome', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		/*if(lCPF==''){
			alerta('Campo obrigatório vazio: CPF', 'Alerta', 'Alerta', 'OK');
			return false;
		}*/
		if(lEmail==''){
			alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lDDD==''){
			alerta('Campo obrigatório vazio: DDD', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lTel==''){
			alerta('Campo obrigatório vazio: Telefone', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lSenha==''){
			alerta('Campo obrigatório vazio: Senha', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		var dados_envia = {"lNome": lNome,"lCPF":lCPF,"lEmail":lEmail,"lTel":lTel,"lCel":lCel,"lSenha":lSenha, "token_id": token_id,"token":"H424715433852"};
			
		$.ajax({
        type:"POST",
		dataType:"json",
        url: url_geral+"alterar.php",
		data:{"id":id_cliente,"lNome": lNome,"lCPF":lCPF,"lEmail":lEmail,"lDDD":lDDD,"lDDD2":lDDD2,"lTel":lTel,"lCel":lCel,"lSenha":lSenha,"token":"H424715433852"},
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                if(resultado.error==1){
					activate_page("#perfil");
				}else{
					alerta(resultado.dados, 'Alerta', 'Sucesso', 'OK');
					activate_page("#endereco");
				}
            },
			error: function(resultado) {
				$('.loader').hide();
				alerta('Não foi possível acessar!', 'CADASTRAR', 'Error', 'OK');
				activate_page("#perfil");
				get_perfil();
			}
               
        });
		
        return false;
    });
	
	/* button  CADASTRAR */
    $(document).on("click", ".btn_cadastrar2", function(evt)
    {
        /*global activate_page */
		var lNome      = $(".lNome").val();
		var lCPF       = $(".lCPF").val();
		var lEmail     = $(".lEmail").val();
		var lDDD       = $(".lDDD").val();
		var lDDD2      = $(".lDDD2").val();
		var lTel       = $(".lTel").val();
		var lCel       = $(".lCel").val();
		var lSenha     = $(".lSenha").val();
		var token_id   = getCookie('token_id');
		
		if(lNome==''){
			alerta('Campo obrigatório vazio: Nome', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		/*if(lCPF==''){
			alerta('Campo obrigatório vazio: CPF', 'Alerta', 'Alerta', 'OK');
			return false;
		}*/
		if(lEmail==''){
			alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lDDD==''){
			alerta('Campo obrigatório vazio: DDD', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lTel==''){
			alerta('Campo obrigatório vazio: Telefone', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lSenha==''){
			alerta('Campo obrigatório vazio: Senha', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		var dados_envia = {"lNome": lNome,"lCPF":lCPF,"lEmail":lEmail,"lTel":lTel,"lCel":lCel,"lSenha":lSenha, "token_id": token_id,"token":"H424715433852"};
			
		$.ajax({
        type:"POST",
		dataType:"json",
        url: url_geral+"cadastrar.php",
		data:{"lNome": lNome,"lCPF":lCPF,"lEmail":lEmail,"lDDD":lDDD,"lDDD2":lDDD2,"lTel":lTel,"lCel":lCel,"lSenha":lSenha,"token":"H424715433852"},
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                if(resultado.error==1){
					activate_page("#mainpage");
				}else{
					alerta(resultado.dados, 'Alerta', 'Sucesso', 'OK');
					activate_page("#login2");
				}
            },
			error: function(resultado) {
				$('.loader').hide();
				alerta('Não foi possível acessar!', 'CADASTRAR', 'Error', 'OK');
				activate_page("#perfil2");
			}
               
        });
		
        return false;
    });
	
	/* button  CADASTRAR ENDEREÇO */
    $(document).on("click", ".btn_cadastrar_endereco", function(evt)
    {
        /*global activate_page */
		var lCep         = $("#lCep").val();
		var lEndereco    = $("#lEndereco").val();
		var lNumero      = $("#lNumero").val();
		var lBairro      = $("#lBairro").val();
		var lComplemento = $("#lComplemento").val();
		var lCidade      = $("#lCidade").val();
		var lEstado      = $("#lEstado").val();
		var id_cliente   = getCookie('id_cliente');
		var token_id     = getCookie('token_id');
		
		if(lCep==''){
			alerta('Campo obrigatório vazio: CEP', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lEndereco==''){
			alerta('Campo obrigatório vazio: Endereço', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lNumero==''){
			alerta('Campo obrigatório vazio: Número', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lBairro==''){
			alerta('Campo obrigatório vazio: Bairro', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lCidade==''){
			alerta('Campo obrigatório vazio: Cidade', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		if(lEstado==''){
			alerta('Campo obrigatório vazio: Estado', 'Alerta', 'Alerta', 'OK');
			return false;
		}
					
		$.ajax({
        type:"POST",
		dataType:"json",
        url: url_geral+"cadastrar_endereco.php",
		data:{"id_cliente":id_cliente, "lCep": lCep,"lEndereco":lEndereco,"lNumero":lNumero,"lBairro":lBairro,"lComplemento":lComplemento,"lCidade":lCidade,"lEstado":lEstado,"token":"H424715433852"},
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                if(resultado.erro==1){
					activate_page("#cadastrar_endereco");
				}else{
					alerta(resultado.dados, 'Alerta', 'Sucesso', 'OK');
					get_endereco("#endereco");
				}
            },
			error: function(resultado) {
				$('.loader').hide();
				alerta('Não foi possível acessar!', 'CADASTRAR', 'Error', 'OK');
				activate_page("#cadastrar_endereco");
			}
               
        });
		
        return false;
    });
	
	/* button  VALIDAR CUPOM */
    $(document).on("click", ".validar_cupom", function(evt)
    {
        /*global activate_page */
		var cupom        = $("#cupom").val();
		var total        = getCookie('total');
		var token_id     = getCookie('token_id');
		
		if(cupom==''){
			alerta('Campo obrigatório vazio: CUPOM', 'Alerta', 'Alerta', 'OK');
			return false;
		}
					
		$.ajax({
        type:"POST",
		dataType:"json",
        url: url_geral+"valida_cupom.php",
		data:{"cupom":cupom, "total": total,"token":"H424715433852"},
        timeout: 200000, 
			beforeSend: function(resultado){ 
             $('.loader').show();
            },
            success: function(resultado){
				$('.loader').hide();
                if(resultado.erro==1){
					alerta(resultado.dados, 'Alerta', 'Sucesso', 'OK');
					$('#vcupom').val('');
					$('#ncupom').val('');
					setCookie('vcupom','');
					setCookie('ncupom','');
				}else{
					alerta(resultado.dados, 'Alerta', 'Sucesso', 'OK');
					$('#vcupom').val(resultado.vcupom);
					$('#ncupom').val(resultado.cupom);
					setCookie('vcupom',resultado.vcupom);
					setCookie('ncupom',resultado.cupom);
				}
            },
			error: function(resultado) {
				$('.loader').hide();
				alerta('Não foi possível acessar!', 'CADASTRAR', 'Error', 'OK');
			}
               
        });
		
        return false;
    });
	
	/* button  LOGIN */
    $(document).on("click", ".btn_login", function(evt)
    {
		if(getCookie('id_cliente')<=0){
		
			var login_email = $("#login-email").val();
			var login_senha = $("#login-senha").val();
			var token_id    = $("#token_id").val();
			
			if(login_email==''){
				alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
				return false;
			}
			
			if(login_senha==''){
				alerta('Campo obrigatório vazio: Senha', 'Alerta', 'Alerta', 'OK');
				return false;
			}
						
			$.ajax({
			type:"POST",
			dataType:"json",
			url: url_geral+"login.php",
			data:{"login_email": login_email,"login_senha":login_senha,"token_id":token_id,"token":"H424715433852"},
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					if(resultado.erro==1){	
						
						setCookie('id_cliente',resultado.id_cliente);
						setCookie('mail',login_email);
						setCookie('mp_public_key',resultado.mp_public_key);
							
						$.getScript('js/mercadopago.js', function() {
							 console.log('Javascript is loaded successful!');
						});
						
						if(getCookie('id_evento')>0){
							window.setTimeout(function(){ 
								  $('.loader').show();
								  salva_venda();
							}, 5000);
						}else{
							get_endereco("#endereco");
						}						
						
					}else{
						alerta(resultado.dados, 'Alerta', 'Alerta', 'OK');
						activate_page("#login");
					}
				},
				error: function(resultado) {
					$('.loader').hide();
					alerta('Não foi possível acessar!', 'LOGIN', 'Error', 'OK');
					activate_page("#login");
				}
				   
			});
		}else{
			var id_evento = getCookie('id_evento'); 
			var endereco  = $('input[name=slc_endereco]:checked').val();
			
			if(id_evento>0){
				activate_page("#custom");
			}else{
				get_endereco("#endereco");
			}
		}
				
        return false;
    });
	
	/* button  LOGIN2 */
    $(document).on("click", ".btn_login2", function(evt)
    {
		if(getCookie('id_cliente')<=0){
		
			var login_email = $("#login-email2").val();
			var login_senha = $("#login-senha2").val();
			var token_id    = $("#token_id").val();
			
			if(login_email==''){
				alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
				return false;
			}
			
			if(login_senha==''){
				alerta('Campo obrigatório vazio: Senha', 'Alerta', 'Alerta', 'OK');
				return false;
			}
						
			$.ajax({
			type:"POST",
			dataType:"json",
			url: url_geral+"login.php",
			data:{"login_email": login_email,"login_senha":login_senha,"token_id":token_id,"token":"H424715433852"},
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					if(resultado.erro==1){	
						
						setCookie('id_cliente',resultado.id_cliente);
						setCookie('mail',login_email);
						setCookie('mp_public_key',resultado.mp_public_key);
						
						$.getScript('js/mercadopago.js', function() {
							 console.log('Javascript is loaded successful!');
						});
						
						activate_page("#produtos_comprados");
						$("#login2_fim_ok").hide();
						$("#logout").show();
						produtos_comp();
						
					}else{
						alerta(resultado.dados, 'Alerta', 'Alerta', 'OK');
						activate_page("#login2");
					}
				},
				error: function(resultado) {
					$('.loader').hide();
					alerta('Não foi possível acessar!', 'LOGIN', 'Error', 'OK');
					activate_page("#login2");
				}
				   
			});
		}else{
			activate_page("#produtos_comprados");
		}
				
        return false;
    });
	
	/* button  ESQUECI */
    $(document).on("click", ".btn_esqueci", function(evt)
    {
		
			var login_email = $("#login-email").val();
						
			if(login_email==''){
				alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
				return false;
			}
											
			$.ajax({
			type:"POST",
			dataType:"json",
			url: url_geral+"esqueci.php",
			data:{"login_email": login_email,"token":"H424715433852"},
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					if(resultado.erro==1){	
						alerta('Confira seu e-mail com as instruções!', 'Alerta', 'Alerta', 'OK');
					}else{
						alerta(resultado.dados, 'Alerta', 'Alerta', 'OK');
					}
				},
				error: function(resultado) {
					$('.loader').hide();
					alerta('Não foi possível acessar!', 'LOGIN', 'Error', 'OK');
					return false;
				}
				   
			});				
        return false;
    });
	
	/* button  ESQUECI */
    $(document).on("click", ".btn_esqueci2", function(evt)
    {
		
			var login_email = $("#login-email2").val();
						
			if(login_email==''){
				alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
				return false;
			}
											
			$.ajax({
			type:"POST",
			dataType:"json",
			url: url_geral+"esqueci.php",
			data:{"login_email": login_email,"token":"H424715433852"},
			timeout: 200000, 
				beforeSend: function(resultado){ 
				 $('.loader').show();
				},
				success: function(resultado){
					$('.loader').hide();
					if(resultado.erro==1){	
						alerta('Confira seu e-mail com as instruções!', 'Alerta', 'Alerta', 'OK');
					}else{
						alerta(resultado.dados, 'Alerta', 'Alerta', 'OK');
					}
				},
				error: function(resultado) {
					$('.loader').hide();
					alerta('Não foi possível acessar!', 'LOGIN', 'Error', 'OK');
					return false;
				}
				   
			});				
        return false;
    });
		
	/* button  LOGOUT */
	$(document).on("click", ".btn-logout", function(evt)
    { 
		/*global activate_page */	
		activate_page("#produtos_comprados");
		setCookie('id_cliente','');
		$("#login2_fim_ok").show();
		$("#login2_fim_ok2").show();
		$("#logout").hide();
		$("#lista_produtos_comprados_fim").empty();
		produtos_comp();
		return false;
    });
	
	/* button  FINALIZA */
	$(document).on("click", ".btn-cadastrar_endereco", function(evt)
    { 
		/*global activate_page */
		$("#lCep").empty();
		$("#lEndereco").empty();
		$("#lNumero").empty();
		$("#lBairro").empty();
		$("#lComplemento").empty();
		$("#lCidade").empty();
		$("#lEstado").empty();
		activate_page("#cadastrar_endereco");
		return false;
    });
	
	/* button  CADASTRAR ENDEREÇO */
	$(document).on("click", ".btn_finaliza", function(evt)
    { 
		/*global activate_page */	
		$("#video-player").each(function () { this.play() });
		$("#link_boleto").html('');
		activate_page("#mainpage");
		return false;
    });
				
	  /* button  EDITA TEXTO */
    $(document).on("click", ".text-edit", function(evt)
    {
         /*global activate_page */
		 $("#imageeditor").hide();
		 
		 $(".clips").hide();
		 $(".filtros").hide();
		 $(".efeitos").hide();
		 $(".efeitos_edit").hide();
		 $(".view-snap").hide();
		 $(".pattern_menu").hide();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").hide();
         $(".text_edit_bar").fadeToggle( "slow", "linear" );
         return false;
    });
	
	 /* button  SNAP */
    $(document).on("click", ".snap", function(evt)
    {
         /*global activate_page */
		 
		 $(".clips").hide();
		 $(".filtros").hide();
		 $(".efeitos").hide();
		 $(".efeitos_edit").hide();
		 $(".text_edit_bar").hide();
		 $(".pattern_menu").hide();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").hide();
		 $(".btn-close-fotos").show();
         $(".view-snap").fadeToggle( "slow", "linear" );
         return false;
    });
	
	 /* button  CLIP EDIT */
    $(document).on("click", ".btn-clip-edit", function(evt)
    {
         /*global activate_page */
		 $(".loader").show();
		 $("#imageeditor").hide();
		 
		 $(".filtros").hide();
		 $(".efeitos").hide();
		 $(".efeitos_edit").hide();
		 $(".view-snap").hide();
		 $(".pattern_menu").hide();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").hide();
		 $(".text_edit_bar").hide();
		 
		 var query = $("#lista_clip_dados_cat");
		 var isVisible = query.is(':visible');
 
		 if (isVisible === true) {
			 $(".btn-close-clips-voltar").hide();
			 $(".btn_sacola_css").show();
		 }else{
			 $(".btn-close-clips-voltar").show();
			 $(".btn_sacola_css").hide();
		 }
         $(".clips").fadeToggle( "slow", "linear" );
		 $(".btn_sacola_css").hide();
		 $(".btn-close-clips").toggle();
		 $(".loader").hide();
         return false;
    });
	
	/* button  FILTROS */
    $(document).on("click", ".btn-filtros", function(evt)
    {
         /*global activate_page */
		 $(".clips").hide();
		 $(".efeitos").hide();
		 $(".efeitos_edit").hide();
		 $(".view-snap").hide();
		 $(".text_edit_bar").hide();
		 $(".btn-close-filtros").show();
		 $(".pattern_menu").hide();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").hide();
         $(".filtros").fadeToggle( "slow", "linear" );
         return false;
    });
	
	 /* button  EFEITOS */
    $(document).on("click", ".btn-efeitos", function(evt)
    {
         /*global activate_page */
		 $(".loader").show();
		 $(".clips").hide();
		 $(".filtros").hide();
		 $(".view-snap").hide();
		 $(".text_edit_bar").hide();
         $(".efeitos_edit").fadeToggle( "slow", "linear" );
		 $(".loader").hide();
		 $(".cfp").hide();
		 $(".ct").hide();
		 $(".mp").hide();
		 $(".pattern_menu").hide();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").hide();
         return false;
    });
	
	/* button  EFEITOS COR DE FUNDO */
    $(document).on("click", ".btn_cfp", function(evt)
    {
         /*global activate_page */
		 $(".text_edit_bar").hide();
         $(".efeitos").show();
		 $(".efeitos_edit").hide();
		 $(".pattern_menu").hide();
		 $(".cfp").show();
		 $(".btn-close-efeitos").show();
		 $(".ct").hide();
		 $(".mp").hide();
		 
		 var id_produto = getCookie('id_produto');
		 if(id_produto==7 || id_produto==9 ||  id_produto==15){
			$(".cfpp").show();
		}
		 
         return false;
    });
	
	/* button  EFEITOS COR TIRAS */
    $(document).on("click", ".btn_ct", function(evt)
    {
         /*global activate_page */
         $(".text_edit_bar").hide();
		 $(".efeitos").show();
		 $(".efeitos_edit").hide();
		 $(".pattern_menu").hide();
		 $(".ct").show();
		 $(".btn-close-efeitos").show();
		 $(".cfp").hide();
		 $(".mp").hide();
         return false;
    });
	
	/* button  EFEITOS MÁSCARAS */
    $(document).on("click", ".btn_mp", function(evt)
    {
         /*global activate_page */
         $(".text_edit_bar").hide();
		 $(".efeitos").hide();
		 $(".mp").hide();
		 $(".efeitos_edit").hide();
		 $(".pattern_menu").show();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").hide();
		 $(".btn-close-efeitos").hide();
		 $(".cfp").hide();
		 $(".ct").hide();
         return false;
    });
	
	/* button  FOTO CAMERA */
    $(document).on("click", ".btn_fotocam1", function(evt)
    {
        /*global activate_page */
        $(".text_edit_bar").hide();
		$(".efeitos").hide();
		$(".mp").hide();
		$(".efeitos_edit").hide();
		$(".pattern_menu").hide();
		$(".foto_menu1").show();
		$(".foto_menu2").hide();
		$(".btn-close-efeitos").hide();
		$(".cfp").hide();		
		$(".ct").hide();
		$(".filtros").hide();
		 
		//$('#frase_aviso').html('Os arquivos podem ser do tipo JPG ou PNG. A resolução mínima 200dpi. E a camiseta poderá sofrer divergência nas cores e/ou tamanho após impressão!');
		//$('#aviso').show();
				
		var segundos = 10;
		setTimeout(function(){
		  $('#aviso').fadeOut();
		}, segundos*1000);
         return false;
    });
	
	/* button  FOTO CAMERA2 */
    $(document).on("click", ".btn_fotocam2", function(evt)
    {
         /*global activate_page */
         $(".text_edit_bar").hide();
		 $(".efeitos").hide();
		 $(".mp").hide();
		 $(".efeitos_edit").hide();
		 $(".pattern_menu").hide();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").show();
		 $(".btn-close-efeitos").hide();
		 $(".cfp").hide();
		 $(".ct").hide();
		 $(".filtros").hide();
		 
		//$('#frase_aviso').html('Os arquivos podem ser do tipo JPG ou PNG. A resolução mínima 200dpi. E a camiseta poderá sofrer divergência nas cores e/ou tamanho após impressão!');
		//$('#aviso').show();
				
		var segundos = 10;
		setTimeout(function(){
		  $('#aviso').fadeOut();
		}, segundos*1000);
		 
         return false;
    });
	
	/* button  EFEITOS MÁSCARAS 2 */
    $(document).on("click", ".btn_mp2", function(evt)
    {
         /*global activate_page */
         $(".text_edit_bar").hide();
		 $(".efeitos").show();
		 $(".efeitos_edit").hide();
		 $(".pattern_menu").hide();
		 $(".foto_menu1").hide();
		 $(".foto_menu2").hide();
		 $(".mp").show();
		 $(".btn-close-efeitos").show();
		 $(".cfp").hide();
		 $(".ct").hide();
         return false;
    });
	
	 /* button  CORES */
    $(document).on("click", ".btn-cores", function(evt)
    {
         /*global activate_page */
         $(".cores").show();
		 $(".btn-close-cores").toggle();
		 //$(".text_edit_bar").hide();
		 
		 var elmnt = document.getElementById("cores_textoX");
         elmnt.scrollIntoView();
		 		 
        return false;
    });
	
	/* button  CORES */
    $(document).on("click", ".btn-cadastrar-endereco", function(evt)
    {
        /*global activate_page */
        activate_page("#cadastrar_endereco");
        return false;
    });

	/* button  CORES */
    $(document).on("click", ".btn-close-cores", function(evt)
    {
         /*global activate_page */
         $(".cores").fadeToggle( "slow", "linear" );
		 $(".btn-close-cores").toggle();
        return false;
    });
	
	 /* button  clips */
    $(document).on("click", ".btn-close-clips", function(evt)
    {
         /*global activate_page */
         $(".clips").fadeToggle( "slow", "linear" );
		 $(".btn-close-clips-voltar").hide();
		 $(".btn_sacola_css").show();
		 $(".btn-close-clips").hide();
        return false;
    });
	
	 /* button  texto */
    $(document).on("click", ".btn-close-texto", function(evt)
    {
         /*global activate_page */
         $(".text_edit_bar").fadeToggle( "slow", "linear" );
        return false;
    });
	
	/* button  img */
    $(document).on("click", ".btn-close-fotos", function(evt)
    {
         /*global activate_page */
		 $(".btn-close-fotos").toggle();
        return false;
    });
	
	/* button  fontes */
    $(document).on("click", ".btn-close-fontes", function(evt)
    {
         /*global activate_page */
         $(".fonte_det").hide();
		 $(".btn-close-fontes").hide();
        return false;
    });
	
	/* button  filtros */
    $(document).on("click", ".btn-close-filtros", function(evt)
    {
         /*global activate_page */
        $(".filtros").fadeToggle( "slow", "linear" );
        return false;
    });
	
	/* button  efeitos */
    $(document).on("click", ".btn-close-efeitos", function(evt)
    {
         /*global activate_page */
         $(".efeitos").fadeToggle( "slow", "linear" );
		 $(".btn-close-efeitos").hide();
        return false;
    });
	
	/* button  pattern */
    $(document).on("click", "#btn-pattern", function(evt)
    {
         /*global activate_page */
         $(".pattern").show();
		 $("#imageeditor").hide();
		 //$(".text_edit_bar").hide();
		 $(".btn-close-pattern").show();
        return false;
    });
	
	/* button  pattern */
    $(document).on("click", ".btn-close-pattern", function(evt)
    {
         /*global activate_page */
         $(".pattern").hide();
		 $(".btn-close-pattern").hide();
        return false;
    });
	
	/* button  pattern BG */
    $(document).on("click", "#btn-patternbg", function(evt)
    {
         /*global activate_page */
         $(".patternbg").show();
		 $("#imageeditor").hide();
		 $(".btn-close-patternbg").show();
        return false;
    });
	
	/* button  pattern BG */
    $(document).on("click", ".btn-close-patternbg", function(evt)
    {
         /*global activate_page */
         $(".patternbg").hide();
		 $(".btn-close-patternbg").hide();
        return false;
    });
	
	/* button  texto curvo */
    $(document).on("click", "#btn-tcurvo", function(evt)
    {
         /*global activate_page */
         $(".tcurvo").show();
		 $("#imageeditor").hide();
		 $(".text_edit_bar").hide();
		 $(".btn-close-tcurvo").show();
        return false;
    });
	
	/* button  texto curvo */
    $(document).on("click", ".btn-close-tcurvo", function(evt)
    {
         /*global activate_page */
         $(".tcurvo").hide();
		 $(".btn-close-tcurvo").hide();
        return false;
    });
	
	 /* button  CONFIRMA */
    $(document).on("click", ".btn_confirma", function(evt)
    {
         /*global activate_page */		
		$('.loader').show();
		
		var valor  = parseFloat(getCookie('preco'));
		var valor2 = parseFloat(getCookie('precov'));
		
		var blank1 = isCanvasBlank(document.getElementById('tcanvas'));
		if (!blank1) {
			var data2 = document.getElementById("tcanvas").toDataURL();
			onPhotoDataSuccess('tcanvas',data2,'queImg');
			onPhotoDataSuccess('tcanvas',data2,'queImg2');
		}
				
		var blank2 = isCanvasBlank(document.getElementById('backCanvas'));
		if (!blank2) {
			var data3 = document.getElementById("backCanvas").toDataURL();
			onPhotoDataSuccess('backCanvas',data3,'queImgb');
			onPhotoDataSuccess('backCanvas',data3,'queImgb2');
			var total = valor+valor2;
			setCookie('total',total);
			$('#shirtDivb2').show();
			$('.ChineloSob2').show();
		}else{
			var total = valor;
			setCookie('total',total);
		}
						
		if(getCookie('id_evento')==0){
			//var endereco = $('input[type=radio][name=slc_endereco]:checked').attr('alt');
			var tamanho  = $('input[name=slc_tamanho]:selected').attr('name');
			
			//$('#endereco_confirma').html('Endereço de entrega: '+endereco);
			$('#tamanho_confirma').html('Tamanho: '+tamanho);
		}
		
		$('#valor_confirma').html('Valor: R$ '+total);
		
		if(getCookie('id_cliente')>0 && getCookie('id_evento')>0){
			//activate_page("#confirma");
			window.setTimeout(function(){ 
				  $('.loader').show();
                  salva_venda();
			}, 5000);
		}else if(getCookie('id_cliente')==0 || !getCookie('id_cliente')){
			activate_page("#login");
		}else if(getCookie('id_cliente')>0 && getCookie('id_evento')==0){
			get_endereco("#endereco");
		}else if(getCookie('id_cliente')==0 && getCookie('id_evento')==0){
			activate_page("#login");
		}
		
		$('.loader').hide();
         return false;
    });
		
	/* button  CADASTRO*/
    $(document).on("click", ".btn_cadastro", function(evt)
    { 	
		/*global activate_page */	
		activate_page("#perfil");
		return false;
    });
	
	/* button  CADASTRO2*/
    $(document).on("click", ".btn_cadastro2", function(evt)
    { 	
		/*global activate_page */	
		activate_page("#perfil2");
		return false;
    });
	
	 /* button  PAGAMENTO*/
    $(document).on("click", ".btn_pagamento", function(evt)
    { 	
		/*global activate_page */	
		var endereco  = $('input[name=slc_endereco]:checked').val();
		
		var frete     = $('input[name=slc_endereco]:checked').attr('alt');
		var tipo_frete= $('#tipo_frete').val();
		var fretef    = frete.split(';');
		if(tipo_frete==1){
			var frete     = parseFloat(fretef[1].replace(',','.'));
		}
		if(tipo_frete==2){
			var frete     = parseFloat(fretef[2].replace(',','.'));
		}
		$('#rfrete').val(frete);
		setCookie('frete',frete);
			
		if(endereco>0 && tipo_frete>0){
			activate_page("#pagamento");
		}else{
			alerta('Selecione um endereço ou forma de entrega!', 'Entrega', 'Error', 'OK');
			return false;	
		}
				
		return false;
    });
	
	 /* button SHARE*/
    $(document).on("click", ".btn_share", function(evt)
    { 	
		/*global activate_page */		
		activate_page("#share");
		return false;
    });

	/* button  VOLTAR*/
    $(document).on("click", ".btn_voltar_mainpage", function(evt)
    { 	
		/*global activate_page */		
		activate_page("#mainpage");
		return false;
    });
	
	/* button  VOLTAR*/
    $(document).on("click", ".btn_voltar_comprados", function(evt)
    { 	
		/*global activate_page */		
		activate_page("#produtos_comprados");
		return false;
    });
	
	 /* button  VOLTAR*/
    $(document).on("click", ".btn_voltar_eventos", function(evt)
    { 	
		/*global activate_page */										
		activate_page("#eventos");
		return false;
    });
	
	/* button  VOLTAR*/
    $(document).on("click", ".btn_voltar_produtos", function(evt)
    { 	
		/*global activate_page */										
		activate_page("#produtos");
		return false;
    });
	
	/* button  VOLTAR*/
    $(document).on("click", ".btn_voltar_produtos_detalhado", function(evt)
    { 	
		/*global activate_page */										
		activate_page("#produtos_detalhado");
		return false;
    });
	
	/* button  VOLTAR*/
    $(document).on("click", ".btn_voltar_canvas", function(evt)
    { 	
		/*global activate_page */										
		activate_page("#custom");
		return false;
    });
	
	/* button  LOGIN*/
    $(document).on("click", ".btn-login", function(evt)
    { 	
		/*global activate_page */										
		activate_page("#login");
		return false;
    });
	
	/* button  LOGIN 2*/
    $(document).on("click", ".btn-login2", function(evt)
    { 	
		/*global activate_page */										
		activate_page("#login2");
		return false;
    });
	
	$('#text-string').focus(function (e) {	
		/*global activate_page */										
		$('.bar_rodape').hide();
		$('#flip').hide();
		return false;
    });
	
	$('#text-string').focusout(function (e) {	
		/*global activate_page */										
		$('.bar_rodape').show();
		$('#flip').show();
		return false;
    });
	
	$('#ctext').focus(function (e) {	
		/*global activate_page */										
		$('.bar_rodape').hide();
		$('#flip').hide();
		return false;
    });
	
	$('#ctext').focusout(function (e) {	
		/*global activate_page */										
		$('.bar_rodape').show();
		$('#flip').show();
		return false;
    });
	
	/* button  ENTER*/	
	$('#text-string').keypress(function (e) {
	 var key = e.which;
	 var tex = $('#text-string').val();
	 
	 //console.log('Key:'+key);
	 
	 if(key == 13 && tex!='')  // the enter key code
	  {
		$('#add-text').click();
		return false;  
	  }
	});	
	
	$('#ctext').keypress(function (e) {
	 var key = e.which;
	 var tex = $('#ctext').val();
	 
	 //console.log('Key:'+key);
	 
	 if(key == 13 && tex!='')  // the enter key code
	  {
		$('#add-text2').click();
		return false;  
	  }
	});
	
	$(document).on("click", ".del_end", function(evt){
		var id_end = $(this).attr("alt");
		
		$.ajax({
		type:"POST",
		dataType:"json",
		async:true,
		crossDomain:true,
		url: url_geral+"alterar_endereco.php",
		data:{"id": id_end,"token":"H424715433852"},
		timeout: 200000, 
			beforeSend: function(resultado){ 
			 $('.loader').show();
			},
			success: function(resultado){
				$('.loader').hide();
				$('#frase_aviso').empty();
				if(resultado.erro==1){	
					$('#frase_aviso').html(resultado.dados);
					$('#aviso').show();
				}else{
					$('#frase_aviso').html(resultado.dados);
					$('#aviso').show();
				}
				get_endereco("#endereco");
			},
			error: function(resultado) {
				$('.loader').hide();
				$('#frase_aviso').html('Não foi possível acessar!');
				$('#aviso').show();
				return false;
			}
			   
		});
	});
		
	$(document).on("click", ".tipo_pg_set1", function(evt){
		$("#tipo_boleto_select").hide();
		$("#tipo_cartao_banco_select").show();
		$("#email").val(getCookie('mail'));
		$("#tipo_cartao").val("1");
		$('#cardNumber').focus();
		$(".tipo_pg_set1").css('background', 'white');
		$(".tipo_pg_set1").css('color', 'black');
		$(".tipo_pg_set2").css('background', 'black');
		$(".tipo_pg_set2").css('color', 'white');
	});
	
	$(document).on("click", ".tipo_pg_set2", function(evt){
		$("#tipo_boleto_select").show();
		$("#tipo_cartao_banco_select").hide();
		$("#tipo_cartao").val("2");
		$("#email").val(getCookie('mail'));
		$(".tipo_pg_set2").css('background', 'white');
		$(".tipo_pg_set2").css('color', 'black');
		$(".tipo_pg_set1").css('background', 'black');
		$(".tipo_pg_set1").css('color', 'white');
	});
	
	$(document).on("click", ".tipo_entrega_set1", function(evt){
		$("#tipo_frete").val("1");
		$('#cardNumber').focus();
		$(".tipo_entrega_set1").css('background', 'white');
		$(".tipo_entrega_set1").css('color', 'black');
		$(".tipo_entrega_set2").css('background', 'black');
		$(".tipo_entrega_set2").css('color', 'white');
	});
	
	$(document).on("click", ".tipo_entrega_set2", function(evt){
		$("#tipo_frete").val("2");
		$(".tipo_entrega_set2").css('background', 'white');
		$(".tipo_entrega_set2").css('color', 'black');
		$(".tipo_entrega_set1").css('background', 'black');
		$(".tipo_entrega_set1").css('color', 'white');
	});
	
	$(document).on("change", "#tipo_cartao2", function(evt){
	   //console.log($(this).val());
	   if($(this).val()==1){
		   $("#tipo_cartao_banco_select2").show();
		   $('#lNnome2').focus();
	   }else{
		   $("#tipo_cartao_banco_select2").hide();
	   }
	});	
 }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
