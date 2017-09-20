TOrden = function(){
	var self = this;
	
	this.add = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cordenes', {
				"id": datos.id,
				"estado": datos.estado,
				"cliente": datos.cliente,
				"usuario": datos.usuario,
				"tipo": datos.tipo,
				"fecha": datos.fecha,
				"factura": datos.factura,
				"lugar": datos.lugar,
				"transportista": datos.transportista,
				"chofer": datos.chofer,
				"gafete": datos.gafete,
				"contenedor": datos.contenedor,
				"tipoContenedor": datos.tipoContenedor,
				"claveContenedor": datos.claveContenedor,
				"placas": datos.placas,
				"numeroCandado": datos.numeroCandado,
				"movil": 1,
				"action": "add"
			}, function(data){
				if (data.band == 'false')
					console.log(data.mensaje);
					
				if (datos.fn.after !== undefined) datos.fn.after(data);
			}, "json");
	};
	
	this.addMercancia = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cmercancias', {
				"id": datos.id,
				"orden": datos.orden,
				"descripcion": datos.descripcion,
				"marca": datos.marca,
				"modelo": datos.modelo,
				"serie": datos.serie,
				"cantidad": datos.cantidad,
				"pesoneto": datos.pesoneto,
				"embalaje": datos.embalaje,
				"mctm": datos.mctm,
				"ec": datos.ec,
				"observaciones": datos.observaciones,
				"origen": datos.origen,
				"action": "add",
				"movil": 1
			}, function(data){
				if (data.band == false)
					console.log(data.mensaje);
					
				if (datos.fn.after !== undefined) datos.fn.after(data);
			}, "json");
	};
	
	this.eliminarMercancia = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cmercancias', {
				"id": datos.id,
				"action": "del",
				"movil": 1
			}, function(data){
				if (data.band == false)
					console.log(data.mensaje);
					
				if (datos.fn.after !== undefined) datos.fn.after(data);
			}, "json");
	};
};