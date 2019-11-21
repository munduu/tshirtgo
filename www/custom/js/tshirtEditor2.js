var canvas;
var tshirts = new Array(); //prototype: [{style:'x',color:'white',front:'a',back:'b',price:{tshirt:'12.95',frontPrint:'4.99',backPrint:'4.99',total:'22.47'}}]
var a;
var b;
var line1;
var line2;
var line3;
var line4;
 	$(document).ready(function() {
		//setup front side canvas 
 		canvas = new fabric.Canvas('tcanvas', {
		  hoverCursor: 'pointer',
		  selection: true,
		  selectionBorderColor:'blue'
		});
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
		  //e.target.setFill('red');
		  //canvas.renderAll();
		});
		
 		canvas.on('object:out', function(e) {		
		  //e.target.setFill('green');
		  //canvas.renderAll();
		});
				 		 	 
	  	//$(".img-polaroid").click(function(e){
		$(document).on("click", ".img-polaroid", function(e){	
			var el = e.target;
	  		/*temp code*/
						
	  		var offset = 50;
	        var left = fabric.util.getRandomInt(0 + offset, 150 - offset);
	        var top = fabric.util.getRandomInt(0 + offset, 212 - offset);
	        var angle = fabric.util.getRandomInt(-20, 40);
	        var width = fabric.util.getRandomInt(30, 50);
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
		            padding: 2,
		            cornersize: 20,
					width:objectWidth,
					height:objectHeight,
	      	  		hasRotatingPoint:false
		          });
		          //image.scale(getRandomNum(0.1, 0.25)).setCoords();
		          canvas.add(image);
		        });
			$(".clips").fadeToggle( "slow", "linear" );
			$(".btn-close-clips-voltar").hide();
			$(".btn-close-clips").hide();
			$(".btn_sacola_css").show();
	  	});
		
		//FOTO
	  	$(document).on("change", ".button_img", function(e){	
			
			var el = e.target.files[0];
			alert(e.target.result);
	  		/*temp code*/
						
	  		var offset = 50;
	        var left = fabric.util.getRandomInt(0 + offset, 150 - offset);
	        var top = fabric.util.getRandomInt(0 + offset, 212 - offset);
	        var angle = fabric.util.getRandomInt(-20, 40);
	        var width = fabric.util.getRandomInt(30, 50);
	        var opacity = (function(min, max){ return Math.random() * (max - min) + min; })(0.5, 1);
			
			/* 	TAMANHO DO OBJETO */
			var objectWidth  = el.width*3;
			var objectHeight = el.height*3;
						
			if(objectWidth>300){
				objectHeight = (objectHeight * 300 / objectWidth)*3;
				objectWidth  = 300*3;
				
			}
				        
	  		fabric.Image.fromURL(e.target.result, function(image) {
		          image.set({
		            left: left,
		            top: top,
		            angle: 0,
		            padding: 2,
		            cornersize: 20,
					width:objectWidth,
					height:objectHeight,
	      	  		hasRotatingPoint:false
		          });
		          //image.scale(getRandomNum(0.1, 0.25)).setCoords();
		          canvas.add(image);
		        });
	  	});
	  
	  
	  //PATTERN
	  function loadPattern(url) {
		var activeObject = canvas.getActiveObject();
		fabric.util.loadImage(url, function(img) {
		activeObject.fill = new fabric.Pattern({
			source: img,
			repeat: 'repeat'
		  });
		  
		  canvas.renderAll();
		});
		$(".efeitos").fadeToggle( "slow", "linear" );
	  }
	
	  //$(".pattern").click(function() {
	  $(document).on("click", ".pattern", function(){	
		  var url = $(this).attr("src");
		  loadPattern(url);
	  });
	  //PATTERN
	  
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
		  var activeObject = canvas.getActiveObject();
		  activeObject.clone(function (clone) {
			clone.set({
				left: fabric.util.getRandomInt(0, 200),
				top: fabric.util.getRandomInt(0, 100)
			});
			canvas.add(clone);
          });
		  canvas.renderAll();
	  });
	  
	  
	  //TEXTO CURVO
	  Example = new CurvedText(canvas,{
		  top: fabric.util.getRandomInt(0, 200),
		  left: fabric.util.getRandomInt(0, 100),
		  spacing: 50,
		  rotate: 0,
		  radius: 50,
		  radiusX: null,
		  radiusY: null,
		  align: 'center',
		  reverse: false,
		  fontSize: 820,
		  fontWeight: 'normal',
		  fontFamily: 'Arial',
		  fill: '#000',
		  selectable: true,
		  hasControls: false
	  });
	  	  
	  $('.radiusX, .radiusY, .spacing, .rotate, .align, .fontSize').change(function(){
		var activeObject = canvas.getActiveObject();
		Example.set( $(this).attr('class'), $(this).val() , true ) ;    
	  });
	  $('.reverse').change(function(){
		var activeObject = canvas.getActiveObject();
		Example.set( 'reverse', ( $(this).val() == 'true' ) ) ;    
	  });
	  
	  $('#fonte_tipo').change(function(){
		var activeObject = canvas.getActiveObject();
		Example.set( 'fontFamily', $(this).val() , true ) ;    
	  });
	  
	  $('#text-bold').change(function(){
		var activeObject = canvas.getActiveObject();
		Example.set( $(this).attr('class'), $(this).val() , true ) ;     
	  });
	  
	  $('.ctext').keyup(function(){
		Example.setText( $(this).val() );
		$("#texteditor").css('display', 'block');
        $("#imageeditor").css('display', 'block');
	  });
	 	  
	  //TESTE TEXTO DIRETO
	  /*var newtext = new fabric.IText('Seu texto', {fontSize: 40, left: 20, top: 20, opacity: 0.3});
      newtext.set('showplaceholder', true); // Initially empty, so show placeholder

	  canvas.add(newtext);
	  newtext.setCoords();
	  canvas.setActiveObject(newtext);
	  canvas.renderAll();*/
	  
	  document.getElementById('add-text').onclick = function() {
			var text = $("#text-string").val();
			var textSample = new fabric.Text(text, {
			  left: fabric.util.getRandomInt(0, 100),
			  top: fabric.util.getRandomInt(0, 200),
			  fontFamily: 'helvetica',
			  angle: 0,
			  fill: '#000000',
			  scaleX: 0.5,
			  scaleY: 0.5,
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
		  } else {
			  var fval = activeObject.fontSize-25;
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
		  } else {
			  var fval = activeObject.fontSize+25;
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
	  $("#flip").click(function() {		  
			if ($(this).attr("data-original-title") == "Show Back View") {
				$(this).attr('data-original-title', 'Show Front View');			        		       
				var id_src = $("#produto").val();
				$("#tshirtFacing").attr("src",id_src);
				$("#tshirtFacing2").attr("src",id_src);
				$(".preco_back").hide();
				$('#drawingArea').css('top','50%');
				$('#drawingArea2').css('top','50%');
				a = JSON.stringify(canvas);
				canvas.clear();
				try
				{
				   var json = JSON.parse(b);
				   canvas.loadFromJSON(b);
				}
				catch(e)
				{}
				
			} else {
				$(this).attr('data-original-title', 'Show Back View');			    				    	
				var id_src2 = $("#produto2").val();
				$("#tshirtFacing").attr("src",id_src2);	
				$("#tshirtFacing2").attr("src",id_src2);
				$(".preco_back").show();
				$('#drawingArea').css('top','40%');
				$('#drawingArea2').css('top','40%');
				b = JSON.stringify(canvas);
				canvas.clear();
				try
				{
				   var json = JSON.parse(a);
				   canvas.loadFromJSON(a);	
				}
				catch(e)
				{}
			}		
			canvas.renderAll();
			setTimeout(function() {
				canvas.calcOffset();
			},200);
	  }); 	  
	  
	  $("#text-bold").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
		    activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');		    
		    canvas.renderAll();
		  }
		});
	  $("#text-italic").click(function() {		 
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');		    
		    canvas.renderAll();
		  }
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
	    
	  $("#font-family").live(function() {
	      var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
	        activeObject.fontFamily = this.value;
	        canvas.renderAll();
	      }
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
	 	 
	 //COR DO TEXTO
	 function color_text(color){
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && (activeObject.type === 'text' || activeObject.type === 'group')) {
	        $(".loader").show();
			activeObject.set({fill:color});
	        canvas.renderAll();
	      }
		  $(".loader").hide();
		  $(".cores").fadeToggle( "slow", "linear" );
		  $(".btn-close-cores").toggle();
		  $(".btn_sacola_css").toggle();
	 }
	 
	 //COR FUNDO TEXTO
	 function color_text2(color){
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && (activeObject.type === 'text' || activeObject.type === 'group')) {
	        $(".loader").show();
			activeObject.set({'backgroundColor':color});
	        canvas.renderAll();
	      }
		  $(".loader").hide();
		  $(".cores").fadeToggle( "slow", "linear" );
		  $(".btn-close-cores").toggle();
		  $(".btn_sacola_css").toggle();
	 }
	 
	  //COR FUNDO TEXTO
	 function color_canvas(color){
		  $("#tcanvas").css({"background-color":color});
		  $("#queImg").css({"background-color":color});
		  $("#queImg2").css({"background-color":color});
		  $(".loader").hide();
		  $(".btn-close-cores-fundo").hide();
		  $(".btn_sacola_css").show();
		  $("#cor_fundo_canvas_save").val(color);
	 }
	 
	 function getRandomNum(min, max) {
	    return Math.random() * (max - min) + min;
	 }
	 
	 function onObjectSelected(e) {	 
	    var selectedObject = e.target;
	    
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
	  }
	 
	 function onSelectedCleared(e){
		 $("#texteditor").css('display', 'none');
		 $("#text-string").val("");
		 $("#imageeditor").css('display', 'none');
		 $(".text_edit_bar").css('display', 'none');
	 }
	 
	 function setFont(font){
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && activeObject.type === 'text') {
	        $(".loader").show();
			activeObject.fontFamily = font;
	        canvas.renderAll();
	      }
		  $(".loader").hide();
		  $(".fonte_det").css('display', 'none');
		  $(".btn-close-fontes").hide();
	  }
	  
	  $(document).on("click", ".fonte_tipo", function(){	
		  var font = $(this).attr('alt');
		  setFont(font);
	  });
	 	 
	 //REMOVER EFEITO
	 function removeEffect(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.RemoveWhite({hreshold: 200, distance: 0});;//0-255, 0-255
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 
	 //TONS DE CINZA
	 function grayScale(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Grayscale(0);
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 //REMOVER BRANCO
	 function removeWhite(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[2] =  new fabric.Image.filters.RemoveWhite({hreshold: 200, distance: 10});//0-255, 0-255
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 //INVERTIDO
	 function invert(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Invert(1);
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 //SEPIA
	 function sepia(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Sepia();
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 //SEPIA2
	 function sepia2(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Sepia2();
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 //BRILHO
	 function brightness(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Brightness({brightness: parseInt(50, 10)});
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 //NOISE
	 function noise(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Noise({noise: parseInt(30, 10)});
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }
	 
	 //PIXELS
	 function pixelate(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {	    	  
			  activeObject.filters[1] =  new fabric.Image.filters.Pixelate({blocksize: parseInt(15, 10)});
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }