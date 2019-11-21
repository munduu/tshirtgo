var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
  var smallImage = document.getElementById('camera1');
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
  var largeImage = document.getElementById('camera2');
  largeImage.src = "data:image/jpeg;base64," + imageURI;
}

function onPhotoDataSuccess2(imageData) {
  var smallImage = document.getElementById('camera3');
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess2(imageURI) {
  var largeImage = document.getElementById('camera4');
  largeImage.src = "data:image/jpeg;base64," + imageURI;
}

function capturePhoto() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

function capturePhoto2() {
  navigator.camera.getPicture(onPhotoDataSuccess2, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, allowEdit: true,
	destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL,
	sourceType: source });
}

function getPhoto2(source) {
  navigator.camera.getPicture(onPhotoURISuccess2, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL,
	sourceType: source });
}

function onFail(message) {
  alerta('Imagem não selecionada e/ou não foi possível inserir a imagem!', 'Camera/Galeria', 'Camera/Galeria', 'OK');
}