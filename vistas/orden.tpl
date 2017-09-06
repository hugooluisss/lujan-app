<div class="card orden">
	<div class="card-header" role="tab" id="headingOne">
		<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
			Factura <span campo="factura"/> - <small campo="estado"/>
		</a>
	</div>

	<div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne">
		<div class="card-block">
			<div class="row">
				<label class="col-4">Fecha</label>
				<div class="col-8" campo="fecha" />
			</div>
			<div class="row">
				<label class="col-4">Factura</label>
				<div class="col-8" campo="factura" />
			</div>
			<div class="row">
				<label class="col-4">Cliente</label>
				<div class="col-8" campo="cliente" />
			</div>
			<div class="row">
				<label class="col-4">Lugar</label>
				<div class="col-8" campo="lugar" />
			</div>
			<div class="row">
				<label class="col-4">Tipo</label>
				<div class="col-8" campo="tipo" />
			</div>
			<div class="row">
				<label class="col-4">Transportista</label>
				<div class="col-8" campo="transportista" />
			</div>
			<hr />
			<div class="row">
				<div class="col-12 text-right">
					<button class="btn btn-success btn-block">Atender orden</button>
				</div>
			</div>
		</div>
	</div>
</div>