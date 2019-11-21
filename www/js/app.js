var url_geral = "https://igestao.fara1.virtuaserver.com.br/igestao/php/";
var url_geral2= "https://igestao.fara1.virtuaserver.com.br/igestao/";
var token     = "H424715433852";

function alerta_voltar(mensagem,titulo1,titulo2,botao){
	$('#aviso').show();
	$('#frase_aviso').show();
	$('#titulo_aviso').show();
	$('#botao_aviso').show();
	$('#frase_aviso').html(mensagem);
	$('#titulo_aviso').html(titulo1);
	$('#botao_aviso').html(botao);
}

document.addEventListener("deviceready", onDeviceReady, false);
var exitApp = false, intval = setInterval(function (){exitApp = false;}, 1000);
document.addEventListener("backbutton", function (e){
	e.preventDefault();
	if (exitApp) {
		clearInterval(intval) 
		(navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
	}
	else {
		exitApp = true
		history.back(1);			
	} 
}, false);

//Funções do COOKIE INICIO
function setCookie(cname,cvalue) {
	localStorage.setItem(cname, cvalue);
 }
function getCookie(cname){
	return localStorage.getItem(cname);
}
//funções do COOKIE FINAL

//DEFINE CSS
function defineCSS(id,w,h,e,mtp,mlp){
		
	var id_src     = $("#produto_img").val();
	var id_src2    = $("#produto2_img").val();
	var id_src3    = $("#produto3_img").val();
		
	$("#tshirtFacing").attr('src',id_src);
	$(".ChineloSob").attr('src',id_src);
	$("#tshirtFacing2").attr('src',id_src);
	$("#tshirtFacingb2").attr('src',id_src2);
	$(".LogoTop").attr('src',id_src3);
		
	getPageSize();
	
	var escala = (arrayPageSize[0]*100)/w;
	var escala = ((escala/100)/e).toFixed(2);
	var mt     = mtp;
	var ml     = mlp;
	var mt2    = parseFloat(arrayPageSize[0]);
	
	if(getCookie('id_evento')>0){
		$(".LogoTop").show();
	}else{
		$(".LogoTop").hide();
	}
	
	var deviceVersion = device.version;
	var model = device.model;
	
	if(deviceVersion=='4.2.x'){
		$("#barra_fim").css({'height':'60px'});
		$(".upperdiv").css({'top':'400px'});
	}
	
	if(deviceVersion=='4.2'){
		$("#barra_fim").css({'height':'140px'});
		$(".upperdiv").css({'top':'475px'});
	}
	
	if(deviceVersion=='4.x.x'){
		$("#barra_fim").css({'height':'140px'});
		$(".upperdiv").css({'top':'645px'});
	}
		
	console.log("Model:"+model+" Version:"+deviceVersion);
	
	if(id==8){		
		$(".ChineloSob").attr('src',id_src);
		$(".ChineloSobb").attr('src',id_src);
		$(".ChineloSob2").attr('src',id_src2);
		$(".ChineloSob").show();
		$(".ChineloAlca").show();
	}else{
		$(".ChineloSob").attr('src',id_src);
		$(".ChineloSobb").attr('src',id_src);
		$(".ChineloSob2").attr('src',id_src2);
		$(".ChineloSob").show();
		$(".ChineloAlca").hide();
	}
		
	$("#drawingArea").css({
		'position':'absolute',
		'z-index':'1',
		'width':''+w+'px',
		'height':''+h+'px',
		'top':'50%',
		'left':'50%',
		'margin-top':'-'+mt+'px',
		'margin-left':'-'+ml+'px',
		'-webkit-user-select':'none',
		'-ms-transform':'scale('+escala+','+escala+')',
		'-webkit-transform':'scale('+escala+','+escala+')',
		'transform':'scale('+escala+','+escala+')'
	});
	
	$(".result").css({
		'position':'relative',
		'width':'100%',
		'height':''+arrayPageSize[0]+'px'
	});
		
	$("#queImg2").css({
		'width':''+w+'px',
		'height':''+h+'px',
		'top':'50%',
		'left':'50%',
		'margin-top':'-'+mt2+'px',
		'margin-left':'-'+ml+'px',
		'-webkit-user-select':'none',
		'-ms-transform':'scale('+escala+','+escala+')',
		'-webkit-transform':'scale('+escala+','+escala+')',
		'transform':'scale('+escala+','+escala+')',
		'position':'absolute'
	});
	
	$("#queImgb2").css({
		'width':''+w+'px',
		'height':''+h+'px',
		'top':'50%',
		'left':'50%',
		'margin-top':'-'+mt2+'px',
		'margin-left':'-'+ml+'px',
		'-webkit-user-select':'none',
		'-ms-transform':'scale('+escala+','+escala+')',
		'-webkit-transform':'scale('+escala+','+escala+')',
		'transform':'scale('+escala+','+escala+')',
		'position':'absolute'
	});
	
	$("#tcanvas").attr({'width':w,'height':h});
	$("#queImg").attr({'width':w,'height':h});
    $("#queImg2").attr({'width':w,'height':h});
	$("#queImgb").attr({'width':w,'height':h});
	$("#queImgb2").attr({'width':w,'height':h});
	
	//$("#shirtDiv").css({'background-color':'#FFFFFF'});
	//$("#cor_produto").val('');
	
	$(".canvas-container").css({
		'width':''+w+'px',
		'height':''+h+'px'
	});
	
	$(".hover").attr({'width':''+w+'','height':''+h+''});
	$(".hover").css({
		'width':''+w+'px',
		'height':''+h+'px'
	});
	
	$.getScript('custom/js/tshirtEditor.js', function() {
		 console.log('Javascript is loaded successful!');
	});
	
}
//DEFINE CSS

document.addEventListener('backbutton', function (evt) { window.history.back(); return false; }, false);