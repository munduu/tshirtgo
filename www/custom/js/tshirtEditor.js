var canvas;
var tshirts = new Array(); //prototype: [{style:'x',color:'white',front:'a',back:'b',price:{tshirt:'12.95',frontPrint:'4.99',backPrint:'4.99',total:'22.47'}}]
var a;
var b;
var line1;
var line2;
var line3;
var line4;
var canvas1, canvas2;
 	$(document).ready(function() {
		//setup front side canvas 
 		
		canvas1 = new fabric.Canvas('tcanvas', {
		  hoverCursor: 'pointer',
		  selection: true,
		  selectionBorderColor:'blue'
		});
		
		canvas2 = new fabric.Canvas('backCanvas', {
		  hoverCursor: 'pointer',
		  selection: true,
		  selectionBorderColor:'blue'
		});
		
		var switcher = 1;

		if(switcher == 1) {
			var canvas = canvas1;
			$("#container2").hide();
			fireEvents();
		}
		
		function fireEvents(){
			canvas.on({
				 'object:moving': function(e) {		  	
					e.target.opacity = 0.8;
				  },
				  'object:modified': function(e) {		  	
					e.target.opacity = 1;
				  },
				 'object:selected':onObjectSelected,
				 'selection:cleared':onSelectedCleared
			 });
			 			 
			// piggyback on `canvas.findTarget`, to fire "object:over" and "object:out" events
			canvas.findTarget = (function(originalFn) {
			  return function() {
				var target = originalFn.apply(this, arguments);
				if (target) {
				  if (this._hoveredTarget !== target) {
					  canvas.fire('object:over', { target: target });
					if (this._hoveredTarget) {
						canvas.fire('object:out', { target: this._hoveredTarget });
					}
					this._hoveredTarget = target;
				  }
				}
				else if (this._hoveredTarget) {
					canvas.fire('object:out', { target: this._hoveredTarget });
				  this._hoveredTarget = null;
				}
				return target;
			  };
			})(canvas.findTarget);

			canvas.on('object:over', function(e) {	
				console.log('over'+e.target);
			});
			
			canvas.on('object:out', function(e) {		
				console.log('out'+e.target);
			});
		
		}
				 		 	 
		$(document).on("click", ".img-polaroid", function(e){	
			var el = e.target;
	  		/*temp code*/
						
	  		var offset  = 50;
	        var left    = fabric.util.getRandomInt(0 + offset, 100 - offset);
	        var top     = fabric.util.getRandomInt(0 + offset, 100 - offset);
	        var angle   = fabric.util.getRandomInt(-20, 40);
	        var width   = fabric.util.getRandomInt(30, 50);
	        var opacity = (function(min, max){ return Math.random() * (max - min) + min; })(0.5, 1);
			
			/* 	TAMANHO DO OBJETO */
			var objectWidth  = el.width*3;
			var objectHeight = el.height*3;
			
			if(objectWidth>200){
				objectHeight = (objectHeight * 200 / objectWidth)*3;
				objectWidth  = 200*3;
				
			}
				        
	  		fabric.Image.fromURL(el.alt, function(image) {
		          image.set({
		            left: left,
		            top: top,
		            angle: 0,
		            padding: 250,
		            cornersize: 20,
					width:objectWidth,
					height:objectHeight,
	      	  		hasRotatingPoint:false
		          });
		          //image.scale(getRandomNum(0.1, 0.25)).setCoords();
		          canvas.add(image);
		        });
			$(".clips").hide();
			$(".btn-close-clips-voltar").hide();
			$(".btn-close-clips").hide();
			$(".btn_sacola_css").show();
	  	});
		
		//**dataURL to blob**
		function dataURLtoBlob(dataurl) {
			var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			while(n--){
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], {type:mime});
		}

		//**blob to dataURL**
		function blobToDataURL(blob, callback) {
			var a = new FileReader();
			a.onload = function(e) {callback(e.target.result);}
			a.readAsDataURL(blob);
		}
		
		$('#camera1').on('load', function () {
			
			var file = dataURLtoBlob($(this).attr('src'));
									
			var reader = new FileReader();
			
			reader.onload = function (f) {
				var data = f.target.result;
				fabric.Image.fromURL(data, function (img) {
					var objectWidth  = img.width*3;
					var objectHeight = img.height*3;
								
					if(objectWidth>300){
						objectHeight = (objectHeight * 300 / objectWidth)*3;
						objectWidth  = 300*3;
					}
					var oImg = img.set({left: 0, top: 0, angle: 00, padding:150, width:objectWidth, height:objectHeight, hasRotatingPoint:false}).scale(0.9);
					canvas.add(oImg).renderAll();
					
					var a = canvas.setActiveObject(oImg);
					var dataURL = canvas.toDataURL({format: 'png', quality: 1.0});
				});
			};
		  reader.readAsDataURL(file);
		  
		  $("#aviso_foto").hide();
		  
		});
				
		$('#camera2').on('load', function () {
			
			var file = dataURLtoBlob($(this).attr('src'));
			
			var reader = new FileReader();
			
			reader.onload = function (f) {
				var data = f.target.result;
				fabric.Image.fromURL(data, function (img) {
					var objectWidth  = img.width*3;
					var objectHeight = img.height*3;
								
					if(objectWidth>300){
						objectHeight = (objectHeight * 300 / objectWidth)*3;
						objectWidth  = 300*3;
					}
					var oImg = img.set({left: 0, top: 0, angle: 00, padding:150, width:objectWidth, height:objectHeight, hasRotatingPoint:false}).scale(0.9);
					canvas.add(oImg).renderAll();
					
					var a = canvas.setActiveObject(oImg);
					var dataURL = canvas.toDataURL({format: 'png', quality: 1.0});
				});
			};
		  reader.readAsDataURL(file);
		  
		  $("#aviso_foto").hide();
		  
		});
	  
	  //PATTERN FUNDO CAMERA
		$('#camera3').on('load', function () {
			
			var file = dataURLtoBlob($(this).attr('src'));
			
			var reader = new FileReader();
			var padding = 0;
			
			reader.onload = function (f) {
				var data = f.target.result;				
				fabric.Image.fromURL(data, function(img) {

					img.scaleToWidth(500);

					var patternSourceCanvas = new fabric.StaticCanvas();
					patternSourceCanvas.add(img);

					var pattern = new fabric.Pattern({
					  source: function() {
						patternSourceCanvas.setDimensions({
						  width: img.getWidth() + padding,
						  height: img.getHeight() + padding
						});
						return patternSourceCanvas.getElement();
					  },
					  repeat: 'repeat'
					});
					
					var rect = new fabric.Rect({
						left: 0,
						top: 0,
						originX: 'left',
						originY: 'top',
						width: 3500,
						height: 3500,
						padding: 250,
						angle: 00,
						fill: pattern,
						scaleX: 6.0,
						scaleY: 6.0,
						transparentCorners: false
					});
					setTimeout(function() {
						canvas.add(rect).setActiveObject(rect);
						canvas.renderAll(); 	
					}, 800);
					
				});
			};
			reader.readAsDataURL(file);
			
			$(".btn-close-efeitos").hide();
			$(".efeitos").hide();
			$(".efeitos_edit").hide();
			$("#texteditor").css('display', 'block');
			$("#texteditor").focus();
			$("#imageeditor").css('display', 'block');			
			
		});
		
		$('#camera4').on('load', function () {
			
			var file = dataURLtoBlob($(this).attr('src'));
			
			var reader = new FileReader();
			var padding = 0;
			
			reader.onload = function (f) {
				var data = f.target.result;				
				fabric.Image.fromURL(data, function(img) {

					img.scaleToWidth(500);

					var patternSourceCanvas = new fabric.StaticCanvas();
					patternSourceCanvas.add(img);

					var pattern = new fabric.Pattern({
					  source: function() {
						patternSourceCanvas.setDimensions({
						  width: img.getWidth() + padding,
						  height: img.getHeight() + padding
						});
						return patternSourceCanvas.getElement();
					  },
					  repeat: 'repeat'
					});
					
					var rect = new fabric.Rect({
						left: 0,
						top: 0,
						originX: 'left',
						originY: 'top',
						width: 3500,
						height: 3500,
						padding: 250,
						angle: 00,
						fill: pattern,
						scaleX: 6.0,
						scaleY: 6.0,
						transparentCorners: false
					});
					setTimeout(function() {
						canvas.add(rect).setActiveObject(rect);
						canvas.renderAll(); 	
					}, 800);
					
				});
			};
			reader.readAsDataURL(file);
			
			$(".btn-close-efeitos").hide();
			$(".efeitos").hide();
			$(".efeitos_edit").hide();
			$("#texteditor").css('display', 'block');
			$("#texteditor").focus();
			$("#imageeditor").css('display', 'block');			
			
		});
	  //PATTERN FUNDO CAMERA
	  
	  //PATTERN TEXTO
	  function loadPattern(url) {
		var activeObject = canvas.getActiveObject();
				
		var padding = 0;
		
		console.log(activeObject);
		
		fabric.Image.fromURL(url, function(img) {

			img.scaleToWidth(2000);

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(img);

			activeObject.fill = new fabric.Pattern({
			  source: function() {
				patternSourceCanvas.setDimensions({
				  width: img.getWidth() + padding,
				  height: img.getHeight() + padding
				});
				return patternSourceCanvas.getElement();
			  },
			  repeat: 'repeat',
			  offsetX: [img.getWidth()/2], 
			  offsetY: [img.getHeight()/2],
			  objectCaching: false
			});		
			canvas.renderAll();
			setTimeout(function() {
				canvas.calcOffset(); 
			},200);				
		});
				
		$(".pattern").hide();
		$(".btn-close-pattern").hide();
	  }
	  	  
	  $(document).on("click", ".patternx", function(){	
		  var url = $(this).attr("src");
		  loadPattern(url);
	  });
	  //PATTERN TEXTO
	  
	  //LIMPA CANVAS
	  $(document).on("click", ".btn_finaliza", function(){
		  canvas.clear();
	  });
	  //LIMPA CANVAS
	  
	  //TIRA SELEÇÃO
	  $(document).on("click", ".btn_confirma", function(){
		canvas.deactivateAll().renderAll();
	  });
	  //TIRA SELEÇÃO
	  	  
	  document.getElementById('remove-selected').onclick = function() {		  
		    var activeObject = canvas.getActiveObject(),
		        activeGroup = canvas.getActiveGroup();
		    if (activeObject) {
		      canvas.remove(activeObject);
		      $("#text-string").val("");
		    }
		    else if (activeGroup) {
		      var objectsInGroup = activeGroup.getObjects();
		      canvas.discardActiveGroup();
		      objectsInGroup.forEach(function(object) {
		        canvas.remove(object);
		      });
		    }
	  };
	  document.getElementById('bring-to-front').onclick = function() {		  
		    var activeObject = canvas.getActiveObject(),
		        activeGroup = canvas.getActiveGroup();
		    if (activeObject) {
		      activeObject.bringToFront();
		    }
		    else if (activeGroup) {
		      var objectsInGroup = activeGroup.getObjects();
		      canvas.discardActiveGroup();
		      objectsInGroup.forEach(function(object) {
		        object.bringToFront();
		      });
		    }
	  };
	  document.getElementById('send-to-back').onclick = function() {		  
		    var activeObject = canvas.getActiveObject(),
		        activeGroup = canvas.getActiveGroup();
		    if (activeObject) {
		      activeObject.sendToBack();
		    }
		    else if (activeGroup) {
		      var objectsInGroup = activeGroup.getObjects();
		      canvas.discardActiveGroup();
		      objectsInGroup.forEach(function(object) {
		        object.sendToBack();
		      });
		    }
	  };		  
	  	  
	  //CLONE
	  $("#clone").click(function() {		  
		  
		var obj = canvas.getActiveObject();
		  
		if (obj && obj.type === 'curvedText') {
			
			if(canvas.getActiveObject()) {
				// Does this object require an async clone?
				if(!fabric.util.getKlass(canvas.getActiveObject().type).async) {
					clipboard = canvas.getActiveObject().clone();
				} else {
					canvas.getActiveObject().clone(function(clone) {
						clipboard= clone;
					});
				}
			}

			// Group of Objects (all groups require async clone)
			if(canvas.getActiveGroup()) {
				canvas.getActiveGroup().clone(function(clone) {
					clipboard = clone;
				});
			}
				  
			if(clipboard) {
				// Lets see if we need to clone async 
				if(!fabric.util.getKlass(clipboard.type).async) {
					var obj = clipboard.clone();
					obj.setTop(obj.top += 10);
					obj.setLeft(obj.left += 10);            
					canvas.add(obj);
					// We do not need to clone async, all groups require async clone
					canvas.setActiveObject(obj);
					clipboard = obj;
				}  else {
					clipboard.clone(function(clone) {
						clone.setTop(clone.top += 10);
						clone.setLeft(clone.left += 10);
						clone.forEachObject(function(obj){ canvas.add(obj); });
						canvas.deactivateAll();
						if(clipboard.isType("group")) {
							canvas.setActiveGroup(clone);
						} else {
							canvas.setActiveObject(clone);
						}
						clipboard = clone;
					});
				}
			}
			canvas.renderAll();
			
		}else{
			
			var clone = fabric.util.object.clone(obj);
			clone.set({left: 100,top: 100});
			canvas.add(clone);
			canvas.renderAll();
			
		}
		
	  });
	  //CLONE
	  
	  //CURVE TEXT
		$('#reverse').click(function(){
			var obj = canvas.getActiveObject();
			if(obj){
				obj.set('reverse',$(this).is(':checked')); 
				canvas.renderAll();
			}
		});
		$('#radius, #spacing, #fill').change(function(){
			var obj = canvas.getActiveObject();
			if(obj){
				obj.set($(this).attr('id'),$(this).val()); 
			}
			canvas.renderAll();
		});
		$('#radius, #spacing, #effect').change(function(){
			var obj = canvas.getActiveObject();
			if(obj){
				obj.set($(this).attr('id'),$(this).val()); 
			}
			canvas.renderAll();
		});

		$(document).on("click", ".cores_texto", function(e){
			var obj = canvas.getActiveObject();
			if(obj){
				obj.setFill($(this).val()); 
			}
			canvas.renderAll();
		});
		$(document).on("click", ".fonte_tipo", function(e){
			var activeObject = canvas.getActiveObject();
			activeObject.set( 'fontFamily', $(this).attr('alt') , true ) ;    
	    });
	  
		$(document).on("click", "#text-bold", function(e){
			var activeObject = canvas.getActiveObject();
			if(activeObject.fontWeight == 'bold'){
				activeObject.set( 'fontWeight', $(this).attr('alt'));
			}else{
				activeObject.set( 'fontWeight', "");
			}
			     
		});
		
		$(document).on("click", "#text-italic", function(e){
			var activeObject = canvas.getActiveObject();
			console.log(activeObject.fontStyle);
			if(activeObject.fontStyle == 'italic'){
				activeObject.set( 'fontStyle', $(this).attr('alt')); 
			}else{
				activeObject.set( 'fontStyle', ""); 
			}
		});

	  document.getElementById('add-text2').onclick = function() {
			var text = $("#ctext").val();
			
			var contatext = parseInt(text.length);
			if(contatext<=3){
				var fonte  = 40;
				var radios = 150;
			}
			if(contatext>3 || contatext<=6){
				var fonte  = 20;
				var radios = 160;
			}
			if(contatext>6 || contatext<=9){
				var fonte  = 10;
				var radios = 180;
			}
			
			var exemple = new fabric.CurvedText(text,{
				left: 100,
				top: 100,
				textAlign: 'center',
				fontFamily: 'helvetica',
				radius: radios,
				fontSize:fonte,
				padding: 250,
				spacing: 5,
				scaleX: 8.0,
				scaleY: 8.0
			});
			
			canvas.add(exemple).renderAll();
			canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));
			
			$("#texteditor").css('display', 'block');
			$("#texteditor").focus();
			$("#imageeditor").css('display', 'block');
		};
		
		$("#ctext").keyup(function(){	  		
			var activeObject = canvas.getActiveObject();
			  if (activeObject && activeObject.type === 'CurvedText') {
				  activeObject.text = this.value;
				  canvas.renderAll();
			  }
		});	
	  //TEXTO CURVO
	  
	  //TEXTO RETO
	  document.getElementById('add-text').onclick = function() {
			var text = $("#text-string").val();
			var textSample = new fabric.Text(text, {
			  left: fabric.util.getRandomInt(0, 100),
			  top: fabric.util.getRandomInt(0, 100),
			  fontFamily: 'helvetica',
			  angle: 0,
			  fill: '#000000',
			  scaleX: 0.5,
			  scaleY: 0.5,
			  padding: 250,
			  fontSize: 820,
			  hasRotatingPoint:false
			});		    
			canvas.add(textSample);	
			canvas.item(canvas.item.length-1).hasRotatingPoint = true;
			canvas.setActiveObject(textSample);
			
			$("#texteditor").css('display', 'block');
			$("#texteditor").focus();
			$("#imageeditor").css('display', 'block');
		};
		
		$("#text-string").keyup(function(){	  		
			var activeObject = canvas.getActiveObject();
			  if (activeObject && activeObject.type === 'text') {
				  activeObject.text = this.value;
				  canvas.renderAll();
			  }
		});
	  //TEXTO RESTO
	  
	  //FLYP
	  $("#flip_edit").click(function() {		  
		  var activeObject = canvas.getActiveObject();
			activeObject.toggle('flipX');
		  canvas.renderAll();
	  });
	  
	  //ESCALA MENOS
	  $("#menos_edit").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {
			  var wval = activeObject.width-25;
			  var hval = activeObject.height-25;
			  activeObject.set({width:wval, height:hval});
		  } else if (activeObject && activeObject.type === 'group') {
			  var wval = activeObject.width-25;
			  var hval = activeObject.height-25;
			  activeObject.set({width:wval, height:hval});
		  } else if (activeObject && activeObject.type === 'text') {
			  var fval = activeObject.fontSize-25;
			  activeObject.set({fontSize:fval});
		  } else if (activeObject && activeObject.type === 'curvedText') {
			  var fval = activeObject.fontSize-5;
			  activeObject.set({fontSize:fval});
		  }
		  canvas.renderAll();
	  });
	  
	  //ESCALA MAIS
	  $("#mais_edit").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {
			  var wval = activeObject.width+25;
			  var hval = activeObject.height+25;
			  activeObject.set({width:wval, height:hval});
		  } else if (activeObject && activeObject.type === 'group') {
			  var wval = activeObject.width+25;
			  var hval = activeObject.height+25;
			  activeObject.set({width:wval, height:hval});
		  } else if (activeObject && activeObject.type === 'text') {
			  var fval = activeObject.fontSize+25;
			  activeObject.set({fontSize:fval});
		  } else if (activeObject && activeObject.type === 'curvedText') {
			  var fval = activeObject.fontSize+5;
			  activeObject.set({fontSize:fval});
		  }
		  canvas.renderAll();
	  });

	  //RODAR ESCALA MAIS 
	  $("#mais_rotate_edit").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  var curAngle = activeObject.getAngle();
	      activeObject.setAngle(curAngle+15);			  
		  canvas.renderAll();
	  });
	  
	  //RODAR ESCALA menos
	  $("#menos_rotate_edit").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  var curAngle = activeObject.getAngle();
	      activeObject.setAngle(curAngle-15);			  
		  canvas.renderAll();
	  });

	  //FLIP
	  document.getElementById('flip').onclick = function() { 
				  
			if ($(this).attr("title") == "Show Back View") {
				$(this).attr('title', 'Show Front View');	
				$(this).attr('data-original-title', 'Show Front View');					
				
				var id_src = $("#produto_img").val();
				
				$("#tshirtFacing").attr("src",id_src);
				$("#tshirtFacing2").attr("src",id_src);
				$(".ChineloSob").attr("src",id_src);
				
				var id_produto = getCookie('id_produto');
				
				if(id_produto==15){ 
					$('#drawingArea').css('top','55%');
					$('#drawingArea2').css('top','55%');
				}else{
					$('#drawingArea').css('top','50%');
					$('#drawingArea2').css('top','50%');
				}
				
				switcher = 1;
				$("#container1").show()
				$("#container2").hide();
					fireEvents();
				canvas = canvas1;
				canvas.deactivateAllWithDispatch();
				canvas.calcOffset();
				fireEvents();
				
			} else {
				$(this).attr('title', 'Show Back View');
				$(this).attr('data-original-title', 'Show Back View');	
								
				var id_src2 = $("#produto2_img").val();
				
				$("#tshirtFacing").attr("src",id_src2);	
				$("#tshirtFacing2").attr("src",id_src2);
				$(".ChineloSob").attr("src",id_src2);
				
				var precov = getCookie('precov');

				alerta('Para impressão nas costas será cobrado acréscimo de R$ '+precov+'!', 'Impressão nas Costas', 'Atenção', 'OK');
				
				var id_produto = getCookie('id_produto');
				
				if(id_produto==15){ 
					$('#drawingArea').css('top','50%');
					$('#drawingAreab2').css('top','50%');
				}else{
					$('#drawingArea').css('top','45%');
					$('#drawingAreab2').css('top','45%');
				}
				
				switcher = 2;
				$("#container1").hide()
				$("#container2").show();
					fireEvents();
				canvas = canvas2;
				canvas.deactivateAllWithDispatch();
				canvas.calcOffset();
				fireEvents();
			}
			$("#imageeditor").css('display', 'block');
			canvas.renderAll();
			setTimeout(function() {
				canvas.calcOffset();
			},200);
	    }; 	

	//TIRAS TROCA
	  $(document).on("click", ".tirasbg", function(e){		  		        		       
		var id_src = $(this).attr('alt').split(';');
		$(".btn-close-efeitos").hide();
		$(".efeitos").hide();
		$(".ChineloAlca").attr("src",id_src[0]);
		$("#tira").val(id_src[1]);
	  });

	 //COR FUNDO CANVAS
	 $(document).on("click", ".cores_fundo_canvas", function(e){		  		        		       
		var cor = $(this).val();
		if(cor=="#ffffff"){ cor = ''; }
		canvas.setBackgroundColor(cor, canvas.renderAll.bind(canvas));
		$(".btn-close-efeitos").hide();
		$(".efeitos").hide();
		$(".efeitos_edit").hide();
	  });
	  
	  //COR FUNDO cores_fundo_back_c
	 $(document).on("click", ".cores_fundo_back_c", function(e){		  		        		       
		var cor = $(this).attr('alt');
		$(".cores_fundo_back_c").css("border","1px solid #000");
		$(this).css("border","5px solid #F00");
		if(cor=="#ffffff"){ cor = ''; }
		$("#cor_produto").val($(this).val());
		console.log(cor);
		$("#shirtDiv").css("background-color",cor);
		$(".btn-close-efeitos").hide();
		$(".efeitos").hide();
		$(".efeitos_edit").hide();
	  });
	 
	 //PATTERN BG
	 $(document).on("click", ".patternxbg", function(e){
		  
		var url = $(this).attr('alt');				
		var padding = 0;

		fabric.Image.fromURL(url, function(img) {

			img.scaleToWidth(800);

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(img);

			var pattern = new fabric.Pattern({
			  source: function() {
				patternSourceCanvas.setDimensions({
				  width: img.getWidth() + padding,
				  height: img.getHeight() + padding
				});
				return patternSourceCanvas.getElement();
			  },
			  repeat: 'repeat'
			});
			
			var rect = new fabric.Rect({
				left: 0,
				top: 0,
				originX: 'left',
				originY: 'top',
				width: 3500,
				height: 3500,
				padding: 250,
				angle: 0,
				fill: pattern,
				transparentCorners: false
			});

			canvas.add(rect).setActiveObject(rect);

		  });
		
		canvas.renderAll();
		setTimeout(function() {
				canvas.calcOffset(); 
			},200);
		
		$(".btn-close-efeitos").hide();
		$(".efeitos").hide();
		$(".efeitos_edit").hide();
		$("#texteditor").css('display', 'block');
		$("#texteditor").focus();
		$("#imageeditor").css('display', 'block');
	  });
	  //PATTERN BG
	  
	  $("#text-bold").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		    activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');		    
		    canvas.renderAll();
		});
	  $("#text-italic").click(function() {		 
		  var activeObject = canvas.getActiveObject();
			  activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');		    
		    canvas.renderAll();
		});
	  $("#text-strike").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
		    canvas.renderAll();
		  }
		});
	  $("#text-underline").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
		    canvas.renderAll();
		  }
		});
	  $("#text-left").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'left';
		    canvas.renderAll();
		  }
		});
	  $("#text-center").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'center';		    
		    canvas.renderAll();
		  }
		});
	  $("#text-right").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'right';		    
		    canvas.renderAll();
		  }
		});	
		
	  //COR DO TEXTO
	 $(document).on("click", ".color_text", function(){
		  var color = $(this).val();
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && (activeObject.type === 'text' || activeObject.type === 'group')) {
			activeObject.set({fill:color});
	        canvas.renderAll();
	      }
		  $(".cores").hide();
		  $(".btn-close-cores").hide();
		  $(".btn_sacola_css").show();
	 });
	 
	 //COR FUNDO TEXTO
	$(document).on("click", ".color_text2", function(){
		  var color = $(this).val();
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && (activeObject.type === 'text' || activeObject.type === 'group')) {
			activeObject.set({'backgroundColor':color});
	        canvas.renderAll();
	      }
		  $(".cores").hide();
		  $(".btn-close-cores").hide();
		  $(".btn_sacola_css").show();
	 });
	 
	 function setFont(font){
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && (activeObject.type === 'text' || activeObject.type === 'curvedText')) {
			activeObject.fontFamily = font;
	        canvas.renderAll();
	      }
		  $(".fonte_det").css('display', 'none');
		  $(".btn-close-fontes").hide();
	 }
	  
	 $(document).on("click", ".fonte_tipo", function(){	
		  var font = $(this).attr('alt');
		  setFont(font);
	 });
	 	 
	 //REMOVER EFEITO
	 $("#removeEffect").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.RemoveWhite({hreshold: 200, distance: 0});;//0-255, 0-255
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //TONS DE CINZA
	 $("#grayScale").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Grayscale(0);
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //REMOVER BRANCO
	 $("#removeWhite").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[2] =  new fabric.Image.filters.RemoveWhite({hreshold: 200, distance: 10});//0-255, 0-255
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //INVERTIDO
	 $("#invert").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Invert(1);
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //SEPIA
	 $("#sepia").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Sepia();
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //SEPIA2
	 $("#sepia2").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Sepia2();
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //BRILHO
	 $("#brightness").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Brightness({brightness: parseInt(50, 10)});
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //NOISE
	 $("#noise").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Noise({noise: parseInt(30, 10)});
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 //PIXELS
	 $("#pixelate").click(function() {
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Pixelate({blocksize: parseInt(5, 10)});
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 });
	 
	 function onSelectedCleared(e){
		 $("#texteditor").css('display', 'none');
		 $("#text-string").val("");
		 $("#imageeditor").css('display', 'none');
		 $(".text_edit_bar").css('display', 'none');
		 $(".efeitos").css('display', 'none');
		 $(".pattern_menu").css('display', 'none');
		 $(".filtros").css('display', 'none');
		 $(".tcurvo").css('display', 'none');
		 $(".btn-close-tcurvo").css('display', 'none');
		 $(".efeitos_edit").css('display', 'none');
		 $(".foto_menu1").css('display', 'none');
		 $(".foto_menu2").css('display', 'none');
		 $("#aviso_foto").css('display', 'none');
		 canvas.deactivateAll().renderAll();
		 console.log("LIMPA");
	 }
	 
	 $(document).on("click", "#onSelectedCleared", function(){	
		  onSelectedCleared();
	 });
	 
	 $(document).on("click", "#barra_fim", function(){	
		  onSelectedCleared();
	 });
	    
	  $("#font-family").live(function() {
	      var activeObject = canvas.getActiveObject();
	        activeObject.fontFamily = this.value;
	        canvas.renderAll();
	    });
		
	   //canvas.add(new fabric.fabric.Object({hasBorders:true,hasControls:false,hasRotatingPoint:false,selectable:false,type:'rect'}));
	   $("#drawingArea").hover(
	        function() { 	        	
	        	 canvas.add(line1);
		         canvas.add(line2);
		         canvas.add(line3);
		         canvas.add(line4); 
		         canvas.renderAll();
	        },
	        function() {	        	
	        	 canvas.remove(line1);
		         canvas.remove(line2);
		         canvas.remove(line3);
		         canvas.remove(line4);
		         canvas.renderAll();
	        }
	    );
			   

		
	   $(".clearfix button,a").tooltip();
	   line1 = new fabric.Line([0,0,150,0], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line2 = new fabric.Line([199,0,150,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line3 = new fabric.Line([0,0,0,212], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line4 = new fabric.Line([0,212,150,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});	 
	 
	 });//doc ready
	 	 	 	 	 
	  //COR CANVAS
	 function color_canvas(color){
		  console.log(switcher);
		  $("#tcanvas").css({"background-color":color});
		  $("#queImg").css({"background-color":color});
		  $("#queImg2").css({"background-color":color});
		  $(".btn-close-cores-fundo").hide();
		  $(".efeitos").hide();
		  $("#cor_fundo_canvas_save").val(color);
	 }
	 
	 function getRandomNum(min, max) {
	    return Math.random() * (max - min) + min;
	 }
	 
	 function onObjectSelected(e) {	 
	    var selectedObject = e.target;
	    
		console.log('selecionado:'+selectedObject.type);
		
		$("#text-string").val("");
	    selectedObject.hasRotatingPoint = true
	    if (selectedObject && selectedObject.type === 'text') {
	    	//display text editor	    	
	    	$("#texteditor").css('display', 'block');
	    	$("#text-string").val(selectedObject.getText());	    		
			$("#imageeditor").css('display', 'block');
			$(".text_edit_bar").css('display', 'block');
	    }
	    else if (selectedObject && selectedObject.type === 'image'){
	    	//display image editor
	    	$("#texteditor").css('display', 'none');	
	    	$("#imageeditor").css('display', 'block');
			$(".text_edit_bar").css('display', 'none');
	    }
		else if (selectedObject && selectedObject.type === 'rect'){
	    	//display image editor
	    	$("#texteditor").css('display', 'none');	
	    	$("#imageeditor").css('display', 'block');
			$(".text_edit_bar").css('display', 'none');
	    }
		else if (selectedObject && selectedObject.type === 'curvedText'){
	    	//display image editor
	    	$("#texteditor").css('display', 'none');	
	    	$("#imageeditor").css('display', 'block');
			$(".text_edit_bar").css('display', 'none');
	    }
		else if (selectedObject && selectedObject.type === 'group'){
	    	//display image editor
	    	$("#texteditor").css('display', 'none');	
	    	$("#imageeditor").css('display', 'block');
			$(".text_edit_bar").css('display', 'none');
	    }
	  }