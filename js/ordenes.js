var tplOrden = null;
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
		    	$("#listaMercancia").find("tbody").html("");
		    	
		    	if (mercancias.lenght > 0){
			    	$.each(mercancias, function(){
			    		var mercancia = $(this);
			    		
			    		var tr = $("<tr />");
			    		var fraccion = $("<td />", {
			    			text: mercancia.fraccion
			    		});
			    		var descripcion = $("<td />", {
			    			text: mercancia.descripcion
			    		});
			    		
			    		tr.append(fraccion).append(descripcion);
			    		$("#listaMercancia tbody").append(tr);
			    	});
			    }else{
				    var tr = $("<tr />");
			    		var descripcion = $("<td />", {
			    			text: "Sin mercancia agregada"
			    		});
			    		
			    		tr.append(descripcion);
			    		$("#listaMercancia tbody").append(tr);
			    }
			    	
		    }, "json");
	    }
	});
}

$(document).ready(function(){
	$.get("vistas/orden.tpl", function(resp){
		tplOrden = $(resp);
	});
});