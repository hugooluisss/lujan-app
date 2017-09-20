<div id="accOrdenes" role="tablist" aria-multiselectable="true">
</div>

<div id="detalleOrden" class="card" style="display: none">
	<ul class="nav nav-tabs" role="tablist">
		<li class="active">
			<a data-toggle="tab"href="#tabDetalleOrden">Detalle</a>
		</li>
		<li>
			<a data-toggle="tab" href="#tabMercancia">Mercancia</a>
		</li>
		<li>
			<a data-toggle="tab" href="#tabAcciones">Acciones</a>
		</li>
	</ul>
	
	<div class="tab-content">
		<div class="tab-pane active" id="tabDetalleOrden" role="tabpanel">
			<div class="container">
				<form id="frmGenerales" class="form-horizontal" onsubmit="javascript: return false;">
					<div class="form-group">
						<label for="txtFecha" class="col-xs-2 label-control">Fecha</label>
						<div class="col-xs-6" campo="fecha"/>
					</div>
					<div class="form-group row">
						<label for="txtFactura" class="col-xs-2">Factura</label>
						<div class="col-xs-6" campo="factura" />
					</div>
					<div class="form-group row">
						<label for="txtCliente" class="col-xs-2">Cliente</label>
						<div class="col-xs-10" campo="cliente" />
					</div>
					<div class="form-group row">
						<label for="selEstado" class="col-xs-2">Estado</label>
						<div class="col-xs-4" campo="estado" />
						<label for="selTipo" class="col-xs-2">Tipo</label>
						<div class="col-xs-4" campo="tipo"/>
					</div>
					<hr />
					
					<div class="form-group row">
						<label for="txtLugar" class="col-xs-12 label-control">Lugar</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtLugar" name="txtLugar" campo="lugar">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtTransportista" class="col-xs-12 label-control">Transportista</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtTransportista" name="txtTransportista" campo="transportista">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtChofer" class="col-xs-12 label-control">Chofer</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtChofer" name="txtChofer" campo="chofer">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtGafete" class="col-xs-12 label-control">Gafete</label>
						<div class="col-xs-12">
							<select id="selGafete" name="selGafete" class="form-control form-control-sm" campo="gafete">
								<option value="1">Si</option>
								<option value="0">No</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="txtContenedor" class="col-xs-12 label-control">Contenedor</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtContenedor" name="txtContenedor" campo="contenedor">
						</div>
						<label for="txtTipoContenedor" class="col-xs-12 label-control">Tipo de contenedor</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtTipoContenedor" name="txtTipoContenedor" campo="tipocontenedor">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtClaveContenedor" class="col-xs-12 label-control">Clave del contenedor</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtClaveContenedor" name="txtClaveContenedor" campo="clavecontenedor">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtPlacas" class="col-xs-12 label-control">Placas</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtPlacas" name="txtPlacas" campo="placas">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtNumeroCandado" class="col-xs-12 label-control">Numero del candado</label>
						<div class="col-xs-12">
							<input class="form-control form-control-sm" id="txtNumeroCandado" name="txtNumeroCandado" campo="numerocandado">
						</div>
					</div>
					
					<div class="row">
						<div class="col-xs-12">
							<button type="submit" class="btn btn-success btn-block">Guardar</button>
							<input type="hidden" id="id" name="id" campo="idOrden" />
							<input id="idTipo" name="idTipo" type="hidden" campo="idTipo">
						</div>
					</div>
				</form>
			</div>
		</div>
		
		
		<div class="tab-pane" id="tabMercancia" role="tabpanel">
			<div class="row">
				<div class="col-xs-12 text-right">
					<div class="btn-group btn-group-xs" role="group" aria-label="Basic example">
						<button type="button" class="btn btn-primary" id="btnAgregarMercancia" data-toggle="modal" data-target="#winAddMercancia"><i class="fa fa-plus" aria-hidden="true"></i></button>
					</div>
				</div>
			</div>
			<hr />
			<div class="lista">
			</div>
		</div>
		<div class="tab-pane" id="tabAcciones" role="tabpanel">
			<div class="container">
				<a href="" class="btn btn-primary btn-block" id="btnDescargarFactura" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Descargar Factura</a>
				<br />
				<br />
				<button id="setRevisada" name="setRevisada" class="btn btn-danger btn-block"> Establecer como Revisada</button>
			</div>
		</div>
	</div>
