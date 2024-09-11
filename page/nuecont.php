<?php include "./../includes/encabezado.php" ?> <!-- Llamamos al encabezado de pagina que estara en todas las pantalla -->

<div class="formulario-connue">

  <form class="row g-3"> <!-- Clase Bootstrap para crear un formulario con un sistema de rejilla y separación entre filas (g-3) -->

    <!-- Campo de entrada para el nombre -->
    <div class="col-md-12">
      <label for="nombre" class="form-label">Nombre:</label> <!-- Etiqueta para el campo del nombre -->
      <input type="text" class="form-control" id="nombre"> <!-- Campo de texto para ingresar el nombre -->
    </div>

    <!-- Campo de entrada para la edad -->
    <div class="col-md-12">
      <label for="edad" class="form-label">Edad:</label> <!-- Etiqueta para el campo de la edad -->
      <input type="number" class="form-control" id="edad"> <!-- Campo numérico para ingresar la edad -->
    </div>

    <!-- Campo de selección para el género -->
    <div class="col-md-6">
      <label for="genero" class="form-label">Género:</label> <!-- Etiqueta para el campo del género -->
      <select id="genero" class="form-select"> <!-- Menú desplegable para seleccionar el género -->
        <option>Femenino</option> <!-- Opción Femenino -->
        <option>Masculino</option> <!-- Opción Masculino -->
        <option>Otros</option> <!-- Opción Otros -->
      </select>
    </div>

    <!-- Campo de entrada para el número de teléfono -->
    <div class="col-md-6">
      <label for="numero" class="form-label">Número:</label> <!-- Etiqueta para el campo del número de teléfono -->
      <input type="tel" class="form-control" id="numero"> <!-- Campo de texto para ingresar el número de teléfono -->
    </div>

    <!-- Campo de entrada para el correo electrónico -->
    <div class="col-md-12">
      <label for="correo" class="form-label">Correo:</label> <!-- Etiqueta para el campo del correo electrónico -->
      <input type="email" class="form-control" id="correo"> <!-- Campo de texto para ingresar el correo electrónico -->
    </div>

    <!-- Campo de entrada para la dirección -->
    <div class="col-md-12">
      <label for="direccion" class="form-label">Dirección:</label> <!-- Etiqueta para el campo de la dirección -->
      <input type="text" class="form-control" id="direccion"> <!-- Campo de texto para ingresar la dirección -->
    </div>

    <!-- Botón para agregar los datos ingresados -->
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Agregar</button> <!-- Botón de envío con estilo primario de Bootstrap -->
    </div>

  </form>
</div>


<?php include "./../includes/piepagina.php" ?><!-- Llamamos al piede pagina que estara en todas las pantalla -->