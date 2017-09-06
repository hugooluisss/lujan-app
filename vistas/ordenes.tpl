<div id="accOrdenes" role="tablist" aria-multiselectable="true">
</div>

<div id="detalleOrden" class="card" style="display: none">
	<ul class="nav nav-tabs nav-fill" role="tablist">
		<li class="nav-item">
			<a class="nav-link active" data-toggle="tab" role="tab" href="#tabDetalleOrden" aria-controls="tabDetalleOrden">Detalle</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" href="#tabMercancia" aria-controls="tabMercancia">Mercancia</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" href="#acciones" aria-controls="acciones">Acciones</a>
		</li>
	</ul>
	
	<div class="tab-content">
		<div class="tab-pane active" id="tabDetalleOrden" role="tabpanel">
			<div class="container">
				<form id="frmGenerales" class="form-horizontal" onsubmit="javascript: return false;">
					<div class="form-group row">
						<label for="txtFecha" class="col-2 label-control">Fecha</label>
						<div class="col-6" campo="fecha"/>
					</div>
					<div class="form-group row">
						<label for="txtFactura" class="col-2">Factura</label>
						<div class="col-6" campo="factura" />
					</div>
					<div class="form-group row">
						<label for="txtCliente" class="col-2">Cliente</label>
						<div class="col-10" campo="cliente" />
					</div>
					<div class="form-group row">
						<label for="selEstado" class="col-2">Estado</label>
						<div class="col-4" campo="estado" />
						<label for="selTipo" class="col-2">Tipo</label>
						<div class="col-4" campo="tipo"/>
					</div>
					<hr />
					
					<div class="form-group row">
						<label for="txtLugar" class="col-12 label-control">Lugar</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtLugar" name="txtLugar" campo="lugar">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtTransportista" class="col-12 label-control">Transportista</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtTransportista" name="txtTransportista" campo="transportista">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtChofer" class="col-12 label-control">Chofer</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtChofer" name="txtChofer" campo="chofer">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtGafete" class="col-12 label-control">Gafete</label>
						<div class="col-12">
							<select id="selGafete" name="selGafete" class="form-control form-control-sm" campo="gafete">
								<option value="1">Si</option>
								<option value="0">No</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="txtContenedor" class="col-12 label-control">Contenedor</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtContenedor" name="txtContenedor" campo="contenedor">
						</div>
						<label for="txtTipoContenedor" class="col-12 label-control">Tipo de contenedor</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtTipoContenedor" name="txtTipoContenedor" campo="tipocontenedor">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtClaveContenedor" class="col-12 label-control">Clave del contenedor</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtClaveContenedor" name="txtClaveContenedor" campo="clavecontenedor">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtPlacas" class="col-12 label-control">Placas</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtPlacas" name="txtPlacas" campo="placas">
						</div>
					</div>
					<div class="form-group row">
						<label for="txtNumeroCandado" class="col-12 label-control">Numero del candado</label>
						<div class="col-12">
							<input class="form-control form-control-sm" id="txtNumeroCandado" name="txtNumeroCandado" campo="numerocandado">
						</div>
					</div>
					
					<div class="row">
						<div class="col-12">
							<button type="submit" class="btn btn-success btn-block">Guardar</button>
							<input type="hidden" id="id" name="id" campo="idOrden" />
						</div>
					</div>
				</form>
			</div>
		</div>
		
		
		<div class="tab-pane" id="tabMercancia" role="tabpanel">
			<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
				<button type="button" class="btn btn-primary" id="btnAgregarMercancia" data-toggle="modal" data-target="#winAddMercancia"><i class="fa fa-plus" aria-hidden="true"></i></button>
			</div>
			<br /><br />
			<table id="listaMercancia" class="table table-condensed">
				<thead>
					<tr>
						<th>Fracción</th>
						<th>Descripción</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>

		</div>
		<div class="tab-pane" id="acciones" role="tabpanel">...3</div>
	</div>
</div>

<form onsubmit="javascript: return false" method="post" id="frmMercancia" name="frmMercancia">
	<div class="modal fade" id="winAddMercancia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Mercancia</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group form-group-sm">
						<label for="txtFraccion" class="inputsm">Fracción</label>
						<input class="form-control input-sm" id="txtFraccion" name="txtFraccion">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtDescripcion" class="inputsm">Descripción</label>
						<input class="form-control input-sm" id="txtDescripcion" name="txtDescripcion">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtMarca" class="inputsm">Marca</label>
						<input class="form-control input-sm" id="txtMarca" name="txtMarca">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtModelo" class="inputsm">Modelo</label>
						<input class="form-control input-sm" id="txtModelo" name="txtModelo">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtSerie" class="inputsm">Serie</label>
						<input class="form-control input-sm" id="txtSerie" name="txtSerie">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtCantidad" class="inputsm">Cantidad</label>
						<input class="form-control input-sm" id="txtCantidad" name="txtCantidad" value="1">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtPesoNeto" class="inputsm">Peso neto</label>
						<input class="form-control input-sm" id="txtPesoNeto" name="txtPesoNeto">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtPesoBruto" class="inputsm">Peso bruto</label>
						<input class="form-control input-sm" id="txtPesoBruto" name="txtPesoBruto">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtEmbalaje" class="inputsm">Embalaje</label>
						<input class="form-control input-sm" id="txtEmbalaje" name="txtEmbalaje">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtMCTM" class="inputsm">M. C. T. M.</label>
						<input class="form-control input-sm" id="txtMCTM" name="txtMCTM">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtEC" class="inputsm">E. C.</label>
						<input class="form-control input-sm" id="txtEC" name="txtEC">
					</div>
					<div class="form-group form-group-sm">
						<label for="txtObservaciones" class="inputsm">Fracción</label>
						<textarea class="form-control" id="txtObservaciones" name="txtObservaciones"></textarea>
					</div>
				</div>
				<div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					<button type="submit" class="btn btn-info pull-right">Guardar</button>
				</div>
			</div>
		</div>
	</div>
</form>