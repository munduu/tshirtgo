$(window).on("orientationchange",function(){
		  
  var id_produto = getCookie('id_produto');
  var id_src     = $("#produto").val();
  
  if(window.orientation == 0){ // Portrait
	
	defineCSS(id_produto,id_src,'P');
	
  }else{ // Landscape
  
	defineCSS(id_produto,id_src,'L');
	
  }
});