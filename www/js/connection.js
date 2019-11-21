var tempo       = window.setInterval(carrega, 1000);
function carrega(){
	if(navigator.connection.type=="none"){
		activate_page("#semnet");
	}
}