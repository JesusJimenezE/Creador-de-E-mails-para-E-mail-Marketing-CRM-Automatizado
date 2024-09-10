<?php include "./../includes/encabezado.php" ?> <!-- Llamamos al encabezado de pagina que estara en todas las pantalla -->

<div class="formulario-connue">
  <form class="row g-3">
    
    <div class="col-md-12">
      <label for="nombre" class="form-label">Asunto:</label>
      <input type="text" class="form-control" id="asunto">
    </div>
    
    <div class="col-md-12">
      <label for="contenido" class="form-label">Contenido:</label>
      <input type="text" class="form-control" id="contenido">
    </div>

    <div class="col-md-12">
      <label for="audiencia" class="form-label">Audiencia:</label>
      <input type="text" class="form-control" id="audiencia">
    </div>

    <div class="col-6">
      <button type="submit" class="btn btn-primary">Enviar</button>
    </div>

    <div class="col-6">
      <button type="submit" class="btn btn-danger">limpiar</button>
    </div>

  </form>
</div>

<?php include "./../includes/piepagina.php" ?><!-- Llamamos al piede pagina que estara en todas las pantalla -->