</div>

<form onsubmit="javascript: return false" method="post" id="frmMercancia" name="frmMercancia" class="form-horizontal">
	<div class="modal fade" id="winAddMercancia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h5 class="modal-title" id="exampleModalLabel">Mercancia</h5>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="txtDescripcion" class="control-label col-xs-4">Descripción</label>
						<div class="col-xs-8">
							<input class="form-control input-xs" id="txtDescripcion" name="txtDescripcion" campo="descripcion">
						</div>
					</div>
					<div class="form-group" id="dvOrigen">
						<label for="selOrigen" class="control-label col-xs-4">Origen</label>
						<div class="col-xs-8">
							<select id="selOrigen" name="selOrigen" class="form-control selectpicker" campo="idOrigen" style="width: 100%" data-live-search="true">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="txtMarca" class="control-label col-xs-4">Marca</label>
						<div class="col-xs-8">
							<input class="form-control input-xs" id="txtMarca" name="txtMarca" campo="marca">
						</div>
					</div>
					<div class="form-group">
						<label for="txtModelo" class="control-label col-xs-4">Modelo</label>
						<div class="col-xs-8">
							<input class="form-control input-xs" id="txtModelo" name="txtModelo" campo="modelo">
						</div>
					</div>
					<div class="form-group">
						<label for="txtSerie" class="control-label col-xs-4">Serie</label>
						<div class="col-xs-8">
							<input class="form-control input-xs" id="txtSerie" name="txtSerie" campo="serie">
						</div>
					</div>
					<div class="form-group">
						<label for="txtCantidad" class="control-label col-xs-4">Cantidad</label>
						<div class="col-xs-4">
							<input class="form-control text-right input-xs" id="txtCantidad" name="txtCantidad" value="1" campo="cantidad">
						</div>
					</div>
					<div class="form-group">
						<label for="txtPesoNeto" class="control-label col-xs-4">Peso neto</label>
						<div class="col-xs-8">
							<input class="form-control input-xs" id="txtPesoNeto" name="txtPesoNeto" value="1.0" campo="pesoneto">
						</div>
					</div>
					<div class="form-group">
						<label for="txtEmbalaje" class="control-label col-xs-4">Embalaje</label>
						<div class="col-xs-8">
							<input class="form-control input-xs" id="txtEmbalaje" name="txtEmbalaje" campo="embalaje">
						</div>
					</div>
					<div class="form-group">
						<label for="txtMCTM" class="control-label col-xs-4">Marcado correcto (TM)</label>
						<div class="col-xs-8">
							<select class="form-control" id="txtMCTM" name="txtMCTM" campo="mctm">
								<option value="NA">No aplica</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="txtEC" class="control-label col-xs-4">Etiquetado correcto</label>
						<div class="col-xs-8">
							<select class="form-control" id="txtEC" name="txtEC" campo="ec">
								<option value="NA">No aplica</option>
								<option value="Si">Si</option>
								<option value="No">No</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="txtObservaciones" class="control-label col-xs-4">Observaciones</label>
						<div class="col-xs-8">
							<textarea class="form-control" id="txtObservaciones" name="txtObservaciones" campo="observaciones"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					<button type="submit" class="btn btn-info pull-right">Guardar</button>
					<input id="idMercancia" name="idMercancia" type="hidden" campo="idMercancia">
					<input id="id" name="id" type="hidden" campo="idOrden">
				</div>
			</div>
		</div>
	</div>
</form>



<div class="modal fade" id="winFotografias" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" mercancia="">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h5 class="modal-title" id="exampleModalLabel">Fotografías</h5>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-12 listaImagenes">
						
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnCamara" class="btn btn-primary" title="Cámara"><i class="fa fa-camera" aria-hidden="true"></i> Cámara</button>
				<button id="btnGaleria" class="btn btn-primary" title="Galería"><i class="fa fa-picture-o" aria-hidden="true"></i> Álbum</button>
			</div>
		</div>
	</div>
</div>