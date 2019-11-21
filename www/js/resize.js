function onPhotoDataSuccess(imageData,nome) 
{
var myImage = new Image();
var thecanvas = document.getElementById(nome);
var ctx = thecanvas.getContext("2d"); 

	myImage.onload = function() { 
	
	ctx.clearRect(0, 0, thecanvas.width, thecanvas.height);
	ctx.drawImage(myImage, 0, 0, 842, 1192);
		
	}     
	myImage.src = document.getElementById("tcanvas").toDataURL();
}