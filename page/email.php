<?php include "./../includes/encabezado.php" ?> <!-- Llamamos al encabezado de pagina que estara en todas las pantalla -->

<div class="formulario-connue">
  <!-- Formulario de contacto -->
  <form class="row g-3"> <!-- Clase Bootstrap para crear un formulario con un sistema de rejilla y separación entre filas (g-3) -->

    <!-- Campo de entrada para el asunto -->
    <div class="col-md-12">
      <label for="nombre" class="form-label">Asunto:</label> <!-- Etiqueta para el campo del asunto -->
      <input type="text" class="form-control" id="asunto"> <!-- Campo de texto para ingresar el asunto -->
    </div>

    <!-- Campo de entrada para el contenido -->
    <div class="col-md-12">
      <label for="contenido" class="form-label">Contenido:</label> <!-- Etiqueta para el campo del contenido -->
      <input type="text" class="form-control" id="contenido"> <!-- Campo de texto para ingresar el contenido -->
    </div>

    <!-- Campo de entrada para la audiencia -->
    <div class="col-md-12">
      <label for="audiencia" class="form-label">Audiencia:</label> <!-- Etiqueta para el campo de la audiencia -->
      <input type="text" class="form-control" id="audiencia"> <!-- Campo de texto para ingresar la audiencia -->
    </div>

    <!-- Botón para enviar el formulario -->
    <div class="col-6">
      <button type="submit" class="btn btn-primary">Enviar</button> <!-- Botón de envío con estilo primario de Bootstrap -->
    </div>

    <!-- Botón para limpiar el formulario -->
    <div class="col-6">
      <button type="reset" class="btn btn-danger">Limpiar</button> <!-- Botón para limpiar el formulario con estilo de peligro (rojo) de Bootstrap -->
    </div>

  </form>
</div>

<?php include "./../includes/piepagina.php" ?><!-- Llamamos al piede pagina que estara en todas las pantalla -->