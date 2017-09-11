var tplOrden = null;
var tplMercancia = null;
function panelOrdenes(){
	$("#dvTitulo").html("Ordenes");
	
	$.get("vistas/ordenes.tpl", function(pOrdenes){
		$("#modulo").html(pOrdenes);
		
		jsShowWindowLoad("Estamos obteniendo tus ordenes asignadas");
		$.post(server + "listaOrdenesAgente", {
			"movil": 1,
			"usuario": idUsuario
		}, function(ordenes){
			jsRemoveWindowLoad();
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
						
						getMercancia();
					});
				});
				
				$("#accOrdenes").append(plantilla);
			});
		}, "json");
		
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
		    		
		    		plantilla.find("[accion=modificar]").attr("datos", mercancia.json).click(function(){
		    			$.each(mercancia, function(key, valor){
		    				$("#frmMercancia").find("[campo="+ key +"]").val(valor);
		    				
		    				$("#winAddMercancia").modal();
		    			});
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
				    		} else { alertify.error("Has pulsado '" + alertify.labels.cancel + "'");
					    	}
					    });
		    		});
		    		
		    		plantilla.find("[accion=fotografias]").attr("identificador", mercancia.idMercancia).click(function(){
		    			$("#winFotografias").modal();
		    		});
		    		
		    		$("#tabMercancia").find(".lista").append(plantilla);
		    	});			    	
		    }, "json");
	    }
	    
	    
	    $("#frmMercancia").validate({
			debug: true,
			rules: {
				//txtCodigo: "required",
				txtFraccion: "required",
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
				txtPesoBruto: {
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
					"fraccion": $("#txtFraccion").val(), 
					"descripcion": $("#txtDescripcion").val(), 
					"marca": $("#txtMarca").val(), 
					"modelo": $("#txtModelo").val(),
					"serie": $("#txtSerie").val(),
					"cantidad": $("#txtCantidad").val(),
					"pesoneto": $("#txtPesoNeto").val(),
					"pesobruto": $("#txtPesoBruto").val(),
					"embalaje": $("#txtEmbalaje").val(),
					"mctm": $("#txtMCTM").val(),
					"ec": $("#txtEC").val(),
					"observaciones": $("#txtObservaciones").val(),
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
						$("#fotoPerfil").attr("src", "data:image/jpeg;base64," + imageData);
						
						//img.attr("src", "data:image/jpeg;base64," + imageURI);
						//img.attr("src2", imageURI);
						subirFotoPerfil(imageData);
					}, function(message){
						alertify.error("Ocurrio un error al subir la imagen");
				        setTimeout(function() {
				        	$("#mensajes").fadeOut(1500).removeClass("alert-danger");
				        }, 5000);
					}, { 
						quality: 100,
						//destinationType: Camera.DestinationType.FILE_URI,
						destinationType: Camera.DestinationType.DATA_URL,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 250,
						targetHeight: 250,
						correctOrientation: true,
						allowEdit: true
					});
			}else{
				alertify.error("No se pudo iniciar la cámara");
				console.log("No se pudo inicializar la cámara");
			}
		});
		
		
		function subirFotoPerfil(imageURI){
			jsShowWindowLoad("Estamos subiendo la fotografía");
			$.post(server + 'cmercancia', {
					"imagen": imageURI,
					"movil": 1,
					"identificador": $("#idMercancia").val(),
					"action": "uploadImagenPerfil"
				}, function(data){
					jsRemoveWindowLoad();
					
					if (data.band)
						alertify.success("La fotografía se cargó con éxito");
					else
						alertify.error("Ocurrió un error al subir la fotografía");
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