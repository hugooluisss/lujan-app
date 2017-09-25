var tplOrden = null;
var tplMercancia = null;
function panelOrdenes(){
	$("#dvTitulo").html("Ordenes");
	
	$.get("vistas/ordenes.tpl", function(pOrdenes){
		$("#modulo").html(pOrdenes);
		
		$.each(paises, function(i, pais){
			$("#selOrigen").append($("<option />", {value: pais.idPais, text: pais.iso + " - " + pais.nombre}));
		});
		
		jsShowWindowLoad("Estamos obteniendo tus ordenes asignadas");
		$.post(server + "listaOrdenesAgente", {
			"movil": 1,
			"usuario": idUsuario
		}, function(ordenes){
			jsRemoveWindowLoad();
			if (ordenes.length == 0)
				alertify.success("No tienes ordenes de trabajo pendientes por revisar");
			
			$.each(ordenes, function(){
				var orden = this;
				var plantilla = tplOrden.clone();
				
				$.each(orden, function(key, valor){
					plantilla.find("[campo=" + key + "]").html(valor);
					plantilla.find("[campo=" + key + "]").val(valor);
				});
				
				plantilla.find("[campo=estado]").css("color", orden.color);
				
				plantilla.find("button").attr("json", orden.json).click(function(){
					var btn = $(this);
					$("#accOrdenes").hide("slow", function(){
						$("#detalleOrden").show();
						
						var orden = jQuery.parseJSON(btn.attr("json"));
						$("#dvTitulo").html("Factura " + orden.factura);
						$.each(orden, function(key, valor){
							//$("#detalleOrden").find("[campo=" + key + "]").html(valor);
							var el = $("#detalleOrden").find("[campo=" + key + "]");
							if (el.is("select") || el.is("input"))
								el.val(valor);
							else
								el.text(valor);
						});
						
						if (orden.archivo == "")
							$("#btnDescargarFactura").hide();
						else{
							$("#btnDescargarFactura").show();
							//$("#btnDescargarFactura").prop("href", server + orden.archivo);
							$("#btnDescargarFactura").prop("href", "#");
							$("#btnDescargarFactura").click(function(){
								window.open = cordova.InAppBrowser.open;
								window.open(server + orden.archivo, '_system');
							});
						}						
						
						getMercancia();
					});
				});
				
				$("#accOrdenes").append(plantilla);
			});
		}, "json");
		
		$("#setRevisada").click(function(){
			alertify.confirm("Estás indicando que terminaste la revisión ¿Seguro?", function(e){
	   			if (e){
	   				var obj = new TOrden;
	   				obj.add({
		   				id: $("#id").val(), 
						estado: 3,
						fn: {
							before: function(){
								$("#frmGenerales").find("[type=submit]").prop("disabled", true);
								jsShowWindowLoad("Actualizando información en el servidor");
							},
							after: function(datos){
								$("#frmGenerales").find("[type=submit]").prop("disabled", false);
								jsRemoveWindowLoad();
								if (datos.band){
									alertify.success("Se ha actualizado el cambio de estado");
									panelOrdenes();
								}else{
									alertify.error("Upps... Ocurrió un error al registrar la orden");
								}
							}
						}
					});
	   			}
	   		});

		});
		
		$("#frmGenerales").submit(function(){
			var obj = new TOrden;
				
			obj.add({
				id: $("#id").val(), 
				lugar: $("#txtLugar").val(),
				transportista: $("#txtTransportista").val(),
				chofer: $("#txtChofer").val(),
				gafete: $("#selGafete").val(),
				contenedor: $("#txtContenedor").val(),
				tipoContenedor: $("#txtTipoContenedor").val(),
				claveContenedor: $("#txtClaveContenedor").val(),
				placas: $("#txtPlacas").val(),
				numeroCandado: $("#txtNumeroCandado").val(),
				pesoBruto: $("#txtPesoBruto").val(),
				fn: {
					before: function(){
						$("#frmGenerales").find("[type=submit]").prop("disabled", true);
						jsShowWindowLoad("Actualizando información en el servidor");
					},
					after: function(datos){
						$("#frmGenerales").find("[type=submit]").prop("disabled", false);
						jsRemoveWindowLoad();
						if (datos.band){
							alertify.success("Información actualizada");
						}else{
							alertify.error("Upps... Ocurrió un error al registrar la orden");
						}
					}
				}
			});
	    });
	    
	    function getMercancia(){
		    $.post(server + "listaMercancia", {
		    	"orden": $("#id").val(),
		    	"json": true,
		    	"movil": 1
		    }, function(mercancias){
		    	$("#tabMercancia").find(".lista").html("");
		    	
		    	$.each(mercancias, function(i, mercancia){
		    		var plantilla = tplMercancia.clone();
		    		$.each(mercancia, function(key, valor){
		    			plantilla.find("[campo="+ key +"]").val(valor);
		    			plantilla.find("[campo="+ key +"]").html(valor);
		    		});
		    		
		    		if (mercancia.imagenes.length > 0)
			    		plantilla.find("img").prop("src", server + mercancia.imagenes[mercancia.imagenes.length - 1].src);
		    		
		    		plantilla.find("[accion=modificar]").attr("datos", mercancia.json).click(function(){
		    			$.each(mercancia, function(key, valor){
		    				$("#frmMercancia").find("[campo="+ key +"]").val(valor);
		    			});
		    			
		    			var text = $("select[campo=idOrigen] option[value=" + mercancia.idOrigen + "]").text();
	    				$('.bootstrap-select .filter-option').text(text);
	    				$('select[name=idOrigen]').val(mercancias.idOrigen);
		    				
		    			$("#winAddMercancia").modal();
		    			
		    			showSetTipoOrden();
		    		});
		    		
		    		plantilla.find("[accion=eliminar]").attr("identificador", mercancia.idMercancia).click(function(){
		    			alertify.confirm("¿Seguro?", function (e) {
			    			if (e) {
				    			var obj = new TOrden;
				    			obj.eliminarMercancia({
				    				id: mercancia.idMercancia,
				    				fn: {
					    				before: function(){
						    				jsShowWindowLoad("Se está procesando la eliminación de la mercancía");
					    				}, after: function(resp){
						    				jsRemoveWindowLoad();
						    				if (resp.band){
						    					alertify.success("Mercancía eliminada");
						    					getMercancia();
						    				}
					    				}
				    				}
				    			});
				    		} else {
				    			alertify.error("Has pulsado '" + alertify.labels.cancel + "'");
				    		}
					    });
		    		});
		    		
		    		plantilla.find("[accion=fotografias]").attr("identificador", mercancia.idMercancia).click(function(){
		    			$("#winFotografias").attr("mercancia", mercancia.idMercancia);		    			
		    			$("#winFotografias").modal();
		    		});
		    		
		    		$("#tabMercancia").find(".lista").append(plantilla);
		    	});			    	
		    }, "json");
	    }
	    
	    $('.selectpicker').selectpicker();
	    $("#btnAgregarMercancia").click(function(){
	    	showSetTipoOrden();
	    });
	    
	    function showSetTipoOrden(){
		    if($("#idTipo").val() == 1)
	    		$("#frmMercancia").find("#dvOrigen").show();
	    	else{
		    	$("#frmMercancia").find("#dvOrigen").hide();
		    	var text = $("select[campo=idOrigen] option[value=146]").text();
				$('.bootstrap-select .filter-option').text(text);
				$('select[name=idOrigen]').val(146);
		    }
	    }
	    
	    $("#frmMercancia").validate({
			debug: true,
			rules: {
				txtDescripcion: "required",
				txtMarca: "required",
				txtModelo: "required",
				txtSerie: "required",
				txtCantidad: {
					required: true,
					number: true
				},
				txtPesoNeto: {
					required: true,
					number: true
				},
				txtCantidad: {
					required: true,
					number: true
				}
			},
			wrapper: 'span', 
			submitHandler: function(form){
				var obj = new TOrden;
				obj.addMercancia({
					"id": $("#idMercancia").val(),
					"orden": $("#id").val(),
					"descripcion": $("#txtDescripcion").val(), 
					"marca": $("#txtMarca").val(), 
					"modelo": $("#txtModelo").val(),
					"serie": $("#txtSerie").val(),
					"cantidad": $("#txtCantidad").val(),
					"pesoneto": $("#txtPesoNeto").val(),
					"embalaje": $("#txtEmbalaje").val(),
					"mctm": $("#txtMCTM").val(),
					"ec": $("#txtEC").val(),
					"observaciones": $("#txtObservaciones").val(),
					"origen": $("#selOrigen").val(),
					fn: {
						before: function(){
							jsShowWindowLoad("Se está agregando la mercancía");
						},
						after: function(datos){
							jsRemoveWindowLoad();
							if (datos.band){
								getMercancia();
								$("#winAddMercancia").modal("hide");
								alertify.success("Agregado");
							}else{
								alertify.error("No se pudo guardar");
							}
						}
					}
				});
			}
		});
		
		$('#winAddMercancia').on('hidden.bs.modal', function(){
			$("#frmMercancia")[0].reset();
		});
		
		$("#btnCamara").click(function(){
			if (navigator.camera != undefined){
				navigator.camera.getPicture(function(imageData) {
						subirFoto(imageData);
					}, function(message){
						alertify.error("Ocurrio un error al subir la imagen");
					}, { 
						quality: 100,
						//destinationType: Camera.DestinationType.FILE_URI,
						destinationType: Camera.DestinationType.DATA_URL,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 500,
						targetHeight: 500,
						correctOrientation: true
						//allowEdit: true
					});
			}else{
				alertify.error("No se pudo iniciar la cámara");
				console.log("No se pudo inicializar la cámara");
			}
		});
		
		$("#btnGaleria").click(function(){
			if (navigator.camera != undefined){
				navigator.camera.getPicture(function(imageData) {
						subirFoto(imageData);
					}, function(message){
						alertify.error("Ocurrio un error al subir la imagen");
					}, { 
						quality: 100,
						sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
						destinationType: Camera.DestinationType.DATA_URL,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 500,
						targetHeight: 500,
						correctOrientation: true
					});
			}else{
				alertify.error("No se pudo iniciar la cámara");
				console.log("No se pudo inicializar la cámara");
			}
		});
		
		
		function subirFoto(imageURI){
			jsShowWindowLoad("Estamos subiendo la fotografía");
			$.post(server + 'cmercancias', {
					"imagen": imageURI,
					"movil": 1,
					"identificador": $("#winFotografias").attr("mercancia"),
					"action": "uploadImagen"
				}, function(data){
					jsRemoveWindowLoad();
					
					if (data.band){
						alertify.success("La fotografía se cargó con éxito");
						listarFotos();
					}else
						alertify.error("Ocurrió un error al subir la fotografía");
				}, "json");
		}
		
		$('#winFotografias').on('shown.bs.modal', function(){
			$("#winFotografias").find(".listaImagenes").html("");
			listarFotos();
		});
		
		function listarFotos(){
			jsShowWindowLoad("Obteniendo lista de fotografías");
			$.post(server + "cmercancias", {
				"identificador": $("#winFotografias").attr("mercancia"),
				"action": "getFotografias",
				"movil": 1,
				"json": true
			}, function(imagenes){
				jsRemoveWindowLoad();
				$("#winFotografias").find(".listaImagenes").html("");
				$.each(imagenes, function(i, imagen){
    				var panel = $("<div />", {class: "panel"});
    				var panelBody = $("<div />", {class: "panel-body text-center"});
    				var panelFooter = $("<div />", {class: "panel-footer text-right"});
    				var img = $("<img />", {class: "img-responsive", src: server + imagen.src});
    				var eliminar = $("<button />", {class: "btn btn-xs btn-danger", html: '<i class="fa fa-trash" aria-hidden="true"></i>'});
    				
    				eliminar.click(function(){
    					var foto = $(this);
	    				alertify.confirm("¿Seguro?", function (e) {
			    			if (e) {
			    				jsShowWindowLoad("Se está eliminado la fotografía del servidor");
				    			$.post(server + "cmercancias", {
				    				"action": "eliminarFoto",
				    				"archivo": imagen.src,
				    				"movil": 1,
				    				"json": true
				    			}, function(resp){
				    				jsRemoveWindowLoad();
				    				if (resp.band){
				    					foto.remove();
				    					listarFotos();
				    				}else
				    					alertify.error("No se pudo eliminar");
				    			}, "json");
				    		}
					    });
    				});
    				
    				//var descargar = $("<a />", {class: "btn btn-xs btn-success", html: '<i class="fa fa-download" aria-hidden="true"></i>', href: server + imagen.src, download: imagen.nombre});
    				
    				panel.append(panelBody).append(panelFooter);
    				panelBody.append(img).append('<br />').append(imagen.nombre);
    				panelFooter.append(eliminar);
    				
	    			$("#winFotografias").find(".listaImagenes").append(panel);
    			});
				
			}, "json");
			
		}
	});
}

$(document).ready(function(){
	$.get("vistas/orden.tpl", function(resp){
		tplOrden = $(resp);
	});
	
	$.get("vistas/mercancia.tpl", function(resp){
		tplMercancia = $(resp);
	});
});